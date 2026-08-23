angular.module('newsExpress')

    /** Small helpers shared by the services and controllers. */
    .factory('Util', ['NX', function (NX) {
        var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        function isEmpty(value) {
            return value === null || value === undefined ||
                String(value).trim() === '' || value === 'null';
        }

        return {
            isEmpty: isEmpty,

            /** Cuts text to at most NX.WORD_LIMIT words, matching the app 60-word rule. */
            trimToWords: function (text) {
                if (isEmpty(text)) { return ''; }
                var words = String(text).trim().split(/\s+/);
                if (words.length <= NX.WORD_LIMIT) { return String(text).trim(); }
                return words.slice(0, NX.WORD_LIMIT).join(' ') + '…';
            },

            /** "2026-08-18T14:50:25.000Z" becomes "18 Aug 2026". */
            formatDate: function (iso) {
                if (isEmpty(iso)) { return ''; }
                var d = new Date(iso);
                if (isNaN(d.getTime())) { return ''; }
                return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
            },

            /**
             * The API code for a config language name, or null when unknown. Deliberately not
             * guessed: a wrong code would filter out every story and leave an empty feed.
             */
            apiCodeFor: function (name) {
                var map = {english: 'ENG', hindi: 'HIN', marathi: 'MAR'};
                return map[String(name || '').toLowerCase()] || null;
            },

            /** Reads JSON from localStorage, tolerating a missing or corrupted entry. */
            readStore: function (key, fallback) {
                try {
                    var raw = window.localStorage.getItem(key);
                    return raw ? JSON.parse(raw) : fallback;
                } catch (e) {
                    return fallback;
                }
            },

            writeStore: function (key, value) {
                try {
                    window.localStorage.setItem(key, JSON.stringify(value));
                } catch (e) {
                    // Private browsing or a full quota: not worth breaking the page over.
                }
            }
        };
    }])

    /**
     * Remote config: per-language access tokens, app name and store link.
     *
     * Cached in localStorage so a repeat visit renders without waiting on Firebase, exactly as the
     * Android app caches it in SharedPreferences.
     */
    .factory('ConfigService', ['$http', '$q', 'NX', 'Util', function ($http, $q, NX, Util) {
        var current = Util.readStore(NX.STORAGE_CONFIG, null);
        var inFlight = null;

        function hasAnyToken(cfg) {
            if (!cfg || !cfg.AuthToken) { return false; }
            return Object.keys(cfg.AuthToken).some(function (k) {
                return !Util.isEmpty(cfg.AuthToken[k]);
            });
        }

        return {
            /** Resolves with the config, preferring fresh but never failing if one is cached. */
            load: function () {
                if (inFlight) { return inFlight; }

                inFlight = $http.get(NX.CONFIG_URL).then(function (res) {
                    // Refuse to replace a good cache with an unusable payload.
                    if (hasAnyToken(res.data)) {
                        current = res.data;
                        Util.writeStore(NX.STORAGE_CONFIG, current);
                    }
                    return current;
                }, function () {
                    if (current) { return current; }
                    return $q.reject('config-unavailable');
                });

                return inFlight;
            },

            get: function () { return current; },

            /** Language names exactly as the config lists them, blank tokens skipped. */
            languages: function () {
                if (!current || !current.AuthToken) { return [NX.DEFAULT_LANGUAGE]; }
                var names = Object.keys(current.AuthToken).filter(function (k) {
                    return !Util.isEmpty(current.AuthToken[k]);
                });
                return names.length ? names : [NX.DEFAULT_LANGUAGE];
            },

            tokenFor: function (language) {
                if (!current || !current.AuthToken) { return ''; }
                return current.AuthToken[language] || '';
            },

            appName: function () { return (current && current.appName) || 'NewsExpress'; },

            downloadLink: function () { return (current && current.appDownloadLink) || ''; }
        };
    }])

    /** Remembers the reader language choice across visits. */
    .factory('LanguageService', ['NX', 'Util', 'ConfigService',
        function (NX, Util, ConfigService) {
            return {
                get: function () {
                    var saved = Util.readStore(NX.STORAGE_LANGUAGE, null);
                    var available = ConfigService.languages();
                    // A saved language can vanish from the config; fall back to what is offered.
                    if (saved && available.indexOf(saved) !== -1) { return saved; }
                    return available.indexOf(NX.DEFAULT_LANGUAGE) !== -1
                        ? NX.DEFAULT_LANGUAGE : available[0];
                },
                set: function (language) {
                    Util.writeStore(NX.STORAGE_LANGUAGE, language);
                }
            };
        }])

    /** Fetches and normalises one page of summaries. */
    .factory('NewsService', ['$http', '$q', 'NX', 'Util', 'ConfigService',
        function ($http, $q, NX, Util, ConfigService) {

            function pickImage(brief) {
                var v3 = brief.thumbnailURL_v3 || {};
                return v3.hd || v3.sd || v3.low ||
                    (brief.thumbnail && brief.thumbnail.url) || '';
            }

            function normalise(brief) {
                var publishedAt = brief.publishedAt || {};
                var attributed = brief.attributedPublisher || {};
                var publisher = brief.publisher || {};

                return {
                    id: brief.id,
                    title: brief.title,
                    summary: Util.trimToWords(brief.summary),
                    imageUrl: pickImage(brief),
                    category: (brief.category && brief.category.title) || '',
                    publisher: attributed.name || publisher.name || '',
                    agoFromNow: publishedAt.agoFromNow || '',
                    publishedAt: publishedAt.date || '',
                    publishedLabel: Util.formatDate(publishedAt.date),
                    articleLink: brief.publisherLink || '',
                    languageCode: (brief.language && brief.language.languageCode) || '',
                    isBreaking: !!brief.isBreaking
                };
            }

            return {
                /** Resolves with {items, totalPages, languageMismatch, servedLanguage}. */
                loadPage: function (page, language) {
                    var token = ConfigService.tokenFor(language);
                    if (Util.isEmpty(token)) {
                        return $q.reject('No access token configured for ' + language + '.');
                    }

                    return $http({
                        method: 'POST',
                        url: NX.GRAPHQL_URL,
                        headers: {
                            'authorization': token,
                            'content-type': 'application/json'
                        },
                        data: {
                            operationName: NX.OPERATION_NAME,
                            variables: {page: page, size: NX.PAGE_SIZE, dateTime: null},
                            query: NX.QUERY
                        }
                    }).then(function (res) {
                        var payload = res.data || {};

                        // GraphQL answers HTTP 200 even for auth failures, so the body decides.
                        if (payload.errors && payload.errors.length) {
                            var first = payload.errors[0];
                            var errCode = (first.extensions && first.extensions.code) || '';
                            if (errCode === 'UNAUTHENTICATED') {
                                return $q.reject('The ' + language +
                                    ' access token is not valid or has expired.');
                            }
                            return $q.reject(first.message || 'Server rejected the request.');
                        }

                        var summaries = payload.data && payload.data.getSummaries;
                        if (!summaries) {
                            return $q.reject('Unexpected response from the server.');
                        }

                        var all = (summaries.newsBriefs || []).map(normalise);
                        var code = Util.apiCodeFor(language);
                        var matching = all;

                        // Unknown codes are not filtered: guessing wrong would empty the feed.
                        if (code) {
                            matching = all.filter(function (item) {
                                return Util.isEmpty(item.languageCode) ||
                                    item.languageCode.toUpperCase() === code;
                            });
                        }

                        var mismatch = !!code && matching.length === 0 && all.length > 0;
                        return {
                            items: mismatch ? all : matching,
                            totalPages: (summaries.cursor && summaries.cursor.totalPages) || 1,
                            languageMismatch: mismatch,
                            servedLanguage: all.length ? all[0].languageCode : ''
                        };
                    }, function () {
                        return $q.reject('Could not reach the news service. Check your connection.');
                    });
                }
            };
        }])

    /** Saved stories, kept whole so the list renders instantly even after a story ages out. */
    .factory('FavouritesService', ['NX', 'Util', function (NX, Util) {
        function keyOf(item) {
            return item.id || item.articleLink || item.title || '';
        }

        function all() {
            var list = Util.readStore(NX.STORAGE_FAVOURITES, []);
            return angular.isArray(list) ? list : [];
        }

        function save(list) {
            Util.writeStore(NX.STORAGE_FAVOURITES, list);
        }

        return {
            all: all,

            contains: function (item) {
                if (!item) { return false; }
                var key = keyOf(item);
                return all().some(function (saved) { return keyOf(saved) === key; });
            },

            /** Returns true when the story ended up saved, false when it was removed. */
            toggle: function (item) {
                var list = all();
                var key = keyOf(item);
                for (var i = 0; i < list.length; i++) {
                    if (keyOf(list[i]) === key) {
                        list.splice(i, 1);
                        save(list);
                        return false;
                    }
                }
                list.unshift(item);
                save(list);
                return true;
            },

            remove: function (item) {
                var key = keyOf(item);
                save(all().filter(function (saved) { return keyOf(saved) !== key; }));
            }
        };
    }]);
