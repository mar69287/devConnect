require('dotenv').config();
const axios = require("axios");

module.exports = {
    authenticate
}

async function authenticate(req, res) {
    const { username } = req.body;
    try {
        const r = await axios.put(
          "https://api.chatengine.io/users/",
          { username: username, secret: username, first_name: username },
          { headers: { "Private-Key": process.env.CHAT_PRIVATE_KEY } }
        );
        return res.status(r.status).json(r.data);
    } catch (e) {
        return res.status(e.response.status).json(e.response.data);
    }
}

