# Phin's room : website design

A buildless HTML/CSS/JavaScript portfolio using purple, charcoal grey, and warm red. Dark by default, with the original oversized 10Phin background artwork. Preserves the existing project photos and GitHub Pages CNAME.

Preview: run `python -m http.server 4173 --bind 127.0.0.1` from the project directory and visit http://127.0.0.1:4173.

- `index.html`: illustrated room, biography, existing projects, music playground, contact.
- `styles/room.css`: responsive dark layout, original 10Phin backdrop, reduced-motion support.
- `room.js`: keyboard-accessible interest tabs, lighting, four-note/eight-step Web Audio sequencer. Sound starts only with Play and pauses when the page is hidden.
- Old About/Contact URLs forward to the matching sections.

No backend, API keys, accounts, tracking, or build dependencies. Google Fonts is optional with system fallbacks. The contact form is connected to Formspree. See CONTACT-SETUP.md. Healthcare appears only as a brief personal interest. Biography and project descriptions need the owner's review before publication.

The redesign is maintained in Git and published from main through GitHub Pages.
