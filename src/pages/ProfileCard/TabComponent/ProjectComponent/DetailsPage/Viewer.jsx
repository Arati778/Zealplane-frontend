import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importing left and right chevron icons

const Viewer = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const images = JSON.parse(decodeURIComponent(queryParams.get('images')));
  const startIndex = parseInt(queryParams.get('start'), 10);

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [showPrevIcon, setShowPrevIcon] = useState(false); // State for showing previous icon
  const [showNextIcon, setShowNextIcon] = useState(false); // State for showing next icon

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div
      style={{
        textAlign: 'center',
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
      }}
      onMouseMove={(e) => {
        const { clientX } = e; // Get the mouse position
        const { innerWidth } = window; // Get the window width
        setShowPrevIcon(clientX < innerWidth / 2); // Show prev icon if on left half
        setShowNextIcon(clientX >= innerWidth / 2); // Show next icon if on right half
      }}
      onMouseLeave={() => {
        setShowPrevIcon(false); // Hide prev icon
        setShowNextIcon(false); // Hide next icon
      }}
    >
      <img
        src={images[currentIndex]}
        alt={`Thumbnail ${currentIndex + 1}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1, // To ensure the image is behind the buttons
        }}
      />

      {showPrevIcon && (
        <div
          onClick={prevImage}
          style={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker semi-transparent background
            color: '#fff',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            zIndex: 1, // Ensure it appears above the image
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <FaChevronLeft size={30} /> {/* Previous icon */}
        </div>
      )}

      {showNextIcon && (
        <div
          onClick={nextImage}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker semi-transparent background
            color: '#fff',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            zIndex: 1, // Ensure it appears above the image
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <FaChevronRight size={30} /> {/* Next icon */}
        </div>
      )}
    </div>
  );
};

export default Viewer;
