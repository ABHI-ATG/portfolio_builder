import "../css/Experience.css";
import { useSelector } from "react-redux";

const Experience = () => {

  const data=useSelector((state:any)=>state.data.data.experience);
  console.log(data);

  return (
    <section id="exp" className="experience">
      <h2>Experience</h2>
      <div className="experience-list">
        {
          data.map((item:any)=>{
            return (
              <div className="job">
                <div className="headline">
                  <img src={item.image} alt="avatar" className="logo" />
                  <h3>{item.title} at {item.company}</h3>
                </div>
                <p>{item.startDate+" - "+item.endDate}</p>
                <p>{item.description}</p>
              </div>
            )
          })
        }
      </div>
    </section>
  );
};

export default Experience;
