# NewsExpress — website

AngularJS 1.8 + Bootstrap 5 front end for the NewsExpress news feed. Static files only: no build
step, no server code.

## Run it

Any static server works. From this folder:

```
python -m http.server 8000
```

then open <http://localhost:8000>.

Opening `index.html` straight off the disk mostly works, but browsers block `XMLHttpRequest` for
`file://` templates, so use a server while developing.

## Pages

| Route | File |
|---|---|
| `#/` | `views/feed.html` — the news feed |
| `#/favourites` | `views/favourites.html` — saved stories |
| `#/privacyPolicy` | `views/privacy-policy.html` |
| `#/aboutUs` | `views/about-us.html` |
| `#/contactUs` | `views/contact-us.html` |

### Clean URLs without the `#`

Routes are defined as `/privacyPolicy` etc. and served behind a hash so the site works on any
static host with no configuration. To get literal `example.com/privacyPolicy`:

1. In `js/app.js`, replace `$locationProvider.hashPrefix('')` with
   `$locationProvider.html5Mode(true)`.
2. Add `<base href="/">` inside `<head>` in `index.html`.
3. Configure the host to rewrite unknown paths to `index.html`
   (Netlify `_redirects`: `/*  /index.html  200`).

## Feature parity with the Android app

- 60-word summaries, trimmed client side by the same rule
- Vertical paging: swipe on touch, arrow keys / space / buttons on desktop
- Language switching driven by the `AuthToken` keys in the remote config — add a language there
  and it appears here with no code change
- Source and publication date shown on every story, as Google Play's news policy requires
- Save stories (localStorage) and a saved-stories page
- Share via the Web Share API, with clipboard fallback
- Reload for the latest headlines, page prefetching, duplicate suppression

## Configuration

`js/app.js` holds the endpoints in the `NX` constant. Access tokens are **not** in the source —
they are read at runtime from the same Firebase config the app uses.

## Security note

The access token is used from the browser, so it is visible to anyone who opens the network tab.
See the note in the handover message: for a public deployment, put a small serverless proxy in
front of the GraphQL endpoint and keep the token server side.
