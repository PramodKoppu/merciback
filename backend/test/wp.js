const axios = require('axios');
require('dotenv').config();

// Replace these with your values
const token =  process.env.WP_TOKEN;
const phoneNumberId = '399211069942890';
// const recipientPhoneNumber = '+917207628958'; // E.g., "whatsapp:+1234567890"
const templateName = 'orderreceived'; // E.g., 'welcome_message'

const sendTemplateMessage = async (num, name, orid, date) => {
    const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;

    const data = {
        messaging_product: 'whatsapp',
        to: `+91${num}`,
        type: 'template',
        template: {
            name: templateName,
            language: {
                code: 'en_US', // Adjust based on your template language
            },
            components: [
                {
                    type: 'body',
                    parameters: [
                        { type: 'text', text: name },             // Placeholder {{1}}
                        { type: 'text', text: orid },          // Placeholder {{2}}
                        { type: 'text', text: date },     // Placeholder {{3}}
                    ],
                },
            ],
        },
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
       console.log('Template message sent:', response.data);
    } catch (error) {
        console.error('Error sending template message:', error.response ? error.response.data : error.message);
    }
}

module.exports = sendTemplateMessage