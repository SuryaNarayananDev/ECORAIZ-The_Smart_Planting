import React, { useState, useRef } from 'react';
import './Styles/SoilAnalysis.css';
import { useNavigate } from 'react-router-dom';

export default function SoilAnalysis() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus({ type: 'error', message: 'Please choose an image first' });
      return;
    }

    setUploading(true);
    setStatus({ type: 'loading', message: 'Analyzing soil image...' });

    try {
      const token = localStorage.getItem('token');
      const form = new FormData();
      form.append('image', file);

      const res = await fetch('/api/soil/upload', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: form
      });

      const data = await res.json();
      
      if (res.ok) {
        setStatus({ 
          type: 'success', 
          message: 'Analysis complete! Processing results...' 
        });
        
        // Navigate to results page if available
        setTimeout(() => {
          if (data.analysisId) {
            navigate(`/analysis/${data.analysisId}`);
          } else if (data.fileUrl) {
            setStatus({ 
              type: 'success', 
              message: `Upload successful: ${data.fileUrl}` 
            });
          }
        }, 1500);
        
      } else {
        setStatus({ 
          type: 'error', 
          message: data.error || 'Upload failed. Please try again.' 
        });
      }
    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection.' 
      });
    } finally {
      setUploading(false);
    }
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
      </div>
    </div>
  );
}