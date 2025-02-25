import React from 'react'
import { StaffCard } from '../components/Staff/StaffCard'
import { Title } from '../components/Title/Title'
import { Review } from '../components/Review/Review'
import { HouseCard } from '../components/HouseCard/HouseCard'
import {Slider} from '../components/Slider/Slider'

export const FrontPage = () => {
  return (
    <>
    <Slider />
    <HouseCard />
    <Title title="Det siger kunderne" />
    <Review />
    <Title title="Mød vores ansatte" />
    <StaffCard />
    </>
  )
}
