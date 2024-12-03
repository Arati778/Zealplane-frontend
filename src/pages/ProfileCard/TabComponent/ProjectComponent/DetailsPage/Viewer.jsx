import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Viewer = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const images = JSON.parse(decodeURIComponent(queryParams.get("images")));
  const startIndex = parseInt(queryParams.get("start"), 10);

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [showPrevIcon, setShowPrevIcon] = useState(false);
  const [showNextIcon, setShowNextIcon] = useState(false);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div
      style={{
        textAlign: "center",
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000", // Fallback for transparency gaps
      }}
      onMouseMove={(e) => {
        const { clientX } = e;
        const { innerWidth } = window;
        setShowPrevIcon(clientX < innerWidth / 2);
        setShowNextIcon(clientX >= innerWidth / 2);
      }}
      onMouseLeave={() => {
        setShowPrevIcon(false);
        setShowNextIcon(false);
      }}
    >
      <img
        src={images[currentIndex]}
        alt={`Thumbnail ${currentIndex + 1}`}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain", // Ensure the entire image fits within the viewport
          position: "relative",
        }}
      />

      {showPrevIcon && (
        <div
          onClick={prevImage}
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            transition: "background-color 0.3s ease, transform 0.3s ease",
            zIndex: 1,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FaChevronLeft size={30} />
        </div>
      )}

      {showNextIcon && (
        <div
          onClick={nextImage}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            transition: "background-color 0.3s ease, transform 0.3s ease",
            zIndex: 1,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FaChevronRight size={30} />
        </div>
      )}
    </div>
  );
};

export default Viewer;
