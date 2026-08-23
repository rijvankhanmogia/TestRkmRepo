/**
 * NewsExpress — AngularJS front end for the same JioNews feed the Android app reads.
 *
 * Routes use hashbang-free hashes (#/aboutUs) so the site works from a plain static host, and from
 * file:// while developing, with no server rewrite rules. See README for switching to html5Mode.
 */
angular.module('newsExpress', ['ngRoute'])

    .constant('NX', {
        GRAPHQL_URL: 'https://mobileservice.jionews.com/graphql',
        CONFIG_URL: 'https://chouhan-big-bash-league-default-rtdb.asia-southeast1.firebasedatabase.app/newsexpress/meta_data.json',
        PAGE_SIZE: 10,
        WORD_LIMIT: 60,
        // Fetch the next page once this many cards from the end, mirroring the app.
        PREFETCH_THRESHOLD: 3,
        MAX_EMPTY_PAGE_STREAK: 5,
        DEFAULT_LANGUAGE: 'Hindi',
        STORAGE_LANGUAGE: 'nx_language',
        STORAGE_CONFIG: 'nx_config',
        STORAGE_FAVOURITES: 'nx_favourites',
        OPERATION_NAME: 'GetSummaries',
        QUERY: [
            'query GetSummaries($page: Int!, $size: Int!, $categoryId: ID, $dateTime: DateTime) {',
            '  getSummaries(page: $page, size: $size, categoryId: $categoryId, dateTime: $dateTime) {',
            '    cursor { curr next prev size totalDocs totalPages }',
            '    dateTime',
            '    newsBriefs {',
            '      id title summary isBreaking',
            '      thumbnail { url }',
            '      thumbnailURL_v3 { hd sd low }',
            '      category { title }',
            '      publisher { name }',
            '      attributedPublisher { name }',
            '      publishedAt { agoFromNow date }',
            '      publisherLink',
            '      viewCount { text }',
            '      language { languageCode name }',
            '    }',
            '  }',
            '}'
        ].join('\n')
    })

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider
            .when('/', {templateUrl: 'views/feed.html', controller: 'FeedCtrl'})
            .when('/favourites', {templateUrl: 'views/favourites.html', controller: 'FavouritesCtrl'})
            .when('/privacyPolicy', {templateUrl: 'views/privacy-policy.html'})
            .when('/aboutUs', {templateUrl: 'views/about-us.html'})
            .when('/contactUs', {templateUrl: 'views/contact-us.html', controller: 'ContactCtrl'})
            .otherwise({redirectTo: '/'});
    }])

    .run(['$rootScope', function ($rootScope) {
        $rootScope.year = new Date().getFullYear();
        // Every route change should start at the top, which a hash change does not do by itself.
        $rootScope.$on('$routeChangeSuccess', function () {
            window.scrollTo(0, 0);
        });
    }])

    /**
     * Vertical swipe for the feed. Horizontal swipes are ignored so a browser's own back/forward
     * edge gestures are left alone.
     */
    .directive('nxSwipe', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var MIN_DISTANCE = 45;
                var startX = 0, startY = 0, startAt = 0;

                element.on('touchstart', function (e) {
                    var t = e.changedTouches[0];
                    startX = t.clientX;
                    startY = t.clientY;
                    startAt = Date.now();
                });

                element.on('touchend', function (e) {
                    var t = e.changedTouches[0];
                    var dx = t.clientX - startX;
                    var dy = t.clientY - startY;

                    // Too slow to be a flick, or mostly sideways: leave it to the browser.
                    if (Date.now() - startAt > 800) { return; }
                    if (Math.abs(dy) < MIN_DISTANCE || Math.abs(dy) < Math.abs(dx)) { return; }

                    scope.$apply(function () {
                        scope.$eval(dy < 0 ? attrs.nxSwipeUp : attrs.nxSwipeDown);
                    });
                });
            }
        };
    })

    /** Keyboard paging on desktop, where there is no swipe. */
    .directive('nxKeys', ['$document', function ($document) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                function onKey(e) {
                    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
                        e.preventDefault();
                        scope.$apply(function () { scope.$eval(attrs.nxKeysNext); });
                    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                        e.preventDefault();
                        scope.$apply(function () { scope.$eval(attrs.nxKeysPrev); });
                    }
                }
                $document.on('keydown', onKey);
                scope.$on('$destroy', function () { $document.off('keydown', onKey); });
            }
        };
    }]);
