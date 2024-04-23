import { Category } from 'types/models/Category'

export interface CategoriesRowProps {
  category: Category
  onEdit: (id: number) => void
}
