FOR MA'AM CHERRY PWA
====================

FILES
- index.html: pages and interface
- styles.css: responsive styling for phones and larger screens
- script.js: navigation, games, compliments, birthday page, EmailJS summaries
- manifest.json: PWA metadata
- service-worker.js: offline cache
- icons/: PNG app icons for Android/PWA and iOS home screen

EMAILJS
The JavaScript uses:
Public key: GIAfr8cyf7rKLAK5v
Service ID: service_n5t0dz8
Ma'am Cherry template ID: template_cherry
Lour template ID: template_lourii

Both templates must contain a {{message}} variable. Set the recipient email in each template's EmailJS dashboard:
- template_cherry -> Ma'am Cherry's intended email address
- template_lourii -> Lour's intended email address

Email sending needs an internet connection. Do not put private email addresses or secrets into a public repository. EmailJS public keys are designed for browser use, but configure allowed origins and rate limits in the EmailJS dashboard.

HOSTING / INSTALLING
1. Upload the contents of this folder to an HTTPS host such as GitHub Pages.
2. Open the deployed site in Android Chrome and use Install app / Add to Home screen.
3. On iPhone, open the site in Safari, tap Share, then Add to Home Screen.
4. Open it once online before relying on offline mode so the service worker can cache the files.

IMPORTANT
- Offline games and pages can work after the first successful online load.
- Email summaries cannot send while offline.
- Push notifications are not included; they require additional server-side setup and permission.
- The birthday page can be opened from the homepage at any time. The special date is June 5.
- The letter is a polished general draft. Edit the letter paragraphs in index.html if you want your exact personal wording.
