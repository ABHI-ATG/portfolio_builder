import { useState } from "react";
import "../css/Contact.css";
import { useSelector } from "react-redux";
import axios from "axios";
import url from '../backend_url'

const Contact = () => {
    const userEmail=useSelector((state:any)=>state.data.data.email);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e:any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        axios.post(url+"/api/userMessage",{...formData,userEmail:userEmail})
        .then(()=>{
            alert("Message Sent Successfully!");
            setFormData({ name: "", email: "", message: "" }); 
        }).catch((error)=>{
            console.log(error);
        })

    };

    return (
        <section id="con" className="contact">
            <h2>Contact Me</h2>
            <p>Feel free to reach out for any questions or collaborations!</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                    />
                </div>

                <div className="form-group">
                    <label>Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Enter your message"
                    />
                </div>

                <button type="submit" className="contact_btn">Send Message</button>
            </form>
        </section>
    );
};

export default Contact;
