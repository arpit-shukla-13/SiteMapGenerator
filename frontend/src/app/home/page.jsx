
import React from 'react'
import { HeroBullets } from './HeroBullets'
import { CardsCarousel } from './CardsCarousel'
import { CarouselCard } from './CarouselCard'
import { FeaturesCards } from './FeaturesCards'
import { EmailBanner } from './EmailBanner'
import { StatsGroup } from './StatsGroup'

const Home = () => {
    return (
        <div>
            <HeroBullets></HeroBullets>
            {/* <CardsCarousel></CardsCarousel> */}
            {/* <CarouselCard></CarouselCard> */}
            <FeaturesCards></FeaturesCards>
            <EmailBanner></EmailBanner>
            <StatsGroup></StatsGroup>
        </div>
    )
}

export default Home