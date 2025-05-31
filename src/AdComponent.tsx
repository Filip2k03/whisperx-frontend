import  { useEffect, useState } from 'react';

const AdComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.profitableratecpm.com/w80rzsx4b?key=8b4763ad6ff8ff8676cac22bb5e506b6';
    script.async = true;
    script.onload = () => setIsLoading(false);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="ad-container">
      {isLoading ? (
        <p>Loading ad...</p>
      ) : (
        <p>Ad is displayed here!</p>
      )}
    </div>
  );
};

export default AdComponent;
