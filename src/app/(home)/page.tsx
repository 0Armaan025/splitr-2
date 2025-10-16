import FeaturesSection from '@/components/features/features'
import LandingContent from '@/components/landing/landing'
import Pricing from '@/components/pricing/pricing'
import React from 'react'

type Props = {}
// ALR TIME TO SPEEDRUN THIS THING :fire:
const HomePage = (props: Props) => {
  return (
    <div className="homePage">

        <LandingContent/>
        <FeaturesSection/>
        <Pricing/>
    </div>
  )
}

export default HomePage