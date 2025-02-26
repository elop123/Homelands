import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import style from '../HouseCardDetails/HouseCardDetails.module.scss'
import { FaCamera, FaMapMarkerAlt, FaHeart } from 'react-icons/fa'
import { CiHeart } from 'react-icons/ci'
import { Modal } from '../Modal/Modal'
import { UserContext } from '../../context/userContext'
import house_icon from '../../assets/icons/layout.png'

export const HouseCardDetails = () => {
const[houseDetails,setHouseDetails]= useState(null);
const[loading, setLoading] = useState(true);
const[error, setError] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [modalContent, setModalContent] = useState(null);
const { favorites, setFavorites } = useContext(UserContext);
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

const openModal = (content) => {
  setModalContent(content);
  setIsModalOpen(true)
}

const toggleFavorite = () => {
  if (favorites.includes(houseDetails.id)) {
      setFavorites(favorites.filter((fav) => fav !== houseDetails.id));
  } else {
      setFavorites([...favorites, houseDetails.id]);
  }
}

  return (
    <section className={style.houseCard}>
      
      {houseDetails  &&(
        <article key={houseDetails.id} className={style.articleStyle}>
        <img className={style.houseImg} src={houseDetails.images[0]?.filename.medium} alt="house_img" />
         <div className={style.infoSection}>
          <div className={style.infoColumn}>
          <p className={style.address}><strong>{houseDetails.address}</strong></p>
          <p className={style.house}>{houseDetails.zipcode} {houseDetails.city}</p>
          <p className={style.house}>{houseDetails.type} | {houseDetails.floor_space}m² |  {houseDetails.num_rooms} værelser</p>
          <p className={style.house}>Set {houseDetails.num_clicks} gange</p>
          </div>
          <div className={style.iconsColumn}>
          <div className={style.iconCircle} onClick={() => openModal(<img className={style.modalImg}  src={houseDetails.images[0]?.filename.medium} alt="house_img" />)}>
          <FaCamera size={30} /></div>
          <div className={style.iconCircle}> 
            <a href="https://www.flaticon.com/free-icon/layout_5505998" 
            target="_blank" rel="noopener noreferrer"><img 
            src={house_icon}
            alt="House_plan_icon" 
            style={{ width: '30px', height: '30px' }} onClick={() => openModal(<img src={getRoomImage(houseDetails.num_rooms)} alt="floor_plan" className={style.modalImage} />)}/></a>
            </div>
          <div className={style.iconCircle} ><FaMapMarkerAlt size={30} /></div>
          <div className={style.iconCircle} onClick={toggleFavorite} >{favorites.includes(houseDetails.id) ? (
    <FaHeart  style={{ color: "red" }} />
  ) : (
    <CiHeart size={30} style={{ color: "black" }} />
  )}</div>
          </div>
          <div className={style.PriceColumn}>
          <p className={style.price}>
          <strong>Kontantpris: {Math.round(houseDetails.price)}</strong></p>
          <p className={style.price}>Udbetaling: {Math.round(houseDetails.payout)}</p>
          <p className={style.price}>Ejergift per måned: {Math.round(houseDetails.cost)}</p>
          </div>
          </div>
          
        <div className={style.propertyDetails}>
      <div className={style.detailsColumn}>
        <div className={style.detailRow}><span className={style.label}>Sagsnr.</span> <span className={style.value}>{houseDetails.id}</span></div>
        <div className={style.detailRow}><span className={style.label}>Boligareal</span> <span className={style.value}>{houseDetails.floor_space} m²</span></div>
        <div className={style.detailRow}><span className={style.label}>Grundareal</span> <span className={style.value}>{houseDetails.plot_space} m²</span></div>
        <div className={style.detailRow}><span className={style.label}>Antal rum</span> <span className={style.value}>{houseDetails.num_rooms}</span></div>
        <div className={style.detailRow}><span className={style.label}>Antal plan</span> <span className={style.value}>{houseDetails.num_floors}</span></div>
      </div>
      <div className={style.detailsColumn}>
        <div className={style.detailRow}><span className={style.label}>Kælder</span> <span className={style.value}>{houseDetails.basement_space} m²</span></div>
        <div className={style.detailRow}><span className={style.label}>Byggeår</span> <span className={style.value}>{houseDetails.year_construction}</span></div>
        <div className={style.detailRow}><span className={style.label}>Ombygget</span> <span className={style.value}>{houseDetails.year_rebuilt}</span></div>
        <div className={style.detailRow}><span className={style.label}>Energimærke</span> <span className={style.value}>{houseDetails.energy_label_name}</span></div>
        <div className={style.detailRow}><span className={style.label}>Liggetid</span> <span className={style.value}>{houseDetails.days_on_market} dage</span></div>
      </div>
      <div className={style.detailsColumn}>
        <div className={style.detailRow}><span className={style.label}>Kontantpris</span> <span className={style.value}>{houseDetails.price.toLocaleString("da-DK")}</span></div>
        <div className={style.detailRow}><span className={style.label}>Udbetaling</span> <span className={style.value}>{houseDetails.payout.toLocaleString("da-DK")}</span></div>
        <div className={style.detailRow}><span className={style.label}>Brutto ex. ejerudgift &nbsp;</span> <span className={style.value}>{houseDetails.gross.toLocaleString("da-DK")}</span></div>
        <div className={style.detailRow}><span className={style.label}>Netto ex. ejerudgift</span> <span className={style.value}>{houseDetails.net.toLocaleString("da-DK")}</span></div>
        <div className={style.detailRow}><span className={style.label}>Ejergift</span> <span className={style.value}>{houseDetails.cost.toLocaleString("da-DK")}</span></div>
      </div>
        </div>

        <div className={style.descriptionInfo}>
        <div className={style.houseDescription}>
        <p className={style.text}>{houseDetails.description}</p>
        </div>
        <div className={style.houseContact}>
        <h2>Kontakt</h2>
        <img src={houseDetails.staff.image} alt="staff_img" className={style.staffImage} />
        <p><strong>{houseDetails.staff.firstname} {houseDetails.staff.lastname}</strong></p>
        <p>{houseDetails.staff.position}</p>
        <p>Mobil: {houseDetails.staff.phone}</p>
        <p>Email: {houseDetails.staff.email}</p>
        </div>
        </div>

          
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          
            {modalContent} 
            
          </Modal>
        </article>
      )}
    </section>
  );
};