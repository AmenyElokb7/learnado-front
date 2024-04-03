import { FiltersOption, QueryParams } from 'types/interfaces/QueryParams'

export interface FilterTeachingTypeProps {
  filtersQueryParams: QueryParams
  handleFiltersChange: (filter: FiltersOption) => void
}
