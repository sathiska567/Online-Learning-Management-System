// LandingPage.jsx
import React, { useState } from "react";
import styles from "./LandingPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import headerImage from '../../../public/headerImage.png';
import NavBar from "../../components/NavBar/NavBar";
import CompanyLogoSection from "../../components/CompanyLogoSection/CompanyLogoSection";
import CourseSection from "../../components/CourseSection/CourseSection";
import TestimonialSlider from "../../components/TestimonialSlider/TestimonialSlider";
import WebsiteFooter from "../../components/Footer/Footer";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState([]);

  const handleContactUsClick = async()=>{
    try {
      navigate("/contact-us")
      
    } catch (error) {
      message.error(error.message)
    }
  }
  return (
    <>
     <div className={styles.navBarSection}>
       <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
       </div>
       <div className={styles.mainWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.HomeContainer}>
          <div className={styles.HomeTextContainer}>
            <div className={styles.homeTitle}>
              Unlock Endless <br /> Opportunities to <br /> learn{" "}
              <span className={styles.HomeSpecial}>English</span>
            </div>
            <div className={styles.homeDescription}>
              Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam
              eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac
              cum eget habitasse in velit fringilla feugiat senectus in.
            </div>
            <div className={styles.homeButtonGroup}>
              <button className={styles.coursesButton}>
                See Courses
                <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
              </button>
              <button className={styles.contactUsButton} onClick={handleContactUsClick}>
                Contact us
                <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
              </button>
            </div>
          </div>
          <div className={styles.HomeImageContainer}>
            <img src={headerImage} alt="" className={styles.HomeImage} />
          </div>
        </div>
      </div>
      <div>
        <CompanyLogoSection/>
      </div>
      <div>
        <CourseSection searchQuery={searchQuery}/>
      </div>
      <div>
        <TestimonialSlider/>
      </div>
      <div>
        <WebsiteFooter/>
      </div>
     
    </div>
    
    </>
  );
};

export default LandingPage;