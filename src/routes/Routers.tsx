import { useRoutes } from 'react-router-dom'
import { ROUTE_CONFIG } from './RouteConfig'

export function Routers() {
  return useRoutes(ROUTE_CONFIG)
}
