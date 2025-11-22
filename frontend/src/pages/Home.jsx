import React, { useState, useEffect, useCallback } from 'react';
import logo from "../assest/logo.png"


const App = () => {
    const [chapterCount, setChapterCount] = useState(5);
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = useCallback(() => {
        setScrollPosition(window.scrollY);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Determine if the header should have a background effect (simulating a sticky header)
    const isHeaderSticky = scrollPosition > 50;

    return (
        <>
            <style>
                {`
        /* ---------------------------------------------------- */
        /* --- 🎨 VISUAL REFINEMENTS & ENHANCED RESPONSIVENESS --- */
        /* ---------------------------------------------------- */

        /* --- Global Variables and Keyframes --- */
        :root {
            --bg-primary: #030014; /* Deep Indigo Black */
            --bg-secondary: #0e0427; /* Darker Card Background */
            --color-white: #ffffff;
            --color-text-light: #e5e7eb;
            --color-text-muted: #9ca3af;
            --color-accent-purple: #a855f7; /* Violet-500 */
            --color-accent-pink: #ec4899; /* Pink-500 */
            --shadow-glow-purple: 0 0 30px rgba(168, 85, 247, 0.4);
            --shadow-glow-pink: 0 0 30px rgba(236, 72, 153, 0.4);
            --border-glow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
            --transition-speed: 0.3s ease-in-out;
            --max-content-width: 1280px;
        }

        @keyframes gradient-pulse {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        @keyframes pulse-slow {
            0% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
            100% { opacity: 0.2; transform: scale(1); }
        }
        
        /* --- Base Layout --- */
        .main-container {
            position: relative;
            background-color: var(--bg-primary);
            color: var(--color-text-light);
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
            min-height: 100vh;
        }

        .section {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 8rem 1.5rem; /* Increased vertical padding for more space */
            position: relative;
            z-index: 10;
        }
        
        /* Max width for content within sections */
        .content-area {
            max-width: 72rem; /* 1152px */
            width: 100%;
        }

        /* --- Global Background Glows (Improved) --- */
        .main-container::before, .main-container::after {
            content: '';
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            filter: blur(180px); /* Increased blur for softer glow */
            z-index: 0;
            opacity: 0.3; /* Subtle glow */
        }
        .main-container::before {
            top: -10%; /* Moved up slightly */
            left: -10%;
            width: 700px;
            height: 700px;
            background-color: rgba(168, 85, 247, 0.1); /* Purple/Indigo */
        }
        .main-container::after {
            bottom: -10%; /* Moved down slightly */
            right: -10%;
            width: 600px;
            height: 600px;
            background-color: rgba(236, 72, 153, 0.1); /* Pink */
        }

        /* --- Header Styling (Enhanced Sticky Effect) --- */
        /* ===========================
   HEADER
=========================== */
.main-header {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 999;
    padding: 18px 0;
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.25s ease;
}

/* When sticky */
.main-header.sticky {
    padding: 14px 0;
    background: rgba(20, 20, 20, 0.7);
    backdrop-filter: blur(22px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

/* Contains header layout */
.header-content {
    max-width: 1350px;
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* ===========================
   LOGO
=========================== */
.logo-group {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logo-group .logo-icon img {
    width: 42px;
    height: 42px;
}

.logo-group .logo-text {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #7b2ff7 0%, #f107a3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* ===========================
   NAV MENU
=========================== */
.nav-menu {
    display: flex;
    align-items: center;
    gap: 26px;
}

/* Standard Nav Links */
.nav-link {
    font-size: 1rem;
    color: #d6d6d6;
    text-decoration: none;
    position: relative;
    transition: color 0.25s ease;
}

.nav-link:hover {
    color: #ffffff;
}

/* Underline animation */
.nav-link::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background: linear-gradient(135deg, #7b2ff7, #f107a3);
    transition: width 0.25s ease;
}

.nav-link:hover::after {
    width: 100%;
}

/* Language selector */
.lang-selector {
    color: #c9c9c9;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.25s ease;
}
.lang-selector:hover {
    color: #fff;
}

/* ===========================
   SIGN IN BUTTON
=========================== */
.signin-button {
    padding: 10px 20px;
    border-radius: 8px;
    text-decoration: none;
    background: linear-gradient(135deg, #7b2ff7 0%, #f107a3 100%);
    color: white;
    font-weight: 600;
    transition: all 0.25s ease;
    box-shadow: 0 6px 16px rgba(0,0,0,0.18);
}

.signin-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.22);
}

        /* --- Hero Section --- */
        .hero-section {
            text-align: center;
            padding-top: 10rem;
        }
        .hero-content {
            margin-top: -15rem;
        }
        .hero-title {
            font-size: clamp(2.8rem, 6vw + 1rem, 3.3rem); /* Fluid typography */
            font-weight: 800;
            letter-spacing: -0.04em; /* Tighter spacing */
            margin-bottom: 1.9rem;
            line-height: 1.1;
        }
        .hero-gradient-text {
            display: block;
            background-image: linear-gradient(to right, var(--color-accent-purple), #ff00ff, var(--color-accent-pink)); /* Added an intermediate bright color */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% auto;
            animation: gradient-pulse 6s ease-in-out infinite; /* Added subtle pulse animation */
        }
        .hero-subtitle {
            font-size: clamp(1.2rem, 2vw, 1.2rem); /* Fluid typography */
            color: var(--color-text-muted);
            max-width: 48rem;
            margin: 1.8rem auto 3rem;
            padding-left: .5rem;
    padding-right: .5rem;
        }
        .cta-button {
            padding: 2rem 3rem;
            border-radius: 9999px;
            background-image: linear-gradient(to right, #9333ea, #db2777);
            color: var(--color-white);
            font-weight: 700;
            font-size: 1.25rem;
            transition: opacity var(--transition-speed), transform var(--transition-speed), box-shadow var(--transition-speed);
            box-shadow: 0 10px 30px rgba(147, 51, 234, 0.6), 0 0 10px rgba(255, 255, 255, 0.2); /* Enhanced shadow */
            display: inline-block;
            border: none;
            cursor: pointer;
        }
        .cta-button:hover {
            opacity: 1;
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 15px 40px rgba(147, 51, 234, 0.8), 0 0 20px rgba(255, 255, 255, 0.4);
        }
        .cta-note {
            font-size: 1.1  rem;
            color: var(--color-text-muted);
            margin-top: 2.2rem;
        }

      /* --- Process Section (Enhanced Glass Cards) --- */
.process-section {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding: 5rem 0 10rem;
}

/* Section Header */
.process-header {
    text-align: center;
    margin-bottom: 4rem;
}

.process-title {
    font-size: clamp(3rem, 8vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.025em;
    margin-bottom: 0.5rem;
    line-height: 1.2;
}

.process-countdown-text {
    font-size: 3.5rem;
    font-weight: 800;
    background-image: linear-gradient(to right, var(--color-accent-purple), var(--color-accent-pink));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
}

/* Steps Grid */
.process-steps-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    width: 100%;
}

/* On large screens, align horizontally */
@media (min-width: 1024px) {
    .process-steps-container {
        display: flex;
        gap: 2.5rem;
    }
}

/* Card Styling */
.process-step {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 18rem;
    align-items: center;
    text-align: center;
    padding: 2rem;
    background-color: rgba(14, 4, 39, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    transition: transform var(--transition-speed), box-shadow var(--transition-speed);
    box-shadow: var(--border-glow), 0 10px 25px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
}

/* Hover Effect */
.process-step:hover {
    transform: translateY(-5px);
    box-shadow: var(--border-glow), 0 15px 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(168, 85, 247, 0.3);
}

/* Icon Styling */
.step-icon-wrapper {
    position: relative;
    margin-bottom: 2rem;
    flex-shrink: 0;
}

.step-icon {
    width: 4.5rem;
    height: 4.5rem;
    border: 3px solid var(--color-accent-purple);
    background: linear-gradient(145deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.1));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-text-light);
    position: relative;
    z-index: 2;
}

/* Ping Animation */
.step-icon-ping {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: var(--color-accent-purple);
    animation: pulse-slow 3s infinite ease-in-out;
    opacity: 0.1;
    z-index: 1;
}

/* Step Title */
.step-title {
    font-size: 1.375rem;
    font-weight: 700;
    color: var(--color-white);
    margin-bottom: 0.75rem;
}

/* Step Content Container */
.step-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Step Description */
.step-description {
    font-size: 1rem;
    color: var(--color-text-muted);
    margin-bottom: auto;
}

/* Hidden line (kept for layout compatibility) */
.process-line {
    display: none;
}

        .start-creating-button {
    display: inline-block;
    padding: 14px 28px;
    margin-top: 65px;
    margin-left: 455px;
    
    background: linear-gradient(135deg, #7b2ff7 0%, #f107a3 100%);
    color: #ffffff;
    border: none;
    
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    text-decoration: none;

    /* Smooth animation */
    transition: 
        transform 0.25s ease,
        box-shadow 0.25s ease,
        opacity 0.25s ease;
        
    box-shadow: 0 8px 18px rgba(0,0,0,0.16);
}

/* Hover effect */
.start-creating-button:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 22px rgba(0,0,0,0.22);
    opacity: 0.95;
}

/* Click effect */
.start-creating-button:active {
    transform: scale(0.97);
}


        /* Keyframe for the pulsing effect */
        @keyframes pulse-slow {
            0% { transform: scale(1); opacity: 0.1; }
            50% { transform: scale(1.2); opacity: 0.3; }
            100% { transform: scale(1); opacity: 0.1; }
        }
        /* --- Input Section --- */
        .input-section {
            border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .input-content-wrapper {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
            align-items: center;
            padding: 0 1.5rem;
        }
        @media (min-width: 1024px) {
            .input-content-wrapper {
                grid-template-columns: 1.2fr 1fr; /* Slightly more space for text */
            }
        }
        .input-text-area {
            padding-right: 0; /* Handled by grid gap */
        }
        .input-section-title {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 800;
            letter-spacing: -0.03em;
            margin-bottom: 1rem;
            line-height: 1.1;
        }
        .input-gradient-text {
            background-image: linear-gradient(to right, var(--color-accent-purple), var(--color-accent-pink));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .input-section-subtitle {
            font-size: 1.125rem;
            color: var(--color-text-muted);
            margin-bottom: 2.5rem;
        }
        .input-cta-button {
            padding: 0.85rem 2.5rem;
            border-radius: 0.75rem;
            background-image: linear-gradient(to right, var(--color-accent-purple), var(--color-accent-pink));
            color: var(--color-white);
            font-weight: 600;
            font-size: 1.125rem;
            transition: opacity var(--transition-speed), transform var(--transition-speed);
            box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);
            display: inline-block;
            border: none;
            cursor: pointer;
        }
        .input-cta-button:hover {
            opacity: 0.95;
            transform: translateY(-1px);
        }

        .input-mock-ui-container {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 20rem; /* Adjusted for better mobile fit */
            border-radius: 1rem;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
            overflow: hidden;
            padding: 2rem 0;
        }
        .input-mock-image {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 1rem;
            opacity: 0.1;
        }
        .input-mock-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(3, 0, 20, 0.9), rgba(3, 0, 20, 0.2));
            border-radius: 1rem;
        }
        .input-form-card {
            position: relative;
            z-index: 10;
            width: 90%;
            max-width: 28rem;
            padding: 2rem;
            background-color: var(--bg-secondary);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 1rem;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7), var(--shadow-glow-purple); /* Added subtle shadow glow */
        }
        .input-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--color-text-muted);
            margin-bottom: 0.5rem;
        }
        .input-field {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 0.5rem;
            background-color: var(--bg-primary);
            color: var(--color-white);
            transition: border-color var(--transition-speed), box-shadow var(--transition-speed);
            margin-bottom: 1.5rem; /* Increased margin */
        }
        .input-field:focus {
            outline: none;
            border-color: var(--color-accent-purple);
            box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.3);
        }
        .input-form-button {
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 0.75rem;
            border-radius: 0.5rem;
            background-image: linear-gradient(to right, var(--color-accent-purple), var(--color-accent-pink));
            color: var(--color-white);
            font-weight: 700;
            transition: opacity var(--transition-speed);
            cursor: pointer;
        }
        .input-form-button:hover {
            opacity: 0.9;
        }
        .input-form-pointer {
            position: absolute;
            bottom: -3rem;
            right: -3rem;
            font-size: 5rem; /* Larger pointer */
            pointer-events: none;
            opacity: 0.7;
            color: var(--color-accent-pink);
        }

        /* --- Chapters Section (Mock UI Enhancement) --- */
        .chapters-section {
            border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .chapters-content-wrapper {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
            align-items: center;
            padding: 0 1.5rem;
        }
        @media (min-width: 1024px) {
            .chapters-content-wrapper {
                grid-template-columns: 1fr 1.2fr;
            }
            .chapters-text-area {
                order: 2;
                padding-left: 0; /* Handled by grid gap */
            }
        }
        .chapters-section-title {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 800;
            letter-spacing: -0.03em;
            margin-bottom: 1rem;
            line-height: 1.1;
        }
        .chapters-gradient-text {
            background-image: linear-gradient(to right, var(--color-accent-purple), var(--color-accent-pink));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .chapters-section-subtitle {
            font-size: 1.125rem;
            color: var(--color-text-muted);
            margin-bottom: 2.5rem;
        }
        .chapters-cta-button {
            padding: 0.85rem 2.5rem;
            border-radius: 0.75rem;
            background-image: linear-gradient(to right, var(--color-accent-purple), var(--color-accent-pink));
            color: var(--color-white);
            font-weight: 600;
            font-size: 1.125rem;
            transition: opacity var(--transition-speed), transform var(--transition-speed);
            box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);
            display: inline-block;
            border: none;
            cursor: pointer;
        }
        .chapters-cta-button:hover {
            opacity: 0.95;
            transform: translateY(-1px);
        }

        .chapters-mock-ui-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 24rem;
            padding: 2rem 0;
        }
        .chapters-mock-card {
            position: relative;
            width: 90%;
            max-width: 32rem;
            padding: 2.5rem;
            background-color: var(--bg-secondary);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 1rem;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7), var(--shadow-glow-pink);
            backdrop-filter: blur(8px);
        }
        .chapters-mock-visualization {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 2rem;
            opacity: 0.1;
            pointer-events: none;
        }
        .chapter-line {
            height: 3px; /* Thicker line */
            background: linear-gradient(to right, var(--color-accent-purple), var(--color-accent-pink));
            border-radius: 2px;
        }
        .chapter-line.full {
            width: 95%;
            margin: 0 auto;
        }
        .chapter-line.short {
            width: 70%;
            margin-left: auto;
            margin-right: 2%;
        }

        .chapter-slider-controls {
            position: relative;
            z-index: 10;
            padding: 2rem 1rem 0;
            text-align: center;
        }
        .chapter-count-display {
            width: 5rem;
            height: 5rem;
            background: linear-gradient(135deg, var(--color-accent-purple), var(--color-accent-pink));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0 auto 1.5rem;
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.8);
        }

        .chapter-slider {
            width: 100%;
            height: 0.75rem;
            background: #2d1d4d; /* Darker track */
            border-radius: 0.5rem;
            -webkit-appearance: none;
            appearance: none;
            cursor: grab;
        }
        /* Track fill */
        .chapter-slider::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: calc((${chapterCount} / 10) * 100%); /* Dynamic width (needs JS support) */
            height: 100%;
            background: var(--color-accent-purple);
            border-radius: 0.5rem;
            z-index: 1;
        }
        /* Custom thumb styles for the range input (Refined) */
        .chapter-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            background: var(--color-white);
            border: 3px solid var(--color-accent-purple);
            cursor: grab;
            box-shadow: 0 0 15px rgba(216, 180, 254, 0.8);
            transition: background-color var(--transition-speed);
            z-index: 2;
            position: relative;
        }
        .chapter-slider::-moz-range-thumb {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            background: var(--color-white);
            border: 3px solid var(--color-accent-purple);
            cursor: grab;
            box-shadow: 0 0 15px rgba(216, 180, 254, 0.8);
            transition: background-color var(--transition-speed);
        }
        .chapter-labels {
            display: flex;
            justify-content: space-between;
            font-size: 0.875rem;
            color: var(--color-text-muted);
            margin-top: 0.75rem;
        }

        .main-footer {
  background: var(--bg-secondary);
  border-top: 1px solid rgba(168, 85, 247, 0.2);
  padding: 3rem 1.5rem;
  width: 100%;
  positon:bottom:10px;
  margin-top: auto;
}

.footer-content {
  max-width: 1280px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
}

.footer-tagline {
  color: var(--color-muted);
  max-width: 320px;
  margin-bottom: 1.5rem;
}

.footer-contact p {
  margin: 2.2rem 0;
  color: var(--color-white);
}

.footer-contact a {
  color: var(--color-accent);
  text-decoration: none;
  transition: 0.2s;
}

.footer-contact a:hover {
  opacity: 0.8;
}

.footer-right {
  min-width: 200px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin: 2.4rem 0;
}

.footer-links a {
  color: var(--color-muted);
  text-decoration: none;
  transition: 0.2s;
}

.footer-links a:hover {
  color: var(--color-white);
}

.footer-bottom {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  text-align: center;
  color: var(--color-muted);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .footer-contact {
    text-align: center;
  }
}

        `}
            </style>

            {/* --- JSX STRUCTURE MOCKUP --- */}
            <div className="main-container">

                {/* Header */}
                <header className={`main-header ${isHeaderSticky ? 'sticky' : ''}`}>
                    <div className="header-content">
                        <div className="logo-group">
                            <div className="logo-icon">
                                <img src={logo} alt="EbookAI Logo" />
                            </div>
                            <span className="logo-text">EbookAI</span>
                        </div>
                        <nav className="nav-menu">
                            <a href="#process" className="nav-link">How It Works</a>
                            <a href="#input" className="nav-link">Features</a>
                            <a href="#" className="lang-selector">EN</a>
                            <a href="/login" className="signin-button">Sign In</a>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section id="hero" className="section hero-section">
                    <div className="hero-content content-area">
                        <h1 className="hero-title">
                            Write Your Next Book
                            <span className="hero-gradient-text">in Minutes, with Artificial Intelligence.</span>
                        </h1>
                        <p className="hero-subtitle">
                            The revolutionary AI platform that takes your idea and crafts it into a ready-to-publish, multi-chapter eBook using only your voice or a simple prompt.
                        </p>
                        <a href="#input" className="cta-button">
                            Create Your Free Ebook Now
                        </a>
                        <p className="cta-note">No credit card required. 100% Free Trial.</p>
                    </div>
                </section>

                {/* Process Section */}
                <section id="process" className="section process-section">
                    <div className="content-area">
                        <div className="process-header">
                            <h2 className="process-title">
                                The <span className="input-gradient-text">3-Step</span> Creation Process
                            </h2>
                            <p className="hero-subtitle" style={{ maxWidth: 'unset' }}>
                                From idea to complete manuscript in under 60 seconds.
                            </p>
                        </div>
                        <div className="process-steps-container">
                            <div className="process-step">
                                <div className="step-icon-wrapper">
                                    <div className="step-icon-ping"></div>
                                    <div className="step-icon">1</div>
                                </div>
                                <h3 className="step-title">Input Idea</h3>
                                <p className="step-description">Provide a short prompt, a voice memo, or even a full outline of your book idea.</p>
                            </div>
                            <div className="process-step">
                                <div className="step-icon-wrapper">
                                    <div className="step-icon-ping" style={{ animationDelay: '1s' }}></div>
                                    <div className="step-icon">2</div>
                                </div>
                                <h3 className="step-title">Generate Chapters</h3>
                                <p className="step-description">Our AI creates a full chapter breakdown and content draft based on your input.</p>
                            </div>
                            <div className="process-step">
                                <div className="step-icon-wrapper">
                                    <div className="step-icon-ping" style={{ animationDelay: '2s' }}></div>
                                    <div className="step-icon">3</div>
                                </div>
                                <h3 className="step-title">Review & Export</h3>
                                <p className="step-description">Make edits, adjust the style, and export your finished book in PDF, EPUB, or DOCX format.</p>
                            </div>
                        </div>
                        <a href="#input" className="start-creating-button">
                            Start Creating Now →
                        </a>
                    </div>
                </section>

                {/* Input Section */}
                <section id="input" className="section input-section">
                    <div className="input-content-wrapper content-area">
                        <div className="input-text-area">
                            <h2 className="input-section-title">
                                It All Starts With <span className="input-gradient-text">A Prompt.</span>
                            </h2>
                            <p className="input-section-subtitle">
                                The most sophisticated writing model, trained specifically for long-form content generation, ensuring your book is cohesive, engaging, and professional.
                            </p>
                            <a href="#" className="input-cta-button">
                                Try the Prompt Builder
                            </a>
                        </div>
                        <div className="input-mock-ui-container">
                            <img
                                className="input-mock-image"
                                src="https://placehold.co/600x400/030014/9333ea?text=AI+Drafting+Interface"
                                alt="AI Drafting Interface"
                            />
                            <form className="input-form-card">
                                <label htmlFor="prompt" className="input-label">YOUR BOOK IDEA</label>
                                <input
                                    type="text"
                                    id="prompt"
                                    className="input-field"
                                    placeholder="e.g., A beginner's guide to sustainable city gardening"
                                />
                                <label htmlFor="style" className="input-label">TONE / STYLE</label>
                                <input
                                    type="text"
                                    id="style"
                                    className="input-field"
                                    placeholder="e.g., Casual, informative, and humorous"
                                />
                                <button type="submit" className="input-form-button">
                                    Generate Outline
                                </button>
                                <span className="input-form-pointer">→</span>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Chapters Section */}
                <section id="chapters" className="section chapters-section">
                    <div className="chapters-content-wrapper content-area">
                        <div className="chapters-mock-ui-container">
                            <div className="chapters-mock-card">
                                <div className="chapters-mock-visualization">
                                    <div className="chapter-line full"></div>
                                    <div className="chapter-line short"></div>
                                    <div className="chapter-line full"></div>
                                    <div className="chapter-line short"></div>
                                    <div className="chapter-line full"></div>
                                    <div className="chapter-line short"></div>
                                </div>
                                <div className="chapter-slider-controls">
                                    <div className="chapter-count-display">{chapterCount}</div>
                                    <input
                                        type="range"
                                        min="3"
                                        max="10"
                                        value={chapterCount}
                                        onChange={(e) => setChapterCount(Number(e.target.value))}
                                        className="chapter-slider"
                                    />
                                    <div className="chapter-labels">
                                        <span>3 Chapters</span>
                                        <span>10 Chapters</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chapters-text-area">
                            <h2 className="chapters-section-title">
                                Perfect Structure. <span className="chapters-gradient-text">Every Time.</span>
                            </h2>
                            <p className="chapters-section-subtitle">
                                Easily control the depth and length of your book. Use our dynamic slider to select the exact number of chapters you need before generating the content.
                            </p>
                            <a href="#" className="chapters-cta-button">
                                View Advanced Settings
                            </a>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="main-footer">
                    <div className="footer-content">
                        <div className="footer-left">
                            <h3 className="footer-logo">EbookAI</h3>
                            <p className="footer-tagline">
                                Turning your ideas into beautiful books instantly.
                            </p>

                            <div className="footer-contact">
                                <p>Email: <a href="mailto:balkrishnapandey@gmail.com">balkrishnapandey@gmail.com</a></p>
                                <p>Phone: <a href="tel:9021181633">9021181633</a></p>
                                <p>
                                    LinkedIn:{" "}
                                    <a
                                        href="https://www.linkedin.com/in/balkrishan-pandey-649aa9325"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Balkrishna Pandey
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="footer-right">
                            <ul className="footer-links">
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">Contact Support</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© {new Date().getFullYear()} EbookAI. All rights reserved.</p>
                    </div>
                </footer>

            </div>
        </>
    );
};

export default App;