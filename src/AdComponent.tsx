// src/AdComponent.tsx
import React, { useEffect } from 'react';

const AdComponent = () => {
  useEffect(() => {
    // Dynamically load the Ad script or iframe
    const script = document.createElement('script');
    script.src = 'https://www.profitableratecpm.com/w80rzsx4b?key=8b4763ad6ff8ff8676cac22bb5e506b6';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="ad-container">
      <p>Ad will be displayed here!</p>
    </div>
  );
};

export default AdComponent;
