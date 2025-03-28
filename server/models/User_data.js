const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    name: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    description: { type: String },
    image: { type: String }
});

const ExperienceSchema = new mongoose.Schema({
    title: { type: String },
    company: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    description: { type: String },
    image: { type: String }
});

const TechStackSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String }
});

const SocialSchema = new mongoose.Schema({
    name: { type: String },
    url: { type: String },
    image: { type: String }
});

const UserProfileSchema = new mongoose.Schema({
    logo_name: { type: String },
    firstName: { type: String },
    secondName: { type: String },
    about: { type: String },
    resume: { type: String },
    project: [ProjectSchema],
    experience: [ExperienceSchema],
    techstack: [TechStackSchema],
    social: [SocialSchema],
    urlName: { type: String },
    email: { type: String }
}, { timestamps: true });

const UserProfile = mongoose.model("UserData", UserProfileSchema, 'user_data');

module.exports = UserProfile;
