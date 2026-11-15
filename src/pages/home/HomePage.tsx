import { useState } from 'react'

import { MotionConfig } from 'framer-motion'

import { AWS_PLANS } from '@/_mocks/aws-landing.data'
import { AwsContactFooter } from '@/pages/home/components/aws-contact-footer'
import { AwsGlobalStories } from '@/pages/home/components/aws-global-stories'
import { AwsHero } from '@/pages/home/components/aws-hero'
import { AwsNavbar } from '@/pages/home/components/aws-navbar'
import { AwsPricingFaq } from '@/pages/home/components/aws-pricing-faq'
import { AwsServices } from '@/pages/home/components/aws-services'

const HomePage = () => {
  const [selectedPlan, setSelectedPlan] = useState(AWS_PLANS[1].name)

  return (
    <MotionConfig reducedMotion='user'>
      <div className='min-h-screen bg-white dark:bg-[#0F141A] text-[#0F141A] dark:text-slate-100'>
        <AwsNavbar />
        <main>
          <AwsHero />
          <AwsServices />
          <AwsGlobalStories />
          <AwsPricingFaq onSelectPlan={setSelectedPlan} />
          <AwsContactFooter selectedPlan={selectedPlan} />
        </main>
      </div>
    </MotionConfig>
  )
}

export default HomePage
