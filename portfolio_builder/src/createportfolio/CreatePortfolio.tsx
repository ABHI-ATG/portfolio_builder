import Login from "./Login"
import Signup from "./Signup"
import Dashboard from "./Dashboard"
import Message from './Message'
import Edit from './Edit'
import { Route, Routes, useNavigate } from "react-router-dom"
import "../css/createPortfolio.css"
import ExistingProfiles from "./ExistingProfiles"

const CreatePortfolio = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/createportfolio/login");
    };
    return (
        <>
            <div className="create-portfolio">
                Create Portfolio Website
                {localStorage.getItem("token") ?
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                    :
                    <></>
                }
            </div>
            <Routes>
                <Route path="/" element={
                    <>
                        <div className="create-profiles">
                            <ExistingProfiles />
                            <Message />
                            <Dashboard />
                        </div>
                    </>
                } />
                <Route path="/edit/:string" element={<Edit />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
            </Routes>
        </>
    )
}

export default CreatePortfolio