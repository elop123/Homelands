import React, { useState, useEffect } from "react"
import style from "./Gallery.module.scss"
import { FaRegArrowAltCircleRight } from "react-icons/fa"
import { FaRegArrowAltCircleLeft } from "react-icons/fa"

export const Gallery = ({ houseId, onClose }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); 

  const url = `https://api.mediehuset.net/homelands/homes/${houseId}`

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch images");
        }
        return res.json();
      })
      .then((data) => {
        if (data.item && data.item.images) {
          setImages(data.item.images)
        } else {
          setError("No image found")
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [houseId])

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  if (loading) return <p>Loading images...</p>
  if (error) return <p className={style.error}>{error}</p>

  return (
    <div className={style.galleryModal}>
      <button className={style.arrowLeft} onClick={handlePrev}>
      <FaRegArrowAltCircleLeft size={24} />
      </button>

      <img
        src={images[currentIndex].filename.large}
        alt={images[currentIndex].description || "House Image"}
        className={style.galleryImage}
      />
       <button className={style.arrowRight} onClick={handleNext}>
      <FaRegArrowAltCircleRight size={24} />
      </button>
    </div>
  );
};
