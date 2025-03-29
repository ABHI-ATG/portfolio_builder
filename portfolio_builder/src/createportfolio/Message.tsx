import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Message.css";  // Import CSS file

const Message = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/userMessage/get", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then((response) => {
                console.log(response.data);
                setData(response.data.messages);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    return (
        <div className="message-container">
            <h2>User Messages</h2>
            {data.length === 0 ? (
                <p className="no-messages">No messages available</p>
            ) : (
                <div className="messages-list">
                    {data.map((item, index) => (
                        <div key={index} className="message-card">
                            <h3>{item.name}</h3>
                            <p><strong>Email:</strong> {item.email}</p>
                            <p className="message-text">{item.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Message;
