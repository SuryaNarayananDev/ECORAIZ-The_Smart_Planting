import React, { useState } from 'react';
import './Styles/SoilAnalysis.css';
import { useNavigate } from 'react-router-dom';

export default function Soilanalysis() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [status, setStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus('Please choose an image first.');
      return;
    }
    setUploading(true);
    setStatus('Uploading...');
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
        setStatus('Upload successful.');
        // if backend returns fileUrl, show or navigate
        if (data.fileUrl) {
          setStatus(`Uploaded: ${data.fileUrl}`);
        }
      } else {
        setStatus(data.error || 'Upload failed');
      }
    } catch (err) {
      setStatus('Upload error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="soil-container">
      <h2 className="soil-title">Soil Analysis — Upload Image</h2>

      <form className="soil-form" onSubmit={handleSubmit}>
        <label className="file-label">
          Choose image
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>

        {preview && (
          <div className="preview">
            <img src={preview} alt="preview" />
          </div>
        )}

        <div className="soil-actions">
          <button type="submit" className="upload-btn" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload & Analyze'}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setFile(null);
              setPreview('');
              setStatus('');
            }}
          >
            Clear
          </button>
        </div>

        <div className="soil-status">{status}</div>

        <div className="soil-note">
          Note: You may need to be signed in to upload. <span className="linkish" onClick={() => navigate('/signin')}>Sign in</span>
        </div>
      </form>
    </div>
  );
}
