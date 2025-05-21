const axios = require("axios");

exports.sendToSlack = async (message) => {
    await axios.post(process.env.SLACK_WEBHOOK_URL, {
        text: message
    });
};