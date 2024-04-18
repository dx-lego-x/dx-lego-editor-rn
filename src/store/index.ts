import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserState } from './reducers/user.reducer'
import dynamicConstantsReducer, { DynamicConstantsState } from './reducers/dynamic-constants.reducer'

export type GlobalState = {
  dynamicConstants: DynamicConstantsState
  user: UserState
}

export default configureStore({
  reducer: {
    dynamicConstants: dynamicConstantsReducer,

    user: userReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['user/setError'],
        ignoredPaths: ['user.error'],
      }
    })
  }
})