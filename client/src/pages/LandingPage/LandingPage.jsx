import React from "react";
import styles from "./LandingPage.module.css";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import headerImage from '../../../public/headerImage.png'
import NavBar from "../../components/NavBar/NavBar"
import Statics from "../../components/Statics/Statics";

const LandingPage = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.NavOuterContainer}>
          <NavBar/>
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
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={styles.arrow}
                />
              </button>
              <button className={styles.contactUsButton}>
                Contact us
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={styles.arrow}
                />
              </button>
            </div>
          </div>

          <div className={styles.HomeImageContainer}>
            <img
              src={headerImage}
              alt=""
              className={styles.HomeImage}
            />
          </div>
        </div>
      </div>
      <div className={styles.Statics}>
        <Statics />
      </div>
    </div>
  );
};

export default LandingPage;
