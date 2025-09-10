
import React from 'react'
import { HeroBullets } from './home/HeroBullets'
import { FeaturesCards } from './home/FeaturesCards'
import { EmailBanner } from './home/EmailBanner'
import { StatsGroup } from './home/StatsGroup'
import { CardsCarousel } from './home/CardsCarousel'
import { CarouselCard } from './home/CarouselCard'
import '@mantine/carousel/styles.css';
import { HeaderMegaMenu } from './(main)/header'
import { FooterLinks } from './(main)/FooterLinks'

const Home = () => {
    return (
        <div>
            <HeaderMegaMenu></HeaderMegaMenu>
            <HeroBullets></HeroBullets>
            {/* <CardsCarousel></CardsCarousel> */}
            <CarouselCard></CarouselCard>
            <FeaturesCards></FeaturesCards>
            <EmailBanner></EmailBanner>
            <StatsGroup></StatsGroup>
            <FooterLinks></FooterLinks>
        </div>
    )
}

export default Home