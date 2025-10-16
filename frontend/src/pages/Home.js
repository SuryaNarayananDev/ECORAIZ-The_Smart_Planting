// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
  const features = [
    {
      icon: "📸",
      title: "Upload Land Image",
      description: "User uploads a top-view image of the plot for analysis"
    },
    {
      icon: "🔍",
      title: "Automatic Plot Division",
      description: "EcoRaiz divides the image into smaller sub-plots for detailed analysis"
    },
    {
      icon: "🌡️",
      title: "Environmental Data Input",
      description: "Input temperature, humidity, soil pH, and moisture for each sub-plot"
    },
    {
      icon: "🌱",
      title: "Analysis & Tree Suggestion",
      description: "Get ranked planting zones and suitable long-lifespan tree recommendations"
    },
    {
      icon: "📊",
      title: "Visual Output",
      description: "Interactive overlay with planting suggestions and zone rankings"
    }
  ];

  const environmentalData = [
    { icon: "🌡️", parameter: "Temperature", unit: "°C" },
    { icon: "💧", parameter: "Humidity", unit: "%" },
    { icon: "⚗️", parameter: "Soil pH", unit: "pH" },
    { icon: "🌱", parameter: "Soil Moisture", unit: "%" }
  ];

  const analysisFeatures = [
    "Analyzes sub-plots for optimal conditions",
    "Ranks suitable planting zones based on multiple factors",
    "Suggests long-lifespan trees (20–50+ years)",
    "Considers sustainability and climate adaptation"
  ];

  // add handler to smoothly scroll to #start and stop below header
  const handleLearnMore = (e) => {
    e.preventDefault();
    const el = document.getElementById('start');
    if (!el) return;
    const header = document.querySelector('.header') || document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12; // small gap
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span>Open Source</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-icon">🌿</span>
            EcoRaiz
          </h1>
          <p className="hero-subtitle">The Smart Planting System</p>
          <p className="hero-description">
            Transforming dry, barren land into thriving green forests through intelligent 
            image processing and environmental analysis.
          </p>
          <div className="hero-actions">
            <Link to="/Plotanalysis" className="btn btn-primary">
              Start Analyzing
            </Link>
            {/* changed: use click handler to smooth-scroll to the section */}
            <a href="#start" onClick={handleLearnMore} className="btn btn-secondary">
              Learn More
            </a>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="section overview-section"  id="start">
        <div className="container">
          <div className="section-header">
            <h2>About EcoRaiz</h2>
            <p>An intelligent system designed to combat desertification and promote sustainable reforestation</p>
          </div>
          <div className="overview-content">
            <div className="overview-text">
              <p>
                EcoRaiz is an intelligent planting system designed to help transform dry, barren land 
                into thriving green forests. By combining image processing and environmental analysis, 
                it identifies the best zones for planting and recommends tree species based on 
                sustainability, soil condition, and climate.
              </p>
              <div className="project-meta">
                <div className="meta-item">
                  <strong>Project Idea by:</strong>
                  <span>Salai Dhean Arasan</span>
                </div>
                <div className="meta-item">
                  <strong>Status:</strong>
                  <span className="status-active">Active Development</span>
                </div>
              </div>
            </div>
            <div className="overview-visual">
              <div className="visual-card">
                <div className="card-icon">🌍</div>
                <h3>Our Mission</h3>
                <p>Transform barren lands into sustainable ecosystems through technology-driven reforestation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section works-section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Simple steps to transform your land analysis and planting strategy</p>
          </div>
          <div className="works-steps">
            {features.map((feature, index) => (
              <div key={index} className="step-card">
                <div className="step-number">0{index + 1}</div>
                <div className="step-icon">{feature.icon}</div>
                <h3 className="step-title">{feature.title}</h3>
                <p className="step-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Data Section */}
      <section className="section data-section">
        <div className="container">
          <div className="section-header">
            <h2>Environmental Data Input</h2>
            <p>For each sub-plot, provide essential environmental parameters</p>
          </div>
          <div className="data-grid">
            {environmentalData.map((data, index) => (
              <div key={index} className="data-card">
                <div className="data-icon">{data.icon}</div>
                <h3>{data.parameter}</h3>
                <span className="data-unit">{data.unit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis & Suggestions */}
      <section className="section analysis-section">
        <div className="container">
          <div className="analysis-content">
            <div className="analysis-text">
              <h2>Analysis & Tree Suggestion</h2>
              <p>The system performs comprehensive analysis to provide optimal planting solutions:</p>
              <ul className="analysis-features">
                {analysisFeatures.map((feature, index) => (
                  <li key={index}>
                    <span className="check-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="analysis-visual">
              <div className="visual-placeholder">
                <div className="placeholder-icon">📊</div>
                <p>Visual Ranked Overlay</p>
                <small>Planting suggestions displayed on plot image</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section className="section contributors-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Contributors</h2>
            <p>Join our growing community of developers and environmental enthusiasts</p>
          </div>
          <div className="contributors-content">
            <div className="contributors-text">
              <p>
                EcoRaiz is made possible by passionate contributors from around the world 
                who believe in using technology for environmental conservation.
              </p>
              <div className="contributors-actions">
                <a 
                  href="https://open-hearted.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  View All Contributors
                </a>
                <a 
                  href="https://github.com/your-username/ecoraiz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Contribute on GitHub
                </a>
              </div>
            </div>
            <div className="contributors-visual">
              <div className="contributors-stats">
                <div className="stat">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Contributors</div>
                </div>
                <div className="stat">
                  <div className="stat-number">100+</div>
                  <div className="stat-label">Trees Recommended</div>
                </div>
                <div className="stat">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Projects Analyzed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Land?</h2>
            <p>Start your journey towards sustainable reforestation today</p>
            <div className="cta-actions">
              <Link to="/analyze" className="btn btn-primary btn-large">
                Start Free Analysis
              </Link>
              <Link to="/documentation" className="btn btn-secondary">
                Read Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;