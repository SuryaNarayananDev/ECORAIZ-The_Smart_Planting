import React from 'react';
import { Link } from 'react-router-dom';
import './styles/About.css';

const About = () => {
  const aboutpageFeatures = [
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

  const aboutpageEnvironmentalData = [
    { icon: "🌡️", name: "Temperature", description: "Critical for species selection" },
    { icon: "💧", name: "Humidity", description: "Affects water requirements" },
    { icon: "⚗️", name: "Soil pH", description: "Determines nutrient availability" },
    { icon: "🌱", name: "Soil Moisture", description: "Guides irrigation planning" }
  ];

  return (
    <div className="aboutpage-container">
      {/* Hero Section */}
      <section className="aboutpage-hero">
        <div className="aboutpage-hero-background">
          <div className="aboutpage-hero-pattern"></div>
        </div>
        <div className="aboutpage-container-inner">
          <div className="aboutpage-hero-content">
            <div className="aboutpage-hero-badge">
              <span>Open Source Project</span>
            </div>
            <h1 className="aboutpage-hero-title">
              <span className="aboutpage-hero-icon">🌿</span>
              EcoRaiz
            </h1>
            <p className="aboutpage-hero-subtitle">The Smart Planting System</p>
            <p className="aboutpage-hero-description">
              Transforming dry, barren lands into thriving green forests through 
              AI-powered environmental analysis and intelligent planting solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="aboutpage-mission">
        <div className="aboutpage-container-inner">
          <div className="aboutpage-mission-grid">
            <div className="aboutpage-mission-card">
              <div className="aboutpage-mission-icon">🎯</div>
              <h2>Our Mission</h2>
              <p>
                Make environmental restoration smarter, faster, and more accessible 
                by leveraging cutting-edge technology to help everyone from individual 
                farmers to large environmental organizations understand their land and 
                plant the right trees for the right soil.
              </p>
            </div>
            <div className="aboutpage-vision-card">
              <div className="aboutpage-vision-icon">🔭</div>
              <h2>Our Vision</h2>
              <p>
                EcoRaiz aims to revolutionize reforestation efforts worldwide by 
                combining machine learning, image processing, and environmental science 
                to create sustainable, long-lasting green ecosystems.
              </p>
              <div className="aboutpage-vision-quote">
                <div className="aboutpage-quote-icon">❝</div>
                <p>"Let's make the Earth greener, one intelligent seed at a time."</p>
                <div className="aboutpage-quote-earth">🌍</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Started */}
      <section className="aboutpage-story">
        <div className="aboutpage-container-inner">
          <div className="aboutpage-section-header">
            <h2>Why We Started EcoRaiz</h2>
            <p>The inspiration behind our mission to transform reforestation</p>
          </div>
          <div className="aboutpage-story-content">
            <div className="aboutpage-story-text">
              <div className="aboutpage-story-point">
                <div className="aboutpage-point-icon">🌵</div>
                <div className="aboutpage-point-content">
                  <h3>Combatting Desertification</h3>
                  <p>
                    With increasing desertification and land degradation worldwide, 
                    we recognized the urgent need for intelligent solutions that can 
                    quickly assess land potential and recommend optimal planting strategies.
                  </p>
                </div>
              </div>
              <div className="aboutpage-story-point">
                <div className="aboutpage-point-icon">🌍</div>
                <div className="aboutpage-point-content">
                  <h3>Democratizing Reforestation</h3>
                  <p>
                    Traditional reforestation methods often require expert knowledge 
                    and extensive resources. EcoRaiz makes professional-grade analysis 
                    accessible to everyone, from small farmers to large organizations.
                  </p>
                </div>
              </div>
              <div className="aboutpage-story-point">
                <div className="aboutpage-point-icon">🤖</div>
                <div className="aboutpage-point-content">
                  <h3>Leveraging Technology for Good</h3>
                  <p>
                    We believe in harnessing the power of AI and machine learning 
                    to solve critical environmental challenges, creating solutions 
                    that are both effective and scalable.
                  </p>
                </div>
              </div>
            </div>
            <div className="aboutpage-story-visual">
              <div className="aboutpage-impact-stats">
                <div className="aboutpage-impact-stat">
                  <div className="aboutpage-stat-number">2.4B</div>
                  <div className="aboutpage-stat-label">Hectares degraded land worldwide</div>
                </div>
                <div className="aboutpage-impact-stat">
                  <div className="aboutpage-stat-number">30%</div>
                  <div className="aboutpage-stat-label">Increase in planting success with AI</div>
                </div>
                <div className="aboutpage-impact-stat">
                  <div className="aboutpage-stat-number">50+</div>
                  <div className="aboutpage-stat-label">Years of combined tree lifespan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="aboutpage-features">
        <div className="aboutpage-container-inner">
          <div className="aboutpage-section-header">
            <h2>Core Features</h2>
            <p>Comprehensive tools for intelligent planting and land analysis</p>
          </div>
          <div className="aboutpage-features-grid">
            {aboutpageFeatures.map((feature, index) => (
              <div key={index} className="aboutpage-feature-card">
                <div className="aboutpage-feature-header">
                  <div className="aboutpage-feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p className="aboutpage-feature-desc">{feature.description}</p>
                </div>
                <ul className="aboutpage-feature-details">
                  {feature.details.map((detail, idx) => (
                    <li key={idx}>
                      <span className="aboutpage-detail-check">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="aboutpage-process">
        <div className="aboutpage-container-inner">
          <div className="aboutpage-section-header">
            <h2>How EcoRaiz Works</h2>
            <p>From land assessment to sustainable planting recommendations</p>
          </div>
          <div className="aboutpage-process-steps">
            <div className="aboutpage-process-step">
              <div className="aboutpage-step-number">01</div>
              <div className="aboutpage-step-content">
                <h3>Data Collection</h3>
                <p>Upload land images and provide environmental parameters</p>
                <div className="aboutpage-data-parameters">
                  {aboutpageEnvironmentalData.map((data, idx) => (
                    <div key={idx} className="aboutpage-parameter-item">
                      <span className="aboutpage-param-icon">{data.icon}</span>
                      <div className="aboutpage-param-info">
                        <strong>{data.name}</strong>
                        <span>{data.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="aboutpage-process-step">
              <div className="aboutpage-step-number">02</div>
              <div className="aboutpage-step-content">
                <h3>AI Analysis</h3>
                <p>Machine learning algorithms process the data to identify patterns and opportunities</p>
                <div className="aboutpage-analysis-features">
                  <div className="aboutpage-analysis-item">Plot Division & Zoning</div>
                  <div className="aboutpage-analysis-item">Soil Quality Assessment</div>
                  <div className="aboutpage-analysis-item">Climate Compatibility</div>
                  <div className="aboutpage-analysis-item">Sustainability Scoring</div>
                </div>
              </div>
            </div>
            <div className="aboutpage-process-step">
              <div className="aboutpage-step-number">03</div>
              <div className="aboutpage-step-content">
                <h3>Smart Recommendations</h3>
                <p>Get tailored planting strategies for long-term success</p>
                <div className="aboutpage-recommendation-features">
                  <div className="aboutpage-rec-item">
                    <span className="aboutpage-rec-icon">🌳</span>
                    <span>30+ Years Lifespan Trees</span>
                  </div>
                  <div className="aboutpage-rec-item">
                    <span className="aboutpage-rec-icon">📈</span>
                    <span>Optimal Planting Zones</span>
                  </div>
                  <div className="aboutpage-rec-item">
                    <span className="aboutpage-rec-icon">🔄</span>
                    <span>Sustainable Species Mix</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="aboutpage-team">
        <div className="aboutpage-container-inner">
          <div className="aboutpage-section-header">
            <h2>Our Team</h2>
            <p>The passionate individuals behind EcoRaiz</p>
          </div>
          <div className="aboutpage-team-grid">
            <div className="aboutpage-team-join-card">
              <div className="aboutpage-join-icon">🚀</div>
              <h3>Join Our Mission</h3>
              <p>Help us build the future of sustainable reforestation</p>
              <div className="aboutpage-join-actions">
                <a 
                  href="https://github.com/SuryaNarayananDev/ECORAIZ-The_Smart_Planting" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="aboutpage-btn aboutpage-btn-primary"
                >
                  Contribute on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="aboutpage-cta">
        <div className="aboutpage-container-inner">
          <div className="aboutpage-cta-content">
            <h2>Ready to Transform Your Land?</h2>
            <p>Join thousands of users already making a difference with EcoRaiz</p>
            <div className="aboutpage-cta-actions">
              <Link to="/soilanalysis" className="aboutpage-btn aboutpage-btn-primary aboutpage-btn-large">
                Start Soil Analysis
              </Link>
              <Link to="/" className="aboutpage-btn aboutpage-btn-secondary">
                Read Documentation
              </Link>
            </div>
            <div className="aboutpage-cta-stats">
              <div className="aboutpage-stat">
                <div className="aboutpage-stat-number">1,000+</div>
                <div className="aboutpage-stat-label">Lands Analyzed</div>
              </div>
              <div className="aboutpage-stat">
                <div className="aboutpage-stat-number">50,000+</div>
                <div className="aboutpage-stat-label">Trees Recommended</div>
              </div>
              <div className="aboutpage-stat">
                <div className="aboutpage-stat-number">100+</div>
                <div className="aboutpage-stat-label">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;