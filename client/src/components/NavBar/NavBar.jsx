import React, { useState, useEffect } from "react";
import UserStyles from "./LandingPage.module.css";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import logo from '../../../public/logo.png';

const User = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle active link
  useEffect(() => {
    const handleActiveLink = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        if (
          scrollPosition >= section.offsetTop &&
          scrollPosition <= section.offsetTop + section.offsetHeight
        ) {
          setActiveLink(section.getAttribute('id'));
        }
      });
    };
    window.addEventListener('scroll', handleActiveLink);
    return () => window.removeEventListener('scroll', handleActiveLink);
  }, []);

  return (
    <div className={UserStyles.Home}>
      <div className={`${UserStyles.NavOuterContainer} ${isScrolled ? UserStyles.scrolled : ''}`}>
        {/* Desktop Navigation */}
        <div className={UserStyles.DesktopNavBar}>
          <Navbar className={`${UserStyles.NavBar} d-flex justify-content-between`} expand="lg">
            <Navbar.Brand className={UserStyles.NavBrand} href="#">
              <div className={UserStyles.Brand}>
                <img src={logo} alt="logo" />
                <div className={UserStyles.BrandText}>
                  <span className={UserStyles.BrandMain}>G.U.</span>
                  <span className={UserStyles.BrandDivider}>|</span>
                  <span className={UserStyles.BrandSub}>Language Centre</span>
                </div>
              </div>
            </Navbar.Brand>
            
            <Nav className={`${UserStyles.Nav}`}>
              {[
                { href: "#", label: "Home" },
                { href: "#aboutUs", label: "About Us" },
                { href: "#features", label: "Features" },
                { href: "#benefits", label: "Our Benefits" },
                { href: "#courseStructure", label: "Course Structure" },
                { href: "#faq", label: "FAQs" }
              ].map((item) => (
                <Nav.Link
                  key={item.href}
                  href={item.href}
                  className={`${UserStyles.NavLinks} ${
                    activeLink === item.href.replace('#', '') ? UserStyles.active : ''
                  }`}
                >
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>

            <div className={UserStyles.NavButtons}>
              <Button
                className={UserStyles.RegisterButton}
                href="https://registration.gulcentre.com/"
                target="_blank"
              >
                Register Now
                <FontAwesomeIcon icon={faArrowRight} className={UserStyles.buttonIcon} />
              </Button>
            </div>
          </Navbar>
        </div>

        {/* Mobile Navigation */}
        <div className={UserStyles.MobileNavBar}>
          <Navbar expand="lg" className={UserStyles.navMob}>
            <Navbar.Brand className={UserStyles.NavBrand} href="#">
              <img src={logo} alt="logo" className={UserStyles.MobileLogo} />
              <span>G.U.</span>
            </Navbar.Brand>
            
            <Navbar.Toggle className={UserStyles.NavToggle} aria-controls="basic-navbar-nav">
              <span className={UserStyles.ToggleIcon}></span>
            </Navbar.Toggle>
            
            <Navbar.Collapse id="basic-navbar-nav" className={UserStyles.MobileCollapse}>
              <Nav className={UserStyles.MobileNav}>
                {[
                  { href: "#", label: "Home" },
                  { href: "#aboutUs", label: "About Us" },
                  { href: "#features", label: "Features" },
                  { href: "#benefits", label: "Our Benefits" },
                  { href: "#courseStructure", label: "Course Structure" },
                  { href: "#faq", label: "FAQs" }
                ].map((item) => (
                  <Nav.Link
                    key={item.href}
                    href={item.href}
                    className={`${UserStyles.NavLinksMobile} ${
                      activeLink === item.href.replace('#', '') ? UserStyles.active : ''
                    }`}
                  >
                    {item.label}
                  </Nav.Link>
                ))}
                <Button
                  className={`${UserStyles.RegisterButton} ${UserStyles.MobileRegister}`}
                  href="https://registration.gulcentre.com/"
                  target="_blank"
                >
                  Register Now
                  <FontAwesomeIcon icon={faArrowRight} className={UserStyles.buttonIcon} />
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </div>
  );
};

export default User;