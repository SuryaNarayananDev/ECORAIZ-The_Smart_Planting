import React, { useState, useEffect, useRef } from 'react';
import ImageGrid from './plot/ImageGrid';
import DataTable from './plot/DataTable';
import forestSpeciesDB from './plot/tree_data';
import './Styles/Plotpage.css';

const defaultZones = Array.from({ length: 9 }, () => ({ pH: '', humidity: '', moisture: '' }));

function Plotanalysis() {
  const [image, setImage] = useState(null);
  const [zones, setZones] = useState(defaultZones);
  const [ranks, setRanks] = useState([]);
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Compact header on scroll
  useEffect(() => {
    const mainEl = document.querySelector('.main-content-wrapper');
    if (!mainEl) return;
    const onScroll = () => setIsScrolled(mainEl.scrollTop > 4);
    onScroll();
    mainEl.addEventListener('scroll', onScroll, { passive: true });
    return () => mainEl.removeEventListener('scroll', onScroll);
  }, []);

  // Ensure page is scrollable
  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflowY;
    const prevHtmlHeight = document.documentElement.style.height;
    const prevBodyHeight = document.body.style.height;

    document.documentElement.style.overflowY = 'auto';
    document.body.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.height = 'auto';

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflowY = prevHtmlOverflow;
      document.documentElement.style.height = prevHtmlHeight;
      document.body.style.height = prevBodyHeight;
    };
  }, []);

  const handleBulkUpdate = (parsedZones) => {
    setZones(parsedZones);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // revoke previous object URL if any
      if (image && typeof image === 'string' && image.startsWith('blob:')) {
        URL.revokeObjectURL(image);
      }
      const url = URL.createObjectURL(file);
      setImage(url);
      // preserve existing table inputs and ranks when uploading an image
      setFileSelected(true);
      setFileName(file.name);
    } else {
      setFileSelected(false);
      setFileName('');
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...zones];
    updated[index] = { ...updated[index], [field]: parseFloat(value) || '' };
    setZones(updated);
  };

  const getForestSuggestions = (zone) => {
    const suitable = forestSpeciesDB.filter((tree) => {
      const [minPH, maxPH] = tree.pH;
      const [minHum, maxHum] = tree.humidity;
      const [minMoist, maxMoist] = tree.moisture;

      return (
        zone.pH >= minPH && zone.pH <= maxPH &&
        zone.humidity >= minHum && zone.humidity <= maxHum &&
        zone.moisture >= minMoist && zone.moisture <= maxMoist
      );
    });

    return suitable.map(t => `${t.name} (${t.role})`).join(', ') || '❌ No suitable match';
  };

  const analyze = () => {
    const scored = zones.map((z, i) => {
      let score = 0;
      if (z.pH >= 6 && z.pH <= 7.5) score++;
      if (z.humidity >= 40 && z.humidity <= 70) score++;
      if (z.moisture >= 30 && z.moisture <= 60) score++;
      return { index: i, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const rankList = Array(9).fill(null);
    scored.forEach((zone, rank) => {
      rankList[zone.index] = rank;
    });
    setRanks(rankList);
  };

  const resetAll = () => {
    // revoke object URL if created
    if (image && typeof image === 'string' && image.startsWith('blob:')) {
      URL.revokeObjectURL(image);
    }
    setImage(null);
    setZones(defaultZones);
    setRanks([]);
    setFileSelected(false);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="app-container">
      <header role="banner" className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <div className="brand">
            <div aria-hidden="true" className="brand-logo">ER</div>
            <div className="brand-text">
              <h1>ECORAIZ</h1>
              <div className="subtitle">Smart Planting</div>
            </div>
          </div>

          <div className="header-actions">
            <input
              id="imageUpload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              aria-label="Upload image"
              className="upload-btn"
            >
              <span aria-hidden="true">📷</span>
              <span>{fileSelected ? 'Change Image' : 'Upload Image'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content-wrapper">
        <div className="main-content">
          <div className={`left-panel${fileSelected ? ' selected' : ''}`}>
            {image ? (
              <ImageGrid image={image} ranks={ranks} />
            ) : (
              <div className="empty-state">
                Upload an image to begin analysis.
              </div>
            )}
          </div>

          <div className="right-panel">
            <DataTable
              zones={zones}
              onChange={handleChange}
              getSuggestion={getForestSuggestions}
              onBulkUpdate={handleBulkUpdate}
            />
          </div>
        </div>
      </main>

      <footer role="contentinfo" className="app-footer">
        <span className="file-name">
          {fileName || 'No image selected'}
        </span>
        <div className="footer-actions">
          <button type="button" className="analyze-btn" onClick={analyze}>
            Analyze
          </button>
          <button type="button" onClick={resetAll} className="reset-btn">
            <span aria-hidden="true">🔄</span>
            <span>Reset</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Plotanalysis;
