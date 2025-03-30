import Home from "./Home";
import Project from "./Project";
import Experience from "./Experience";
import Tech from "./Tech";
import Contact from "./Contact";
import { useDispatch } from "react-redux";
import Header from "./Header";
import Social from './Social'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { addData } from "../data/store";
import url from '../backend_url'
import Loading from './Loading'

const Portfolio = () => {
    const { string: urlName } = useParams(); 
    const dispatch = useDispatch();
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        if (!urlName) return; 
        axios
            .post(url+"/api/userData/get", { urlName })
            .then((response) => {
                dispatch(addData(response.data));
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                setLoading(false);
            });

    }, [urlName, dispatch]); 

    return (
        <>
            {loading?
            <Loading/>
            :
            <>
            <Header />
            <Home />
            <Experience />
            <Project />
            <Tech />
            <Contact />
            <Social />
            </>}
        </>
    )
}
export default Portfolio;