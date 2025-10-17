import React, { useState } from 'react';

function DataTable({ zones, onChange, getSuggestion, onBulkUpdate, onShowSuggestions }) {
  const [uploadStatus, setUploadStatus] = useState('');
  
  // Function to parse the uploaded .txt file
  const parseDataFile = (fileContent) => {
    const lines = fileContent.split('\n');
    const parsedData = [];
    
    for (let i = 0; i < 9; i++) {
      const line = lines[i] || '';
      const zoneMatch = line.match(/Zone\s*(\d+):\s*pH=([\d.]+),\s*humidity=([\d.]+),\s*moisture=([\d.]+)/i);
      
      if (zoneMatch) {
        parsedData[i] = {
          pH: parseFloat(zoneMatch[2]),
          humidity: parseFloat(zoneMatch[3]),
          moisture: parseFloat(zoneMatch[4])
        };
      } else {
        // If line doesn't match expected format, use empty values
        parsedData[i] = { pH: '', humidity: '', moisture: '' };
      }
    }
    
    return parsedData;
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      setUploadStatus('Processing file...');
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const parsedData = parseDataFile(content);
        
        // Update all zones with parsed data
        if (onBulkUpdate) {
          onBulkUpdate(parsedData);
        }
        
        setUploadStatus('✅ Data loaded successfully!');
        setTimeout(() => setUploadStatus(''), 3000);
      };
      reader.readAsText(file);
    } else {
      setUploadStatus('❌ Please upload a valid .txt file');
      setTimeout(() => setUploadStatus(''), 3000);
    }
  };

  // Function to download sample file
  const downloadSampleFile = () => {
    const link = document.createElement('a');
    link.href = '/sample_data.txt';
    link.download = 'sample_zone_data.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* File Upload Section */}
      <div style={{ 
        marginBottom: '20px', 
        textAlign: 'center',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h4 style={{ marginBottom: '10px', color: '#00796b' }}>📁 Upload Data File (Optional)</h4>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
          Upload a .txt file with zone data in format:<br/>
          <code>Zone 1: pH=6.5, humidity=45, moisture=35</code>
        </p>
        
        <div style={{ marginBottom: '10px' }}>
          <button
            onClick={downloadSampleFile}
            style={{
              padding: '6px 12px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              marginRight: '10px'
            }}
          >
            📥 Download Sample File
          </button>
        </div>
        
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          style={{
            padding: '8px',
            border: '2px dashed #00796b',
            borderRadius: '8px',
            backgroundColor: '#f0f8f8',
            cursor: 'pointer',
            width: '100%',
            maxWidth: '300px'
          }}
        />
        
        {uploadStatus && (
          <p style={{ 
            marginTop: '10px', 
            fontSize: '12px',
            color: uploadStatus.includes('✅') ? '#28a745' : '#dc3545'
          }}>
            {uploadStatus}
          </p>
        )}
      </div>

      {/* Existing Table */}
      <table border="1" style={{ width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Zone</th>
            <th>pH</th>
            <th>Humidity (%)</th>
            <th>Moisture (%)</th>
            <th>🌿 Suggested Species</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((z, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <input
                  type="number"
                  value={z.pH}
                  onChange={(e) => onChange(i, 'pH', parseFloat(e.target.value))}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={z.humidity}
                  onChange={(e) => onChange(i, 'humidity', parseFloat(e.target.value))}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={z.moisture}
                  onChange={(e) => onChange(i, 'moisture', parseFloat(e.target.value))}
                />
              </td>
              <td>
                <button
                  className='suggestion-redirect'
                  onClick={() => onShowSuggestions && onShowSuggestions(i)}
                >
                  Suggestion
                </button>
                <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>
                  {getSuggestion(z)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
