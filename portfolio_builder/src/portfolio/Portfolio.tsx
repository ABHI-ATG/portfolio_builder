import Home from "./Home";
import Project from "./Project";
import Experience from "./Experience";
import Tech from "./Tech";
import Contact from "./Contact";
import { useDispatch } from "react-redux";
import Header from "./Header";
import Social from './Social'
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { addData } from "../data/store";
import url from '../backend_url'

const Portfolio = () => {
    const { string: urlName } = useParams(); 
    const dispatch = useDispatch();

    useEffect(() => {
        if (!urlName) return; 
        axios
            .post(url+"/api/userData/get", { urlName })
            .then((response) => {
                dispatch(addData(response.data));
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });

    }, [urlName, dispatch]); 

    return (
        <>
            <Header />
            <Home />
            <Experience />
            <Project />
            <Tech />
            <Contact />
            <Social />
        </>
    )
}
export default Portfolio;