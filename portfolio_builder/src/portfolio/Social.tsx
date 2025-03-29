import { useSelector } from "react-redux";
import "../css/Social.css";

const Social = () => {
    const data = useSelector((state: any) => state.data.data.social);
    return (
        <footer className="social-footer">
            <p>
                Copyright © 2025 All rights reserved
            </p>
            <div className="social-icons">
                {data.map((social: any) => (
                    <div className="social-icon" key={social.id}>
                        <a
                            href={social.url.includes("@") ? `mailto:${social.url}` : social.url}
                            target={social.url.includes("@") ? "_self" : "_blank"}
                            rel={social.url.includes("@") ? "" : "noopener noreferrer"}
                        >
                            <img src={social.image} alt={social.name} className="logo" />
                        </a>
                    </div>
                ))
                }
            </div>
        </footer>
    )
}

export default Social;