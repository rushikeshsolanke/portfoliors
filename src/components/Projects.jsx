import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect, useState } from "react";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaHeart,
  FaInfoCircle,
  FaStar,
} from "react-icons/fa";
import Navbar from "./Navbar";
import "./Projects.css";

const Projects = ({ darkMode, toggleDarkMode }) => {
  const [likedProjects, setLikedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  const projects = [
    {
      id: 1,
      title: "NariShakti Android App",
      description:
        "An Android application designed to empower women by providing safety alerts, health resources, and educational material in one place.",
      about: `The NariShakti Android App is designed to empower women by combining safety, health, and education in a single mobile platform. Built with Java and Android Studio, and powered by Firebase for real-time alerts and cloud-based data management, the app ensures users can access vital resources instantly.
      Key features include real-time safety alerts, curated health information, and educational content to support women in everyday life. The project demonstrates end-to-end mobile app development, including user authentication, database integration, and responsive UI design.`,
      technologies: ["Java", "Android Studio", "Firebase"],
      githubLink: "https://github.com/yourusername/narishakti",
      liveLink: "",
      image:
        "https://mir-s3-cdn-cf.behance.net/projects/404/79a360121482185.Y3JvcCwxNDAwLDEwOTUsMCww.png",
    },
    {
      id: 2,
      title: "Booking System (Frontend)",
      description:
        "A responsive booking system frontend for managing reservations and schedules with real-time updates.",
      about: `This project is a responsive frontend for a booking system, designed to help users manage reservations and schedules efficiently. Built using HTML, CSS, and JavaScript, it includes interactive forms, real-time updates, and a clean, user-friendly interface.
      The project demonstrates frontend development skills, responsive design, and the ability to create intuitive interfaces that enhance user experience.`,
      technologies: ["HTML", "CSS", "JavaScript"],
      githubLink: "https://github.com/yourusername/booking-system",
      liveLink: "https://stupendous-crostata-3b3eb8.netlify.app/",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.RDArN_bD5RhU3kLnTaAXIgHaFB?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 3,
      title: "Finance Tracker (React App)",
      description:
        "A React + Node.js app to monitor daily expenses, savings, and financial goals with MongoDB for persistent storage.",
      about: `The Finance Tracker is a full-stack web application that helps users monitor expenses, savings, and financial goals. Built with React for the frontend, Node.js for backend APIs, and MongoDB for persistent storage, it allows secure user authentication and real-time financial tracking.
      Key highlights include interactive dashboards, data visualization for insights, and features to set and achieve financial targets.`,
      technologies: ["React", "Node.js", "MongoDB"],
      githubLink: "https://github.com/yourusername/finance-tracker",
      liveLink: "https://ciode-crafters-m2.vercel.app/",
      image:
        "https://other-levels.com/cdn/shop/products/Personal_Finance_Tracker_Advanced_Excel_Dashboards.png?v=1732556846",
    },
    {
      id: 4,
      title: "Audio Deepfake Detection",
      description:
        "A deep learning project using TensorFlow & Librosa that detects manipulated or deepfake audio with high accuracy.",
      about: `The Audio Deepfake Detection project leverages deep learning techniques to detect synthetic/manipulated audio. Using TensorFlow and Librosa for feature extraction and classification, the system achieves high accuracy in distinguishing real vs. fake audio samples.
      This project showcases applied machine learning, signal processing, and model deployment in Python.`,
      technologies: ["Python", "TensorFlow", "Librosa"],
      githubLink: "https://github.com/yourusername/audio-detection",
      liveLink: "",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "My Portfolio Website",
      description:
        "A modern, responsive portfolio website built with React, showcasing my projects, resume, and contact info with smooth animations.",
      about: `This portfolio website is designed to showcase my projects, skills, and resume in a professional and modern format. Developed with React and GSAP for smooth animations, it provides a responsive and interactive user experience.
      The site includes a project showcase, resume download, contact form, and light/dark themes.`,
      technologies: ["React", "GSAP", "CSS3"],
      githubLink: "https://github.com/yourusername/portfolio",
      liveLink: "https://yourportfolio.com",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&auto=format&fit=crop",
    },
  ];

  const toggleLike = (id) => {
    setLikedProjects((prev) =>
      prev.includes(id)
        ? prev.filter((projectId) => projectId !== id)
        : [...prev, id]
    );
  };

  const handleRating = (id, rating) => {
    setRatings((prev) => ({ ...prev, [id]: rating }));
  };

  const openPopup = (project) => setSelectedProject(project);
  const closePopup = () => setSelectedProject(null);

  useGSAP(
    () => {
      const projectRows = gsap.utils.toArray(".project-row");
      projectRows.forEach((row, index) => {
        gsap.fromTo(
          row,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              end: "top 30%",
              toggleActions: "play none none none",
              id: `project-row-${index}`,
            },
          }
        );
      });
    },
    { scope: ".projects-alternate-layout" }
  );

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <section
        id="projects"
        className={`projects-section ${darkMode ? "dark" : "light"}`}
      >
        <div className="projects-container">
          <h1 className="projects-title">My Projects</h1>
          <p className="projects-subtitle">Here are some of my works</p>

          <div className="projects-alternate-layout">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`project-row ${index % 2 === 0 ? "left" : "right"}`}
              >
                {index % 2 !== 0 ? (
                  <>
                    <div className="project-description-text">
                      <h3>About This Project</h3>
                      <p>{project.about}</p>
                    </div>
                    <div
                      className={`project-card ${darkMode ? "dark" : "light"}`}
                    >
                      <div className="project-image-container">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="project-image"
                        />
                        <button
                          className={`like-btn ${
                            likedProjects.includes(project.id) ? "liked" : ""
                          }`}
                          onClick={() => toggleLike(project.id)}
                        >
                          <FaHeart />
                        </button>
                        <button
                          className="info-btn"
                          onClick={() => openPopup(project)}
                        >
                          <FaInfoCircle />
                        </button>
                      </div>
                      <div className="project-content">
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">
                          {project.description}
                        </p>
                        <div className="project-technologies">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="rating-container">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`star ${
                                star <= (ratings[project.id] || 0)
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() => handleRating(project.id, star)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="project-links">
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGithub /> Code
                        </a>
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaExternalLinkAlt /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`project-card ${darkMode ? "dark" : "light"}`}
                    >
                      <div className="project-image-container">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="project-image"
                        />
                        <button
                          className={`like-btn ${
                            likedProjects.includes(project.id) ? "liked" : ""
                          }`}
                          onClick={() => toggleLike(project.id)}
                        >
                          <FaHeart />
                        </button>
                        <button
                          className="info-btn"
                          onClick={() => openPopup(project)}
                        >
                          <FaInfoCircle />
                        </button>
                      </div>
                      <div className="project-content">
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">
                          {project.description}
                        </p>
                        <div className="project-technologies">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="rating-container">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`star ${
                                star <= (ratings[project.id] || 0)
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() => handleRating(project.id, star)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="project-links">
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGithub /> Code
                        </a>
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaExternalLinkAlt /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="project-description-text">
                      <h3>About This Project</h3>
                      <p>{project.about}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {selectedProject && (
          <div className="project-popup">
            <div className="popup-content">
              <button className="close-btn" onClick={closePopup}>
                ×
              </button>
              <h2>{selectedProject.title}</h2>
              <img src={selectedProject.image} alt={selectedProject.title} />
              <p>{selectedProject.about}</p>
              <div className="technologies">
                <h4>Technologies:</h4>
                <div className="tech-tags">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index}>{tech}</span>
                  ))}
                </div>
              </div>
              <div className="popup-links">
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub /> View Code
                </a>
                {selectedProject.liveLink && (
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Projects;
