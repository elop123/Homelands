import React, { useState, useEffect } from 'react'
import style from '../Slider/Slider.module.scss'
import img1 from '../../assets/images/city/Vejle.jpg'
import img2 from '../../assets/images/city/Aarhus.jpg'
import img3 from '../../assets/images/city/utzon-center.jpg'
import img4 from '../../assets/images/city/Sæbe.jpg'
import img5 from '../../assets/images/city/Hadsund.jpg'
import img6 from '../../assets/images/large/apartment-3.jpg'

export const Slider = () => {

  const images = [img6, img1, img2, img3, img4, img5]

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
        <img className={style.imgSlider} src={images[currentImage]} alt="img_slide" />
      </div>
    </section>
  )
}
