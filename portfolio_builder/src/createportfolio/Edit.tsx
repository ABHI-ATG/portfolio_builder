import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import url from '../backend_url'

const Edit = () => {
    const navigate = useNavigate();
    const { string: urlName } = useParams()

    const [formData, setFormData] = useState({
        firstName: "",
        secondName: "",
        logoName: "",
        about: "",
        resume: "",
        project: [],
        experience: [],
        techstack: [],
        social: [],
        urlName: "",
        prev_urlName: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/createportfolio/login");
        }
        axios
            .get(url+"/api/verify-token", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                console.log("Token Verified:", response.data);
            })
            .catch((error) => {
                console.error("Token Invalid:", error.response?.data);
                localStorage.removeItem("token");
                navigate("/createportfolio/login");
            });
    }, []);

    useEffect(() => {
        if (!urlName) return;
        setFormData({ ...formData, prev_urlName: urlName });
        axios
            .post(url+"/api/userData/get", { urlName })
            .then((response) => {
                setFormData((prevData) => ({
                    ...prevData,
                    ...response.data,
                }));
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [urlName]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleArrayChange = (index, field, value, arrayName) => {
        const updatedArray = [...formData[arrayName]];
        updatedArray[index] = { ...updatedArray[index], [field]: value };
        setFormData({ ...formData, [arrayName]: updatedArray });
    };

    const imageToBase64 = (e) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);

            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            await axios.post(url+"/api/userData/update", formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setFormData({
                firstName: "",
                secondName: "",
                about: "",
                resume: "",
                project: [],
                experience: [],
                techstack: [],
                social: [],
                urlName: ""
            });
            navigate("/createportfolio/");
            alert("Data saved successfully!");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const addArrayItem = (arrayName, defaultItem) => {
        setFormData({ ...formData, [arrayName]: [...formData[arrayName], defaultItem] });
    };

    return (
        <div className="dashboard">
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit} className="dashboard-form">
                <div className="form-row">
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name="secondName" placeholder="Last Name" value={formData.secondName} onChange={handleChange} required />
                    </div>
                </div>

                <label htmlFor="about">About You</label>
                <textarea id="about" name="about" placeholder="About You" value={formData.about} onChange={handleChange} required></textarea>

                <h3>Experience</h3>
                {formData.experience.map((exp, index) => (
                    <div key={index} className="array-item">
                        <label>{index + 1} : Job Title</label>
                        <input type="text" placeholder="Job Title" value={exp.title} onChange={(e) => handleArrayChange(index, "title", e.target.value, "experience")} required />

                        <label>Company</label>
                        <input type="text" placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange(index, "company", e.target.value, "experience")} required />

                        <label>Start Date</label>
                        <input type="text" placeholder="Start Date" value={exp.startDate} onChange={(e) => handleArrayChange(index, "startDate", e.target.value, "experience")} required />

                        <label>End Date</label>
                        <input type="text" placeholder="End Date" value={exp.endDate} onChange={(e) => handleArrayChange(index, "endDate", e.target.value, "experience")} required />

                        <label>Description</label>
                        <textarea placeholder="Description" value={exp.description} onChange={(e) => handleArrayChange(index, "description", e.target.value, "experience")} required></textarea>

                        <label>Company Logo</label>
                        <input type="file" placeholder="Company Logo" onChange={async (e) => {
                            const base64String = await imageToBase64(e);
                            handleArrayChange(index, "image", base64String, "experience");
                        }} />
                        {exp.image && <img className="edit-image" src={exp.image} alt="image"/>}
                    </div>
                ))}
                <button type="button" onClick={() => addArrayItem("experience", { title: "", company: "", description: "" })}>Add Experience</button>
                <h3>Projects</h3>
                {formData.project.map((project, index) => (
                    <div key={index} className="array-item">
                        <label>{index + 1} : Project Name</label>
                        <input type="text" placeholder="Project Name" value={project.name} onChange={(e) => handleArrayChange(index, "name", e.target.value, "project")} required />

                        <label>Start Date</label>
                        <input type="text" placeholder="Start Date" value={project.startDate} onChange={(e) => handleArrayChange(index, "startDate", e.target.value, "project")} required />

                        <label>End Date</label>
                        <input type="text" placeholder="End Date" value={project.endDate} onChange={(e) => handleArrayChange(index, "endDate", e.target.value, "project")} required />

                        <label>Description</label>
                        <textarea placeholder="Description" value={project.description} onChange={(e) => handleArrayChange(index, "description", e.target.value, "project")} required></textarea>

                        <label>Project Image</label>
                        <input type="file" placeholder="Project Image" onChange={async (e) => {
                            const base64String = await imageToBase64(e);
                            handleArrayChange(index, "image", base64String, "project");
                        }} />
                        {project.image && <img className="edit-image" src={project.image} alt="image"/>}
                    </div>
                ))}
                <button type="button" onClick={() => addArrayItem("project", { name: "", description: "" })}>Add Project</button>

                <h3>Skills</h3>
                {formData.techstack.map((tech, index) => (
                    <div key={index} className="array-item">
                        <label>{index + 1} : Technology Name</label>
                        <input type="text" placeholder="Technology Name" value={tech.name} onChange={(e) => handleArrayChange(index, "name", e.target.value, "techstack")} required />

                        <label>Technology Logo</label>
                        <input type="file" placeholder="Technology Logo" onChange={async (e) => {
                            const base64String = await imageToBase64(e);
                            handleArrayChange(index, "image", base64String, "techstack");
                        }} />
                        {tech.image && <img className="edit-image" src={tech.image} alt="image"/>}
                    </div>
                ))}
                <button type="button" onClick={() => addArrayItem("techstack", { name: "" })}>Add Skills</button>

                <h3>Social Links</h3>
                {formData.social.map((social, index) => (
                    <div key={index} className="array-item">
                        <label>{index + 1} : Platform</label>
                        <input type="text" placeholder="Platform" value={social.name} onChange={(e) => handleArrayChange(index, "name", e.target.value, "social")} required />

                        <label>URL</label>
                        <input type="text" placeholder="URL" value={social.url} onChange={(e) => handleArrayChange(index, "url", e.target.value, "social")} required />

                        <label>Logo</label>
                        <input type="file" placeholder="Logo" onChange={async (e) => {
                            const base64String = await imageToBase64(e);
                            handleArrayChange(index, "image", base64String, "social");
                        }} />
                        {social.image && <img className="edit-image" src={social.image} alt="image"/>}
                    </div>
                ))}
                <button type="button" onClick={() => addArrayItem("social", { name: "", url: "" })}>Add Social Link</button>

                <label htmlFor="urlName">URL Name</label>
                <input type="text" id="urlName" name="urlName" placeholder="Enter unique Url Name of your website.." value={formData.urlName} onChange={handleChange} required />

                <label htmlFor="urlName">Resume</label>
                <input type="file" placeholder="Resume" name="resume" onChange={async (e) => {
                    const base64String = await imageToBase64(e);
                    setFormData({ ...formData, [e.target.name]: base64String });
                }} />
                
            </form>
            <button className="save" onClick={handleSubmit}>Update Data</button>
        </div>
    );
};

export default Edit;
