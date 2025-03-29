import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ExistingProfiles.css";
import url from '../backend_url'

const ExistingProfiles = () => {
  const navigate = useNavigate();
  interface UserProfile {
    logo_name: string,
    firstName: string,
    secondName: string,
    about: string,
    resume: string,
    project: [],
    experience: [],
    techstack: [],
    social: [],
    urlName: string,
    email: string
  }
  const [data, setData] = useState<UserProfile[]>([]);
  useEffect(() => {
    axios
      .get(url + "/api/userData/getData", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setData(response.data.length > 0 ? response.data : []);
        } else {
          setData([response.data]);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);


  const handleEdit = (id: any) => {
    navigate(`edit/${id}`);
  };

  return (
    <div className="existing-profiles">
      <h2>Existing Profiles</h2>
      {data.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        data.map((item: any) => (
          <div key={item._id} className="profile-card">
            <h3>{item.firstName + " " + item.secondName}</h3>
            <p>{item.about}</p>
            <p><strong>URL:</strong> {item.urlName}</p>
            <button className="edit-btn" onClick={() => handleEdit(item.urlName)}>Edit</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ExistingProfiles;
