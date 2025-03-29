const Message = require('../models/Message');

const getMessage = async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(400).send("Invalid request: No user email provided");
    }
    const email = req.user.email;
    const data = await Message.findOne({ email });
    if (!data) {
      return res.status(404).send("No messages found for this user");
    }
    res.status(200).json(data); 
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Server Error");
  }
};


const insertMessage = async (req, res) => {
  try {
    const { name, email, message, userEmail } = req.body;

    if (!name || !email || !message || !userEmail) {
      return res.status(400).send("All fields are required");
    }

    let user = await Message.findOne({ email: userEmail });

    if (!user) {
      user = new Message({
        email: userEmail,
        messages: [{ name, email, message }],
      });

      await user.save();
      return res.status(201).send("Message Added Successfully");
    }

    // Append the new message
    user.messages.push({ name, email, message });

    await user.save();
    res.status(201).send("Message Added Successfully");

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send('Server Error');
  }
};

module.exports = { insertMessage,getMessage };
