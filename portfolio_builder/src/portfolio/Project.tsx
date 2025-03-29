import React from "react";
import "../css/Project.css";
import project_logo from "../assets/project.avif";
import { useSelector } from "react-redux";

const Projects = () => {
  const data=useSelector((state:any)=>state.data.data.project);
  
  return (
    <section id="pro" className="projects">
      <h2>Projects</h2>
      <div className="project-list">
        {
          data.map((item:any)=>{
            return (
              <div className="project">
                <img src={item.image} alt="avatar" className="project_logo" />
                <div>
                <h3>{item.name}</h3>
                <p>{item.startDate + " - " + item.endDate}</p>
                </div>
                <p>{item.description}</p>
              </div>
            )
          })
        }
      </div>
    </section>
  );
};

export default Projects;
