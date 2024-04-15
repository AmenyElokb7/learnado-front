import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { CourseMapCardProps } from './courseMapCard.type'
import { MapCardContainer } from './courseMapCard.style'

import { ConfigEnv } from '@config/configEnv'
import { useTranslation } from 'react-i18next'
import RectangularCard from '@components/cards/rectangularCard/RectangularCard'

const CourseMapCard = ({
  latitude,
  longitude,
  mapboxAccessToken,
}: CourseMapCardProps) => {
  const mapContainerRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      mapboxgl.accessToken = ConfigEnv.MAPBOX_ACCESS_TOKEN || mapboxAccessToken

      const map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [longitude, latitude],
        zoom: 9,
      })

      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map)

      return () => {
        map.remove()
      }
    }
  }, [latitude, longitude, mapboxAccessToken])

  if (latitude === null || longitude === null) {
    return null
  }

  return (
    <RectangularCard title={t('course.map')}>
      <MapCardContainer ref={mapContainerRef} />
    </RectangularCard>
  )
}

export default CourseMapCard
