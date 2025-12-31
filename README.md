# APPX-G WhatsApp Bot

This repository contains a minimal WhatsApp bot built with Node.js and whatsapp-web.js. It runs using a headless Chromium instance and stores authentication locally via the LocalAuth strategy.

WARNING: Use this bot responsibly. Sending unsolicited messages or automating abusive behavior may violate WhatsApp's terms of service. This repository is provided for educational purposes.

## Features
- QR login (scan once with your phone)
- !ping, !help, !echo commands
- !send <number>|<message> — send a message from the bot to a specified phone number

## Setup
1. Clone the repo:

   git clone https://github.com/the-hunter55/Anonymous.git
   cd Anonymous

2. Install dependencies:

   npm install

3. Start the bot:

   npm start

4. When the bot prints a QR in the terminal, scan it from WhatsApp (Settings -> Linked devices -> Link a device).

5. Commands (chat the bot from your WhatsApp number after login):
   - `!ping` — replies `pong`
   - `!help` — shows help
   - `!echo hello` — replies `hello`
   - `!send 15551234567|Hello` — the bot will send `Hello` to +1 555 123 4567

## Notes
- The bot uses `LocalAuth` and will create a `.wwebjs_auth` folder to persist session data.
- If you want to run this in a server/Docker, ensure a suitable Chromium is available and that you keep the auth folder persistent.

## License
MIT
!send 0725882486|heWhatsAppeWWhhaattssAAptsApptsApp
