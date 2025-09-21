import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import "../components/About.css";
import Navbar from "./Navbar";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const About = ({ darkMode, toggleDarkMode }) => {
  const skills = [
    { name: "HTML", level: 95 },
    { name: "CSS", level: 90 },
    { name: "JavaScript", level: 45 },
    { name: "Python", level: 38 },
    { name: "React", level: 45 },
    { name: "Node.js", level: 23 },
    { name: "Java", level: 55 },
    { name: "MySQL", level: 75 },
  ];


  const container = useRef();

  useGSAP(
    () => {
      gsap.set(".about-section-card", { opacity: 1, y: 0 });
      gsap.set(".about-hero-text", { opacity: 1, y: 0 });
      gsap.set(".about-image-container", { opacity: 1, y: 0 });

      gsap.utils.toArray(".about-section-card").forEach((section) => {
        gsap.from(section, {
          y: 50,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
            markers: false,
          },
        });
      });

      gsap.utils.toArray(".about-hero-text").forEach((section) => {
        gsap.from(section, {
          y: 50,
          delay: 0.1,
          duration: 0.7,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
            markers: false,
          },
        });
      });

      gsap.utils.toArray(".about-image-container").forEach((section) => {
        gsap.from(section, {
          y: 80,
          delay: 0.2,
          duration: 0.7,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
            markers: false,
          },
        });
      });

      gsap.utils.toArray(".skill-progress").forEach((bar) => {
        gsap.from(bar, {
          width: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar.parentElement,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray(".count-number").forEach((el) => {
        const endValue = parseInt(el.getAttribute("data-count"));
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: endValue,
            duration: 1,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            snap: { innerText: 1 },
            onUpdate: function () {
              el.innerText = Math.floor(el.innerText);
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <div
      className={`app-container ${darkMode ? "dark" : "light"}`}
      ref={container}
    >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <section
        id="about"
        className={`about-section ${darkMode ? "dark" : "light"}`}
      >
        <div className="about-container">
          {/* Hero Section */}
          <div className="about-hero-parent">
            <div className="about-hero">
              <div className="about-hero-text">
                <h1 className="hero-title">Hello!</h1>
                <p className="hero-subtitle">
                  I'm <span className="highlight">Rushi Solanke</span>, a curious mind exploring the intersection of design & development.
                </p>
                <div className="hero-description">
                  <p>
                    I work with React.js and modern CSS to build clean, scalable
                    applications. <br />My goal: create experiences that not only work
                    well but feel delightful to use.
                  </p>
                </div>
              </div>

              <div className="about-image-container">
                <div className="image-wrapper">
                  <img
                    src="images\Untitled_design__3_-Picsart-AiImageEnhancer-removebg-preview (1).png"
                    alt="Rushi Solanke"
                    className="profile-image"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Who I Am Section */}
          <div className="about-section-card">
            <h2 className="section-title">Who I Am</h2>
            <div className="bio-details">
              <div className="bio-item">
                <h3>Name</h3>
                <p>Rushikesh Solanke</p>
              </div>
              <div className="bio-item">
                <h3>SSC</h3>
                <p>Completed 10th from Sillod</p>
              </div>
              <div className="bio-item">
                <h3>HSC</h3>
                <p>Completed 12th from Sillod</p>
              </div>
              <div className="bio-item">
                <h3>Diploma</h3>
                <p>Diploma in Mechanical Engineering</p>
              </div>
              <div className="bio-item">
                <h3>Graduation</h3>
                <p>BE in Computer Engineering, SPPU University</p>
              </div>
              <div className="bio-item">
                <h3>Interests</h3>
                <p>Web Development, AI, Problem Solving</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stats-item">
              <h3>
                <span className="count-number" data-count="12">
                  0
                </span>
                +
              </h3>
              <p>Projects</p>
            </div>
            <div className="stats-item">
              <h3>
                <span className="count-number" data-count="8">
                  0
                </span>
                +
              </h3>
              <p>Completed</p>
            </div>
            <div className="stats-item">
              <h3>
                <span className="count-number" data-count="12">
                  0
                </span>
                +
              </h3>
              <p>Technologies</p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="about-section-card">
            <h2 className="section-title">My Skills</h2>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <h3>{skill.name}</h3>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="skill-level">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Section */}
          <div className="about-section-card">
            <h2 className="section-title">My Resume</h2>
            <p>
              Download my resume to learn more about my qualifications and
              experience.
            </p>
            <a
              href="images/Resume.pdf"
              download
              className="resume-button"
            >
              <FaDownload /> Resume
            </a>
          </div>

          {/* Contact Section */}
          <div className="about-section-card">
            <h2 className="section-title">Let's Connect!</h2>
            <p className="section-text">
              Whether you want to discuss a project, share ideas, or just say
              hello, I'd love to hear from you.
            </p>
            <div className="cta-buttons">
              <a
                href="/contact"
                className={`btn btn-primary ${darkMode ? "dark" : "light"}`}
              >
                Reach me
              </a>
              <div className="social-links">
                <a
                  href="https://github.com/rushikeshsolanke"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="social-icon" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rushikesh-solanke-86ab9b325/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="social-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
