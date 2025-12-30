const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true }
});

client.on('qr', qr => {
  console.log('QR RECEIVED - scan with your WhatsApp mobile app:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp client is ready.');
});

client.on('auth_failure', msg => {
  console.error('AUTH FAILURE', msg);
});

client.on('message', async msg => {
  try {
    const body = (msg.body || '').trim();
    // simple commands
    if (body === '!ping') {
      await msg.reply('pong');
      return;
    }

    // Usage: !send 15551234567|Hello from the bot
    if (body.startsWith('!send ')) {
      const payload = body.slice(6).trim();
      const splitIndex = payload.indexOf('|');
      if (splitIndex === -1) {
        await msg.reply('Usage: !send <full_number_in_international_format>|<message>\nExample: !send 15551234567|Hello');
        return;
      }

      const number = payload.slice(0, splitIndex).replace(/[^0-9]/g, '');
      const message = payload.slice(splitIndex + 1).trim();

      if (!number || !message) {
        await msg.reply('Invalid number or message.');
        return;
      }

      const chatId = `${number}@c.us`;
      await client.sendMessage(chatId, message);
      await msg.reply(`Message sent to ${number}`);
      return;
    }

    // Echo fallback for testing
    if (body.startsWith('!echo ')) {
      const toEcho = body.slice(6);
      await msg.reply(toEcho);
      return;
    }

    // help
    if (body === '!help') {
      await msg.reply('Commands:\n!ping - test the bot\n!send <number>|<message> - send a message from the bot to a number\n!echo <text> - echo back text');
      return;
    }

    // otherwise ignore
  } catch (err) {
    console.error('Message handler error', err);
  }
});

client.initialize();
