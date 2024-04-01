import Header from '@components/header/Header'
import { StackWithBackground } from '@components/stackWithBackground/stackWithBackground.style'
import ServiceSection from '@features/home/serviceSection/ServiceSection'

function AboutUsPage() {
  return (
    <StackWithBackground>
      <Header />
      <ServiceSection />
    </StackWithBackground>
  )
}

export default AboutUsPage
