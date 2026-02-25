// Import the required modules
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Twilio credentials
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = twilio(accountSid, authToken);

// WhatsApp bot endpoint
app.post('/whatsapp', (req, res) => {
    const message = req.body.Body;
    const from = req.body.From;

    let responseMessage = '';

    // Handle incoming messages
    if (message.toLowerCase() === 'hello') {
        responseMessage = 'Hi there! How can I help you today?';
    } else if (message.toLowerCase() === 'bye') {
        responseMessage = 'Goodbye! Have a great day!';
    } else {
        responseMessage = 'Sorry, I did not understand that.';
    }

    // Send response back
    client.messages
        .create({
            body: responseMessage,
            from: 'whatsapp:+14155238886', // Twilio Sandbox number
            to: from
        })
        .then(message => console.log(`Message sent: ${message.sid}`))
        .catch(error => console.error(error));

    res.send('<Response></Response>');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// To start the server, run: node twilio-bot.js