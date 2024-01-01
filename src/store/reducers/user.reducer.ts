import { UserProps } from '@/types/user'
import { DEFAULT_TOKEN_KEY } from '@/utils/http'
import localStorage from '@/utils/localStorage'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type UserState = {
  userProps: UserProps | null
  loading: boolean
  error: Error | null
}

const INIT_STATE: UserState = {
  userProps: null,
  loading: false,
  error: null
}

const slice = createSlice({
  name: 'user',

  initialState: INIT_STATE,

  reducers: {
    setLoding(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },

    setError(state, action: PayloadAction<Error | null>) {
      state.error = action.payload
    },

    setUserInfo(state, action: PayloadAction<UserProps | null>) {
      state.userProps = action.payload
    },

    // 不支持异步
    // logout(state) {
    //   localStorage.removeItem(DEFAULT_TOKEN_KEY).then(() => state.userProps = null)
    // }
  },

})

export const {
  setLoding,
  setError,
  setUserInfo,
  // logout

} = slice.actions

export default slice.reducer
