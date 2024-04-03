import { FilterPriceEnum } from '@config/enums/filterPrice.enum'

export const PRICE_FILTERS = [
  {
    id: FilterPriceEnum.isPaid,
    label: 'course.paid',
  },
  {
    id: FilterPriceEnum.isFree,
    label: 'course.free',
  },
]
