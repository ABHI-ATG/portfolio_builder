const User = require('../models/User_data');

const getData = async (req, res) => {
  try {
    const userData= await User.find({ email: req.user.email });
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const getData_ = async (req, res) => {
  try {
    const userData= await User.findOne({ urlName: req.body.urlName });
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const insertData = async (req, res) => {
  const data = req.body;
  const existUrlName= await User.findOne({ urlName: data.urlName });
  if(existUrlName){
    return res.status(400).json({ message: 'User Data already exists' });
  }
  try {
    const userData = new User({ 
        logo_name: data.firstName[0].toUpperCase()+data.secondName[0].toUpperCase(),
        firstName: data.firstName,
        secondName:data.secondName,
        about: data.about,
        resume: data.resume,
        project: data.project,
        experience: data.experience,
        techstack: data.techstack,
        social: data.social,
        urlName: data.urlName.toLowerCase(),
        email: req.user.email
    });
    await userData.save();
    res.status(201).json({ message: 'User Data registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const update = async (req, res) => {
  const data = req.body;
  try {
    const existingUser = await User.findOne({ urlName: data.prev_urlName });
    if (!existingUser) {
      return res.status(400).json({ message: "User data does not exist" });
    }
    if (data.urlName.toLowerCase() !== data.prev_urlName) {
      const urlNameExists = await User.findOne({ urlName: data.urlName.toLowerCase() });
      if (urlNameExists) {
        return res.status(400).json({ message: "This URL name is already taken" });
      }
    }
    existingUser.logo_name = data.firstName[0].toUpperCase() + data.secondName[0].toUpperCase();
    existingUser.firstName = data.firstName;
    existingUser.secondName = data.secondName;
    existingUser.about = data.about;
    existingUser.resume = data.resume;
    existingUser.project = data.project;
    existingUser.experience = data.experience;
    existingUser.techstack = data.techstack;
    existingUser.social = data.social;
    existingUser.urlName = data.urlName.toLowerCase();

    await existingUser.save();

    res.status(200).json({ message: "User data updated successfully" });

  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { insertData,getData,getData_,update };