import { useEffect, useState } from "react";
import { ART_IMAGES } from "../helpers/constants";

function ArtList() {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    updateColumns(); // Update the number of columns based on screen size
    window.addEventListener("resize", updateColumns);
    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  const updateColumns = () => {
    if (window.innerWidth >= 768) {
      setColumns(3); // For large screens
    } else if (window.innerWidth >= 640) {
      setColumns(2); // For medium screens
    } else {
      setColumns(1); // For small screens
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 mb-20">
      <ul className="gallery">
        {ART_IMAGES.map((src, index) => (
          <li key={index} className="overflow-hidden">
            <img src={src} alt={`Art ${index + 1}`} className="gallery-item" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtList;
