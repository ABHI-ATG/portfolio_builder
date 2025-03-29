import "../css/Header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const data=useSelector((state:any)=>state.data.data.logo_name);
  
  return (
    <header className="header">
      <div className="logo">⚡{data}</div>
      <nav>
        <ul>
          <li><a href="#hm">Home</a></li>
          <li><a href="#exp">Experience</a></li>
          <li><a href="#pro">Projects</a></li>
          <li><a href="#tech">Technical Skills</a></li>
          <li><a href="#con">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
