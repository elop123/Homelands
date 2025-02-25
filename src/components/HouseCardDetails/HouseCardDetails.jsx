import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import style from '../HouseCardDetails/HouseCardDetails.module.scss'
import { FaCamera, FaMapMarkerAlt } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import house_icon from '../../assets/icons/layout.png'

export const HouseCardDetails = () => {
const[houseDetails,setHouseDetails]= useState(null);
const[loading, setLoading] = useState(true);
const[error, setError] = useState(null);
const { id } = useParams();

const url=`https://api.mediehuset.net/homelands/homes/${id}`

useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch the house details");
        }
        return res.json();
      })
      .then((data) => {
        if  (!data.item || data.item.length === 0) {
          setError("No house details found");
        } else {
          setHouseDetails(data.item);
        }
        console.log(data.item);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p>Loading houses details...</p>;
  }

  if (error) {
    return <p className={style.error}>{error}</p>;
  }


  return (
    <section className={style.houseCard}>
      
      {houseDetails  &&(
        <article key={houseDetails.id} className={style.articleStyle}>
        <img className={style.houseImg} src={houseDetails.images[0]?.filename.medium} alt="house_img" />
         <div className={style.houseInfo}>
          <p>{houseDetails.address}</p>
          <p>{houseDetails.zipcode} {houseDetails.city}</p>
          <p>{houseDetails.type} | {houseDetails.floor_space}m² |  {houseDetails.num_rooms} værelser</p>
          <p>Set {houseDetails.num_clicks} gange</p>
        </div>
          <div className={style.houseIcons}>
          <div className={style.iconCircle}><FaCamera /></div>
          <div className={style.iconCircle}> 
            <a href="https://www.flaticon.com/free-icon/layout_5505998" 
            target="_blank" rel="noopener noreferrer"><img 
            src={house_icon}
            alt="House_plan_icon" 
            style={{ width: '30px', height: '30px' }}
          /></a></div>
          <div className={style.iconCircle} ><FaMapMarkerAlt /></div>
          <div className={style.iconCircle}><CiHeart /></div>
          </div>
          <div className={style.Price}>
          <p>Kontantpris <strong>{houseDetails.price} DKK</strong></p>
          <p>Udbetaling: {houseDetails.payout}</p>
          <p>Ejergift per måned: {houseDetails.cost}</p>
          </div>
          <div className={style.bigInfo}>
          <p>Sagsnr. {houseDetails.id}</p>
          <p>Boligareal {houseDetails.floor_space}</p>
          <p>Grundareal</p>
          <p>Antal rum {houseDetails.num_rooms}</p>
          <p>Antal plan {houseDetails.floor_space}</p>
          </div>
          <div className={style.bigInfo2}>
          <p>Kælder {houseDetails.basement_space}</p>
          <p>Byggeår {houseDetails.year_construction}</p>
          <p>Ombygget {houseDetails.year_rebuilt}</p>
          <p>Enrgymærke {houseDetails.energy_label_name}</p>
          <p>Ligetid </p>
          </div>
          <div className={style.priceInfo}>
          <p>Kontantpris <strong>{houseDetails.price}</strong></p>
          <p>Udbetaling: {houseDetails.payout}</p>
          <p>Brutto ex. ejergift {houseDetails.gross}</p>
          <p>Netto ex. ejergift {houseDetails.net}</p>
          <p>Ejergift per måned: {houseDetails.cost}</p>
          </div>
          <div className={style.houseDescription}>
          <p>{houseDetails.description}</p>
          </div>
          <div className={style.houseContact}>
          <h2>Kontakt</h2>
          <img src={houseDetails.staff.image} alt="staff_img" />
          <p>{houseDetails.staff.firstname} {houseDetails.staff.lastname}</p>
          <p>{houseDetails.staff.position}</p>
          <p>Mobil: {houseDetails.staff.phone}</p>
          <p>Email: {houseDetails.staff.email}</p>
          </div>
        </article>
      )}
    </section>
  );
};