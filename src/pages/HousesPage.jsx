import React from 'react'
import { useState } from 'react'
import {Title} from '../components/Title/Title'
import { Filter } from '../components/Filter/Filter'
import { AllHouses } from '../components/AllHouses/AllHouses'
import { useParams } from 'react-router-dom'

export const HousesPage = () => {
  const [filterHouse, setFilterHouse] = useState("")
  const [sortByPrice, setSortByPrice] = useState(30000000)
  const { keyword } = useParams();


  return (
    <>
    <Title title="Boliger til salg" />
    <Filter setFilterHouse={setFilterHouse} setSortByPrice={setSortByPrice} />
    <AllHouses  filterHouse={filterHouse} sortByPrice={sortByPrice}/>
    </>
  )
}
