// SingleCourseViewPage.jsx
import React from "react";
import styles from "./SingleCourseViewPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import headerImage from '../../../public/headerImage.png';
import NavBar from "../../components/NavBar/NavBar";
import CompanyLogoSection from "../../components/CompanyLogoSection/CompanyLogoSection";
import CourseSection from "../../components/CourseSection/CourseSection";
import TestimonialSlider from "../../components/TestimonialSlider/TestimonialSlider";
import WebsiteFooter from "../../components/Footer/Footer";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import SingleCoursePage from "../../components/SingleCoursePage";
import Navbar from "../../components/NavBar/NavBar";

const SingleCourseViewPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <>
     
  <div className={styles.mainWrapper}>
        <Navbar/>
     <SingleCoursePage
       course = {location.state.course}
     />
    </div>
    
    </>
  );
};

export default SingleCourseViewPage;