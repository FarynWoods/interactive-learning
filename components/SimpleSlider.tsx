import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function SimpleSlider() {
  const [value, setValue] = useState(50);

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ fontSize: '16px', fontWeight: '500' }}>
          Value: {value}
        </label>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{ width: '100%' }}
      />
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        The square of this value is: <strong>{value * value}</strong>
      </div>
    </div>
  );
}

const mountPoint = document.getElementById('simple-slider-widget');
if (mountPoint) {
  const root = createRoot(mountPoint);
  root.render(<SimpleSlider />);
}
