import { useSelector } from "react-redux";
import "../css/Home.css";
import src from "../assets/background.png";

const Home = () => {

  const data = useSelector((state: any) => state.data.data);

  const downloadResume = () => {
    if (!data.resume) {
      alert("No resume available to download.");
      return;
    }

    if (data.resume.startsWith("data:application/pdf;base64,")) {
      const base64String = data.resume.split(',')[1];
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // If it's a direct URL
      const link = document.createElement("a");
      link.href = data.resume;
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section id="hm" className="home">
      <div className="home-content">
        <img
          src={src}
          alt="avatar"
          className="avatar"
        />
        <h1>
          Hey! My name is  <br />
          <span className="gradient-text">{data.firstName + " " + data.secondName}</span>
        </h1>
        <p className="about">
          {data.about}
        </p>
        <div className="buttons">
          <button className="btn primary"><a href="#con">Get In Touch</a></button>
          <button className="btn secondary" onClick={downloadResume}>Download Resume</button>
        </div>
      </div>
    </section>
  );
};

export default Home;
