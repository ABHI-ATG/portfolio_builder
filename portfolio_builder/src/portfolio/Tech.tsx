import "../css/Tech.css";
import { useSelector } from "react-redux";

const Technologies = () => {
  const techIcons=useSelector((state:any)=>state.data.data.techstack);

  return (
    <section id="tech" className="technologies">
      <h2>Technical Skills</h2>
      <div className="tech-icons">
        {techIcons.map((tech:any) => (
          <div key={tech.name} className="tech">
            <img src={tech.image} alt={tech.name} className="tech_logo" />
            <p>{tech.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Technologies;
