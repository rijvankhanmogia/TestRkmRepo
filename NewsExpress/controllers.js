angular.module('newsExpress')

    /**
     * The feed: one story at a time, advanced by swipe, keyboard or the on-screen buttons.
     * Mirrors the Android app, including the 60-word trim, language filtering and prefetching.
     */
    .controller('FeedCtrl', ['$scope', '$window', '$timeout', 'NX', 'Util',
        'ConfigService', 'LanguageService', 'NewsService', 'FavouritesService',
        function ($scope, $window, $timeout, NX, Util, ConfigService, LanguageService,
                  NewsService, FavouritesService) {

            $scope.items = [];
            $scope.index = 0;
            $scope.loading = true;
            $scope.error = null;
            $scope.notice = null;
            $scope.flash = null;
            $scope.languages = [];
            $scope.language = null;
            $scope.canShare = !!($window.navigator && $window.navigator.share);

            var page = 0;
            var totalPages = 1;
            var isLoading = false;
            var emptyStreak = 0;
            var seenIds = {};
            var noticeShown = false;
            /** Set when Next is pressed on the last card, so the arriving page advances for you. */
            var advanceOnLoad = false;

            ConfigService.load().then(function () {
                $scope.languages = ConfigService.languages();
                $scope.language = LanguageService.get();
                loadNextPage();
            }, function () {
                $scope.loading = false;
                $scope.error = 'Could not load settings. Please check your connection and retry.';
            });

            function loadNextPage() {
                if (isLoading || page >= totalPages) { return; }
                isLoading = true;
                $scope.error = null;

                NewsService.loadPage(page + 1, $scope.language).then(function (result) {
                    isLoading = false;
                    $scope.loading = false;
                    page = page + 1;
                    totalPages = result.totalPages;

                    if (result.languageMismatch && !noticeShown) {
                        noticeShown = true;
                        $scope.notice = 'This token serves ' +
                            (result.servedLanguage || 'another') + ' news, not ' +
                            $scope.language + '. Showing what it returns.';
                    }

                    var added = 0;
                    result.items.forEach(function (item) {
                        // A live feed repeats stories across pages, so de-duplicate by id.
                        var key = item.id || item.articleLink || item.title;
                        if (key && !seenIds[key]) {
                            seenIds[key] = true;
                            $scope.items.push(item);
                            added++;
                        }
                    });

                    if (added > 0) {
                        emptyStreak = 0;
                        // Someone pressed Next while waiting on this page; honour it now.
                        if (advanceOnLoad) {
                            advanceOnLoad = false;
                            $scope.index++;
                        }
                    } else if (++emptyStreak <= NX.MAX_EMPTY_PAGE_STREAK && page < totalPages) {
                        // Whole page was duplicates or another language: try the next one.
                        loadNextPage();
                    } else if ($scope.items.length === 0) {
                        $scope.error = 'No stories found in the selected language.';
                    }
                }, function (message) {
                    isLoading = false;
                    $scope.loading = false;
                    if ($scope.items.length === 0) {
                        $scope.error = message;
                    } else {
                        $scope.notice = message;
                    }
                });
            }

            $scope.current = function () {
                return $scope.items[$scope.index] || null;
            };

            $scope.next = function () {
                if ($scope.index < $scope.items.length - 1) {
                    $scope.index++;
                    // Fetch ahead so the next advance never lands on nothing.
                    if ($scope.index >= $scope.items.length - NX.PREFETCH_THRESHOLD) {
                        loadNextPage();
                    }
                } else {
                    // At the end of what is loaded: fetch, then move once the page lands.
                    advanceOnLoad = true;
                    loadNextPage();
                }
            };

            $scope.prev = function () {
                if ($scope.index > 0) { $scope.index--; }
            };

            $scope.reload = function () {
                $scope.items = [];
                $scope.index = 0;
                seenIds = {};
                page = 0;
                totalPages = 1;
                emptyStreak = 0;
                noticeShown = false;
                $scope.notice = null;
                $scope.loading = true;
                loadNextPage();
            };

            $scope.changeLanguage = function (language) {
                if (language === $scope.language) { return; }
                $scope.language = language;
                LanguageService.set(language);
                $scope.reload();
            };

            $scope.dismissNotice = function () {
                $scope.notice = null;
            };

            $scope.isSaved = function (item) {
                return FavouritesService.contains(item);
            };

            $scope.toggleSave = function (item) {
                if (!item) { return; }
                var saved = FavouritesService.toggle(item);
                // Brief confirmation, matching the popup in the app.
                $scope.flash = saved ? 'Added to Favourites' : 'Removed from Favourites';
                $timeout(function () { $scope.flash = null; }, 1400);
            };

            function flash(message) {
                $scope.flash = message;
                $timeout(function () { $scope.flash = null; }, 1400);
            }

            /**
             * Web Share where the browser supports it, clipboard otherwise. Text matches the app:
             * headline, source, article link, then the Play Store prompt.
             */
            $scope.share = function (item) {
                if (!item) { return; }

                var lines = [item.title];
                if (item.publisher) { lines.push('Source: ' + item.publisher); }
                if (item.articleLink) { lines.push(item.articleLink); }
                lines.push('Download ' + ConfigService.appName() +
                    ' for latest news in 60 words:');

                var link = ConfigService.downloadLink();
                if (link) { lines.push(link); }
                var text = lines.join('\n');

                if ($scope.canShare) {
                    $window.navigator.share({title: item.title, text: text})
                        .then(angular.noop, angular.noop);
                    return;
                }

                // navigator.clipboard needs a secure context, so fall back to the legacy
                // execCommand path — otherwise Share does nothing at all over plain http.
                if ($window.navigator.clipboard && $window.isSecureContext) {
                    $window.navigator.clipboard.writeText(text).then(function () {
                        $scope.$apply(function () { flash('Story copied to clipboard'); });
                    }, function () { legacyCopy(text); });
                    return;
                }
                legacyCopy(text);
            };

            function legacyCopy(text) {
                try {
                    var area = document.createElement('textarea');
                    area.value = text;
                    area.setAttribute('readonly', '');
                    area.style.position = 'fixed';
                    area.style.opacity = '0';
                    document.body.appendChild(area);
                    area.select();
                    var ok = document.execCommand('copy');
                    document.body.removeChild(area);
                    flash(ok ? 'Story copied to clipboard' : 'Copy is blocked by this browser');
                } catch (e) {
                    flash('Copy is blocked by this browser');
                }
            }
        }])

    /** Saved stories, read from localStorage. */
    .controller('FavouritesCtrl', ['$scope', 'FavouritesService',
        function ($scope, FavouritesService) {
            $scope.items = FavouritesService.all();

            $scope.remove = function (item, index) {
                FavouritesService.remove(item);
                $scope.items.splice(index, 1);
            };
        }])

    /** Contact form: opens the visitor mail client, since a static site has no back end. */
    .controller('ContactCtrl', ['$scope', '$window', function ($scope, $window) {
        $scope.form = {name: '', email: '', message: ''};
        $scope.sent = false;

        $scope.send = function () {
            var subject = 'NewsExpress enquiry from ' + ($scope.form.name || 'a visitor');
            var body = [
                'Name: ' + $scope.form.name,
                'Email: ' + $scope.form.email,
                '',
                $scope.form.message
            ].join('\n');

            $window.location.href = 'mailto:rijvankhanmogia@gmail.com' +
                '?subject=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(body);
            $scope.sent = true;
        };
    }]);
