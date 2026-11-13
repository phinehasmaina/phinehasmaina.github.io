# Inbox delivery

The contact form has name, email, and message fields and is connected to `https://formspree.io/f/mzerzkkj` through `contact-config.js`.

The verified receiving inbox is phinehaskiyozeal@gmail.com. The Formspree workflow sends an email for each submission. A direct email link is also available on the page; it opens the visitor's mail app rather than submitting the form.

A labeled test was submitted from the local preview and confirmed in Formspree's Inbox. The site displayed its success message and cleared the fields. Final receipt in Gmail needs confirmation by the owner. The website changes remain local until the design branch is published.

## Changing the endpoint later

1. Create a Formspree account at https://formspree.io and verify the email address that should receive messages.
2. Create a contact form and copy the endpoint from its Integration screen, such as `https://formspree.io/f/abcdefgh`.
3. Paste that endpoint into `contact-config.js`. This public form ID is not an email password or secret API key.
4. Reload the preview. The Send button becomes available automatically.
5. Send one test message with the owner's permission and confirm it arrives in the destination inbox. Verify that Reply uses the sender's email address.

The website posts the visitor's name, email, and message to Formspree over HTTPS. Formspree handles inbox delivery. Native required/email validation, a honeypot, duplicate-submit prevention, and success/error states are included. A failed request preserves the message.

Before publishing, review the provider's current limits and spam settings. Documentation: https://help.formspree.io/articles/building-your-form/building-an-html-form

Do not put SMTP credentials, email passwords, or private service keys in this repository.
