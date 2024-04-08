import { User } from 'types/models/User'

export interface UsersListProps {
  users: User[]
  isLoading: boolean
  isFetching: boolean
}
