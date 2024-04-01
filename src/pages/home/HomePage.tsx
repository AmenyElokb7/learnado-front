import Hero from '@features/home/hero/Hero'
import HomeCategries from '@features/home/homeCategories/HomeCategries'
import HomeCourses from '@features/home/homeCourses/HomeCourses'
import ServiceSection from '@features/home/serviceSection/ServiceSection'

function HomePage() {
  return (
    <>
      <Hero />
      <HomeCategries />
      <HomeCourses />
      <ServiceSection />
    </>
  )
}

export default HomePage
