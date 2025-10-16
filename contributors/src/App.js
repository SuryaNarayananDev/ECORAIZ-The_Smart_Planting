import React, { useState } from 'react';
import './App.css';
import contributors from './contributors.json';

function App() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  // Filter and sort contributors
  const filtered = contributors
    .filter(c => {
      const searchText = search.trim().toLowerCase();
      const name = (c.name || '').trim().toLowerCase();
      const git = (c.git || '').trim().toLowerCase();
      return name.includes(searchText) || git.includes(searchText);
    })
    .sort((a, b) => b.points - a.points);

  return (
    <div className="App" style={{ background: "#f5f7fa", minHeight: "100vh", padding: 0 }}>
      {/* Header */}
      <header style={{
        width: "100%",
        background: "#f2bc0cff",
        color: "#fff",
        padding: "18px 0",
        marginBottom: 24,
        textAlign: "center",
        fontSize: 48,
        fontWeight: 700,
        letterSpacing: 2,
        boxShadow: "0 2px 8px #e0e0e0",
        textShadow: "2px 2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, -2px -2px 0 #000" // Black stroke
      }}>
        OPENHEARTED 💗
      </header>
      <div className="main-content" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 32,
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 12px',
        boxSizing: 'border-box'
      }}>
        {/* Banner */}
        <div className="points-banner" style={{
          background: '#fffbe7',
          borderRadius: 16,
          boxShadow: '0 4px 16px #e0e0e0',
          padding: 24,
          minWidth: 220,
          maxWidth: 260,
          fontSize: 16,
          fontWeight: 500,
          color: '#7b5e00',
          marginBottom: 24,
          position: 'sticky',
          top: 52,
          height: 500, // Increased height
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'center'
        }}>
          <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 30 }}>Points System</div>
          <hr style={{ margin: '12px 0', borderColor: '#e0e0e0' }} />
          <ul style={{ paddingLeft: 5, margin: 0 ,fontSize: 20 }}>
            <p className='points'>Solve One Issue : 50pts</p>
             <p className='points'>Raise One Issue : 20pts</p>
              <p className='points'>Solve One Bug : 20pts</p>
               <p className='points'>Add feature Idea : 30pts</p>
                <p className='points'>Add feature : 100pts</p>
                 <p className='points'>Design : 20pts</p>
                  <p className='points'>Data Collection : 30pts</p>
                   <p className='points'>Suggestion / Discuss : 10pts</p>

            {/* Add more as needed */}
          </ul>
        </div>
        {/* Main leaderboard */}
        <div style={{ flex: 1, maxWidth: 480, margin: "0 auto" }}>
          <h2 style={{ marginBottom: 24, textAlign: "center" }}>Contributors Leaderboard</h2>
          <input
            type="text"
            placeholder="Search contributors..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              marginBottom: 24,
              padding: 12,
              width: '100%',
              borderRadius: 8,
              border: '1px solid #ccc',
              fontSize: 16,
              boxShadow: '0 1px 4px #e0e0e0',
              outline: 'none'
            }}
          />
          <div>
            {filtered.map((c, idx) => (
              <div
                key={c.id}
                style={{
                  background: selected === c.id ? '#94e2f1ff' : '#fff',
                  borderRadius: 16,
                  boxShadow: '0 4px 16px #e0e0e0',
                  padding: 20,
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  flexDirection: 'row',
                  transition: 'box-shadow 0.2s, background 0.2s'
                }}
                onClick={() => setSelected(selected === c.id ? null : c.id)}
              >
                <img
                  src={c.avatar}
                  alt={c.name}
                  style={{
                    borderRadius: '50%',
                    width: 64,
                    height: 64,
                    marginRight: 18,
                    border: '3px solid #0d2629ff',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: 18, marginBottom: 4, display: 'block' }}>
                    {idx + 1}. {c.name}
                  </strong>
                  <hr />
                  <span style={{ color: '#0097a7', fontWeight: 600, marginBottom: 8, display: 'block' }}>
                    {c.points} pts
                  </span>
                  {selected === c.id && (
                    <div style={{
                      marginTop: 8,
                      fontSize: 15,
                      background: '#f1f8e9',
                      borderRadius: 8,
                      padding: 10,
                      boxSizing: 'border-box'
                    }}>
                      <div className='detais'><b>Current Task:</b> {c.currentTask}</div>
                      <div className='detais'><b>Last Action:</b> {c.lastAction}</div>
                      <button
                        className='detais-profile'
                        onClick={e => {
                          e.stopPropagation();
                          window.open(c.git, '_blank');
                        }}
                      >
                        View Profile
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Banner for mobile */}
      <div className="points-banner-mobile">
        <div style={{
          background: '#fffbe7',
          borderRadius: 16,
          boxShadow: '0 4px 16px #e0e0e0',
          padding: 18,
          fontSize: 15,
          fontWeight: 500,
          color: '#7b5e00',
          margin: 16,
          maxWidth: 400,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 30 }}>Points System</div>
          <hr style={{ margin: '12px 0', borderColor: '#e0e0e0' }} />
          <ul style={{ paddingLeft: 5, margin: 0 ,fontSize: 20 }}>
            <p className='points'>Solve One Issue : 50pts</p>
             <p className='points'>Raise One Issue : 20pts</p>
              <p className='points'>Solve One Bug : 20pts</p>
               <p className='points'>Add feature Idea : 30pts</p>
                <p className='points'>Add feature : 100pts</p>
                 <p className='points'>Design : 20pts</p>
                  <p className='points'>Data Collection : 30pts</p>
                   <p className='points'>Suggestion / Discuss : 10pts</p>

            {/* Add more as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
