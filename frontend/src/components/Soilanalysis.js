import React, { useState, useRef } from 'react';
import './Styles/SoilAnalysis.css';
import { useNavigate } from 'react-router-dom';

export default function SoilAnalysis() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) handleFile(f);
  };

  const handleFile = (f) => {
    if (!f.type.match('image.*')) {
      setStatus({ type: 'error', message: 'Please select an image file' });
      return;
    }

    if (f.size > 10 * 1024 * 1024) {
      setStatus({ type: 'error', message: 'File size must be less than 10MB' });
      return;
    }

    setFile(f);
    setPreview(URL.createObjectURL(f));
    setStatus({ type: 'success', message: 'Image selected successfully' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setStatus({ type: 'error', message: 'Please choose an image first' });
      return;
    }
    setStatus({ type: 'success', message: 'Analysis complete! See details below.' });
    setShowModal(true);
  };

  const handleDownloadPDF = () => {
    // Dummy PDF generation
    const pdfContent = `
      Soil Analysis Report

      File Name: ${file?.name}
      Size: ${(file?.size / (1024 * 1024)).toFixed(2)} MB

      Soil Temperature Zones: Moderate
      Moisture Levels: Optimal
      Vegetation Density: Dense
      Soil Texture: Loamy
      Nutrient Status: Balanced
      Drainage: Good
      Sunlight Exposure: Full Sun
      Planting Recommendations: Tomatoes, Spinach, Beans
      Notes: Ideal for summer crops; maintain regular watering

      Thank you for using Ecoraiz Soil Analysis!
    `;
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'soil-analysis-report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    setFile(null);
    setPreview('');
    setStatus({ type: '', message: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="soil-analysis-container">
      <div className="soil-analysis-card">
        {/* Header */}
        <div className="analysis-header">
          <div className="header-icon">🌱</div>
          <h1 className="analysis-title">Soil Analysis</h1>
          <p className="analysis-subtitle">
            Upload a top-view image of your land for intelligent soil analysis and planting recommendations
          </p>
        </div>

        {/* Upload Area */}
        <form className="soil-analysis-form" onSubmit={handleSubmit}>
          <div 
            className={`upload-area ${dragActive ? 'drag-active' : ''} ${preview ? 'has-preview' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
            
            {!preview ? (
              <div className="upload-content">
                <div className="upload-icon">📸</div>
                <div className="upload-text">
                  <h3>Drop your land image here</h3>
                  <p>or click to browse files</p>
                </div>
                <div className="upload-requirements">
                  <span>Supports: JPG, PNG, WebP</span>
                  <span>Max size: 10MB</span>
                </div>
              </div>
            ) : (
              <div className="preview-container">
                <div className="preview-header">
                  <h4>Selected Image</h4>
                  <button 
                    type="button" 
                    className="preview-close"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClear();
                    }}
                  >
                    ×
                  </button>
                </div>
                <div className="image-preview">
                  <img src={preview} alt="Soil preview" />
                  <div className="preview-overlay">
                    <span className="change-text">Click to change image</span>
                  </div>
                </div>
                <div className="file-info">
                  <span className="file-name">{file?.name}</span>
                  <span className="file-size">
                    {(file?.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Status Message */}
          {status.message && (
            <div className={`status-message ${status.type}`}>
              <div className="status-icon">
                {status.type === 'loading' && <div className="loading-spinner"></div>}
                {status.type === 'success' && '✓'}
                {status.type === 'error' && '⚠'}
              </div>
              <span>{status.message}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="analysis-actions">
            <button 
              type="submit" 
              className="btn btn-primaryone analyze-btn"
              disabled={uploading || !file}
            >
              {uploading ? (
                <>
                  <div className="btn-spinner"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <span className="btn-icon">🔍</span>
                  Analyze Soil
                </>
              )}
            </button>
            
            {file && (
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleClear}
                disabled={uploading}
              >
                Clear
              </button>
            )}
          </div>

          {/* Features List */}
          <div className="soilanalysis-features">
            <h4>What we analyze:</h4>
            <div className="features-soilgrid">
              <div className="feature-item">
                <span className="feature-icon">🌡️</span>
                <span>Soil Temperature Zones</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💧</span>
                <span>Moisture Levels</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🌿</span>
                <span>Vegetation Density</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>Planting Recommendations</span>
              </div>
            </div>
          </div>

          {/* Auth Notice */}
          <div className="auth-notice">
            <div className="notice-icon">🔐</div>
            <div className="notice-content">
              <p>
                {localStorage.getItem('token') 
                  ? 'You are signed in. Full analysis features available.'
                  : 'Some features require signing in.'
                }
              </p>
              {!localStorage.getItem('token') && (
                <button 
                  className="auth-link"
                  onClick={() => navigate('/signin')}
                >
                  Sign in for complete analysis
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Modal for soil details and download */}
        {showModal && (
          <div className="soil-modal-overlay">
            <div className="soil-modal">
              <h2>Soil Analysis Details</h2>
             <ul>
  <li><strong>Soil Temperature Zones:</strong> Moderate</li>
  <li><strong>Moisture Levels:</strong> Optimal</li>
  <li><strong>Vegetation Density:</strong> Dense</li>
  <li><strong>Soil Texture:</strong> Loamy</li>
  <li><strong>Nutrient Status:</strong> Balanced</li>
  <li><strong>Drainage:</strong> Good</li>
  <li><strong>Sunlight Exposure:</strong> Full Sun</li>
  <li><strong>Planting Recommendations:</strong> Tomatoes, Spinach, Beans</li>
  <li><strong>Notes:</strong> Ideal for summer crops; maintain regular watering</li>
</ul>

              <button className="btn btn-primaryone" onClick={handleDownloadPDF}>
                Download PDF
              </button>
              <button className="btn btn-secondary" style={{marginLeft: '10px'}} onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
            <style>{`
              .soil-modal-overlay {
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
              }
              .soil-modal {
                background: #fff;
                padding: 2rem;
                border-radius: 8px;
                min-width: 320px;
                box-shadow: 0 2px 16px rgba(0,0,0,0.2);
              }
              .soil-modal h2 { margin-top: 0; }
              .soil-modal ul { margin: 1rem 0; }
              .soil-modal button { margin-top: 1rem; }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}