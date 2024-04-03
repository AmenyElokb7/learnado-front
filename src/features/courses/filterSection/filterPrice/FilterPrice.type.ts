import { FiltersOption, QueryParams } from 'types/interfaces/QueryParams'

export interface FilterPriceProps {
  filtersQueryParams: QueryParams

  handleFiltersChange: (filter: FiltersOption) => void
}
