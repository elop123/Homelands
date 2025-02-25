import React, { useState, useEffect } from 'react'
import style from '../Slider/Slider.module.scss'

export const Slider = () => {

  const images = [
    "https://api.mediehuset.net/images/homelands/large/house-1.jpg",
        "https://api.mediehuset.net/images/homelands/large/house-2.jpg",
        "https://api.mediehuset.net/images/homelands/large/apartment-2.jpg",
        "https://api.mediehuset.net/images/homelands/large/house-6.jpg",
        "https://api.mediehuset.net/images/homelands/large/house-3.jpg"]

  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [images])

  const nextSlide = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  };

  const prevSlide = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section className={style.slider}>
      <div className={style.slide}>
        <img class={style.imgSlider} src={images[currentImage]} alt="img_slide" />
      </div>
    </section>
  )
}
