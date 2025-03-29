import axios from "axios";
import { useEffect, useState } from "react";
import "../css/Message.css";
import url from '../backend_url'

const Message = () => {
    
    interface Message {
        name: string;
        email: string;
        message: string;
    }
    const [data, setData] = useState<Message[]>([]);

    useEffect(() => {
        axios
            .get(url + "/api/userMessage/get", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then((response) => {
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
