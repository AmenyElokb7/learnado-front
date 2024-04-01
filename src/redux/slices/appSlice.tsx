import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface SearchState {
  searchQuery: string
}
const initialState: SearchState = {
  searchQuery: GLOBAL_VARIABLES.EMPTY_STRING,
}
export const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
  },
})

export const { setSearchQuery } = searchQuerySlice.actions
export default searchQuerySlice.reducer
