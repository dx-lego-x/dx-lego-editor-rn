import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DynamicConstantsState {
  bottomBarHeight: number
}

const INIT_STATE: DynamicConstantsState = {
  bottomBarHeight: 0
}

const slice = createSlice({
  name: 'DynamicConstants',

  initialState: INIT_STATE,

  reducers: {
    setBottomBarHeight(state, action: PayloadAction<number>) {
      state.bottomBarHeight = action.payload
    }
  }
})

export const {
  setBottomBarHeight
} = slice.actions

export default slice.reducer