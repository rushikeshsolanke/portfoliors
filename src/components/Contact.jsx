import emailjs from "@emailjs/browser";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef, useState } from "react";
import {
    FaCheck,
    FaEnvelope,
    FaExclamationCircle,
    FaInstagram,
    FaLinkedin,
    FaMapMarkerAlt,
    FaPhone,
    FaTimes,
    FaTimesCircle
} from "react-icons/fa";
import "./Contact.css";
import Navbar from "./Navbar";


// Initialize EmailJS
const initializeEmailJS = () => {
    if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
        emailjs.init({
            publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            blockHeadless: true
        });
    }
};

// Initialize AOS animations
const initializeAOS = () => {
    AOS.init({
        startEvent: "DOMContentLoaded",
        duration: 600,
        easing: "ease-in-out",
        once: true,
        offset: 100
    });
};

// Email validation regex
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Contact = ({ darkMode, toggleDarkMode }) => {
    // State
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [closing, setClosing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitStatus, setSubmitStatus] = useState(null);

    const nameInputRef = useRef(null);

    // Initialize libraries
    useEffect(() => {
        initializeEmailJS();
        initializeAOS();
    }, []);

    /* -----------------------------
       Handlers
    ------------------------------ */

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.message) {
            setError("Please fill in all fields");
            return;
        }
        if (!validateEmail(formData.email)) {
            setError("Please enter a valid email address");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formData
            );

            if (response.status === 200) {
                setSubmitStatus("success");
                setSubmitted(true);
                setFormData({ name: "", email: "", message: "" });
            } else {
                throw new Error("Email delivery failed");
            }
        } catch (err) {
            console.error("Email send failed:", err);
            setSubmitStatus("error");
            setSubmitted(true);
            setError(
                err.text ||
                    "Failed to send message. Please check your email or try again later."
            );
        } finally {
            setIsLoading(false);

            // Auto close modal after delay
            setTimeout(() => {
                setClosing(true);
                setTimeout(() => {
                    resetModal();
                }, 300);
            }, 2200);
        }
    };

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => resetModal(), 300);
    };

    const resetModal = () => {
        setShowForm(false);
        setClosing(false);
        setError(null);
        setSubmitted(false);
        setSubmitStatus(null);
    };

    /* -----------------------------
       JSX
    ------------------------------ */

    return (
        <div className={`app-container ${darkMode ? "dark" : "light"}`}>
            {/* Navbar */}
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            {/* Contact Section */}
            <section
                id="contact"
                className={`contact-section ${darkMode ? "dark" : "light"}`}
            >
                {/* Hero */}
                <div className="contact-hero">
                    <h1 data-aos="fade-up">Let’s Connect</h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                        Have an idea, project, or just want to say hi? I’d love to hear from you.
                    </p>
                    <button
                        className={`cta-button ${darkMode ? "dark" : "light"}`}
                        onClick={() => setShowForm(true)}
                        aria-label="Contact me"
                        data-aos="zoom-in"
                        data-aos-delay="200"
                    >
                        Contact Me
                    </button>
                </div>

                {/* Info Grid */}
                <div className="contact-grid">
                    {[
                        { icon: <FaPhone />, title: "Phone", content: "+91 9373528748" },
                        { icon: <FaEnvelope />, title: "Email", content: "rushisolanke487@gmail.com" },
                        { icon: <FaMapMarkerAlt />, title: "Location", content: "Nashik, Maharashtra, India" }
                    ].map((item, index) => (
                        <div
                            className="contact-card"
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={150 + index * 120}
                        >
                            <div className="contact-icon-container">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.content}</p>
                        </div>
                    ))}
                </div>

                {/* Social Links */}
                <div className="lets-talk">
                    <h2 data-aos="fade-up">Let’s Talk</h2>
                    <p data-aos="fade-up" data-aos-delay="50">Connect with me on social media</p>
                    <div className="social-links">
                        {[
                            { icon: <FaInstagram />, url: "https://www.instagram.com/rushi_solanke139/" },
                            { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/rushikesh-solanke-86ab9b325/" }
                        ].map((social, index) => (
                            <a
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={index}
                                className="social-link"
                                aria-label={social.icon.type.name}
                                data-aos="fade-up"
                                data-aos-delay={100 + index * 100}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal Contact Form */}
            {showForm && (
                <div
                    className={`modal-overlay ${closing ? "closing" : ""}`}
                    onClick={handleClose}
                >
                    <div
                        className={`modal-content ${darkMode ? "dark" : "light"} ${closing ? "closing" : ""}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {isLoading ? (
                            /* Loader */
                            <div className="loading-container">
                                <div className="dots-loader">
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                </div>
                                <p>Sending your message...</p>
                            </div>
                        ) : !submitted ? (
                            /* Contact Form */
                            <>
                                <button
                                    className="close-button"
                                    onClick={handleClose}
                                    aria-label="Close modal"
                                >
                                    <FaTimes />
                                </button>
                                <h2>Get In Touch</h2>
                                <p>Have a project in mind or want to collaborate? Feel free to reach out!</p>
                                {error && (
                                    <div className="error-message shake-animation">
                                        <FaExclamationCircle className="error-icon" />
                                        <span>{error}</span>
                                    </div>
                                )}
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            ref={nameInputRef}
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            name="message"
                                            placeholder="Your Message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className={`submit-btn ${darkMode ? "dark" : "light"}`}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Sending..." : "Send Message"}
                                    </button>
                                </form>
                            </>
                        ) : (
                            /* Feedback */
                            <div
                                className={`submission-feedback ${submitStatus === "success" ? "success" : "error"} ${submitStatus === "error" ? "shake-animation" : ""}`}
                            >
                                <div className="feedback-icon">
                                    {submitStatus === "success" ? <FaCheck /> : <FaTimesCircle />}
                                </div>
                                <h3>
                                    {submitStatus === "success" ? "Thank You!" : "Delivery Failed"}
                                </h3>
                                <p>
                                    {submitStatus === "success"
                                        ? "Your message has been submitted successfully!"
                                        : "Failed to deliver your message. Please try again later."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact;
