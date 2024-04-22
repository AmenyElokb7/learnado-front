import { ConfigEnv } from '@config/configEnv'
import mapboxgl from 'mapbox-gl'
import { useRef, useEffect } from 'react'
import { CourseMapCardProps } from './CourseMapCard.type'
import { Stack } from '@mui/material'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

const CourseMapCard = ({
  setLatitude,
  setLongitude,
  mapboxAccessToken,
}: CourseMapCardProps) => {
  const mapContainerRef = useRef(null)

  useEffect(() => {
    mapboxgl.accessToken = ConfigEnv.MAPBOX_ACCESS_TOKEN || mapboxAccessToken

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [GLOBAL_VARIABLES.DEFAULT_LOCALIZATION.LNG, GLOBAL_VARIABLES.DEFAULT_LOCALIZATION.LAT],
      zoom: 15,
    })

    const marker = new mapboxgl.Marker({
      draggable: true,
      clickTolerance: 10,
    })
      .setLngLat([GLOBAL_VARIABLES.DEFAULT_LOCALIZATION.LNG, GLOBAL_VARIABLES.DEFAULT_LOCALIZATION.LAT])
      .addTo(map)

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
    })
    map.addControl(geocoder)

    geocoder.on('result', (e) => {
      const { lat, lng } = e.result.geometry.coordinates
      marker.setLngLat([lng, lat])
      setLatitude(lat)
      setLongitude(lng)
      map.flyTo({ center: [lng, lat] })
    })

    function onDragEnd() {
      const lngLat = marker.getLngLat()
      setLatitude(lngLat.lat)
      setLongitude(lngLat.lng)
    }

    marker.on('dragend', onDragEnd)

    return () => map.remove()
  }, [mapboxAccessToken, setLatitude, setLongitude])

  return (
    <Stack justifyContent={'center'} width={'100%'}>
      <div
        ref={mapContainerRef}
        className="map-container"
        style={{ height: '200px', width: '100%' }}
      />
    </Stack>
  )
}

export default CourseMapCard
