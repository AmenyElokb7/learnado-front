import { FiltersOption, QueryParams } from 'types/interfaces/QueryParams'

export interface FilterCategoriesProps {
  filtersQueryParams: QueryParams
  handleFiltersChange: (filter: FiltersOption) => void
}
