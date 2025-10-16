import React from 'react';
import { Link } from 'react-router-dom';
import './styles/About.css';

const About = () => {

  const features = [
    {
      icon: "🧩",
      title: "Smart Soil Analysis",
      description: "AI-powered soil analysis from images",
      details: [
        "Upload a photo of soil for instant analysis",
        "AI identifies soil type (Loam, Clay, Sandy, etc.)",
        "Analyzes color tone, texture, and moisture content",
        "Measures pH and fertility index",
        "Generates comprehensive PDF reports",
        "Suggests suitable tree species"
      ]
    },
    {
      icon: "🛰️",
      title: "Land Zone Analysis",
      description: "Satellite-based land assessment",
      details: [
        "Upload satellite/top-view land images",
        "Automatic 3×3 plot division for detailed analysis",
        "Environmental data input per plot",
        "Fertility ranking and zone prioritization",
        "30+ years lifespan tree recommendations",
        "Visualized planting zone reports"
      ]
    },
    {
      icon: "🌳",
      title: "Tree Recommendation Engine",
      description: "Intelligent species selection",
      details: [
        "Long-lifespan species (30+ years)",
        "Climate-adaptive recommendations",
        "Soil-specific suitability analysis",
        "Sustainability-focused selection",
        "Native species prioritization",
        "Growth pattern optimization"
      ]
    },
    {
      icon: "📊",
      title: "Visual Analytics",
      description: "Interactive reports and insights",
      details: [
        "Color-coded fertility maps",
        "Interactive zone rankings",
        "Exportable PDF reports",
        "Planting schedule generation",
        "Progress tracking",
        "Environmental impact metrics"
      ]
    }
  ];

  const environmentalData = [
    { icon: "🌡️", name: "Temperature", description: "Critical for species selection" },
    { icon: "💧", name: "Humidity", description: "Affects water requirements" },
    { icon: "⚗️", name: "Soil pH", description: "Determines nutrient availability" },
    { icon: "🌱", name: "Soil Moisture", description: "Guides irrigation planning" }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background">
          <div className="hero-pattern"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>Open Source Project</span>
            </div>
            <h1 className="hero-title">
              <span className="hero-icon">🌿</span>
              EcoRaiz
            </h1>
            <p className="hero-subtitle">The Smart Planting System</p>
            <p className="hero-description">
              Transforming dry, barren lands into thriving green forests through 
              AI-powered environmental analysis and intelligent planting solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h2>Our Mission</h2>
              <p>
                Make environmental restoration smarter, faster, and more accessible 
                by leveraging cutting-edge technology to help everyone from individual 
                farmers to large environmental organizations understand their land and 
                plant the right trees for the right soil.
              </p>
            </div>
            <div className="vision-card">
              <div className="vision-icon">🔭</div>
              <h2>Our Vision</h2>
              <p>
                EcoRaiz aims to revolutionize reforestation efforts worldwide by 
                combining machine learning, image processing, and environmental science 
                to create sustainable, long-lasting green ecosystems.
              </p>
              <div className="vision-quote">
                <div className="quote-icon">❝</div>
                <p>"Let's make the Earth greener, one intelligent seed at a time."</p>
                <div className="quote-earth">🌍</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Started */}
      <section className="story-section">
        <div className="container">
          <div className="section-header">
            <h2>Why We Started EcoRaiz</h2>
            <p>The inspiration behind our mission to transform reforestation</p>
          </div>
          <div className="story-content">
            <div className="story-text">
              <div className="story-point">
                <div className="point-icon">🌵</div>
                <div className="point-content">
                  <h3>Combatting Desertification</h3>
                  <p>
                    With increasing desertification and land degradation worldwide, 
                    we recognized the urgent need for intelligent solutions that can 
                    quickly assess land potential and recommend optimal planting strategies.
                  </p>
                </div>
              </div>
              <div className="story-point">
                <div className="point-icon">🌍</div>
                <div className="point-content">
                  <h3>Democratizing Reforestation</h3>
                  <p>
                    Traditional reforestation methods often require expert knowledge 
                    and extensive resources. EcoRaiz makes professional-grade analysis 
                    accessible to everyone, from small farmers to large organizations.
                  </p>
                </div>
              </div>
              <div className="story-point">
                <div className="point-icon">🤖</div>
                <div className="point-content">
                  <h3>Leveraging Technology for Good</h3>
                  <p>
                    We believe in harnessing the power of AI and machine learning 
                    to solve critical environmental challenges, creating solutions 
                    that are both effective and scalable.
                  </p>
                </div>
              </div>
            </div>
            <div className="story-visual">
              <div className="impact-stats">
                <div className="impact-stat">
                  <div className="stat-number">2.4B</div>
                  <div className="stat-label">Hectares degraded land worldwide</div>
                </div>
                <div className="impact-stat">
                  <div className="stat-number">30%</div>
                  <div className="stat-label">Increase in planting success with AI</div>
                </div>
                <div className="impact-stat">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Years of combined tree lifespan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Core Features</h2>
            <p>Comprehensive tools for intelligent planting and land analysis</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p className="feature-desc">{feature.description}</p>
                </div>
                <ul className="feature-details">
                  {feature.details.map((detail, idx) => (
                    <li key={idx}>
                      <span className="detail-check">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Detailed */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2>How EcoRaiz Works</h2>
            <p>From land assessment to sustainable planting recommendations</p>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Data Collection</h3>
                <p>Upload land images and provide environmental parameters</p>
                <div className="data-parameters">
                  {environmentalData.map((data, idx) => (
                    <div key={idx} className="parameter-item">
                      <span className="param-icon">{data.icon}</span>
                      <div className="param-info">
                        <strong>{data.name}</strong>
                        <span>{data.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>AI Analysis</h3>
                <p>Machine learning algorithms process the data to identify patterns and opportunities</p>
                <div className="analysis-features">
                  <div className="analysis-item">Plot Division & Zoning</div>
                  <div className="analysis-item">Soil Quality Assessment</div>
                  <div className="analysis-item">Climate Compatibility</div>
                  <div className="analysis-item">Sustainability Scoring</div>
                </div>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Smart Recommendations</h3>
                <p>Get tailored planting strategies for long-term success</p>
                <div className="recommendation-features">
                  <div className="rec-item">
                    <span className="rec-icon">🌳</span>
                    <span>30+ Years Lifespan Trees</span>
                  </div>
                  <div className="rec-item">
                    <span className="rec-icon">📈</span>
                    <span>Optimal Planting Zones</span>
                  </div>
                  <div className="rec-item">
                    <span className="rec-icon">🔄</span>
                    <span>Sustainable Species Mix</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Team</h2>
            <p>The passionate individuals behind EcoRaiz</p>
          </div>
          <div className="team-grid">
            <div className="team-join-card">
              <div className="join-icon">🚀</div>
              <h3>Join Our Mission</h3>
              <p>Help us build the future of sustainable reforestation</p>
              <div className="join-actions">
                <a 
                  href="https://github.com/SuryaNarayananDev/ECORAIZ-The_Smart_Planting" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Contribute on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Land?</h2>
            <p>Join thousands of users already making a difference with EcoRaiz</p>
            <div className="cta-actions">
              <Link to="/soilanalysis" className="btn btn-primary btn-large">
                Start Soil Analysis
              </Link>
              <Link to="/" className="btn btn-secondary">
                Read Documentation
              </Link>
            </div>
            <div className="cta-stats">
              <div className="stat">
                <div className="stat-number">1,000+</div>
                <div className="status-label">Lands Analyzed</div>
              </div>
              <div className="stat">
                <div className="stat-number">50,000+</div>
                <div className="status-label">Trees Recommended</div>
              </div>
              <div className="stat">
                <div className="stat-number">100+</div>
                <div className="status-label">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;