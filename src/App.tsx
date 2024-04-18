import React, { FC, useEffect } from 'react'
import { Provider as AntdProvider } from '@ant-design/react-native'
import { StyleSheet, Text, Text as _Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '@/pages/Login'
import MainHolder from '@/pages/MainHolder'
import { baseScreenOptions } from './utils/base-options'
import { Provider, useDispatch } from 'react-redux'
import store from '@/store'
import MyWorks from './pages/MyWorks'
import AuthWrapper from './components-biz/AuthWrapper'
import { hookGlobalProps } from './utils/styles/global-set'
import { Icon } from '@ant-design/react-native'
import { COLOR_MAIN_BLACK } from './utils/styles/base-colors'
import { FONT_SIZE_DEFAULT, FONT_WEIGHT_DEFAULT } from './utils/styles/base-dimens'
import ResponderTest from './pages/Test/ResponderTest'
import MySettings from './pages/MySettings'
import AppSettings from './pages/AppSettings'
import { setUserInfo } from './store/reducers/user.reducer'
import localStorage from './utils/localStorage'
import { DEFAULT_TOKEN_KEY } from './utils/http'
import useUserInfo from './hooks/useUserInfo'

hookGlobalProps(Text, { customStyle: { 
  color: COLOR_MAIN_BLACK, 
  fontSize: FONT_SIZE_DEFAULT,
  fontWeight: FONT_WEIGHT_DEFAULT, 
}})
hookGlobalProps(Icon, { props: { size: FONT_SIZE_DEFAULT, color: COLOR_MAIN_BLACK } }, 'props')

// gesturesEnabled
// Whether you can use gestures to dismiss this screen. Defaults to true on iOS, false on Android.
const Stack = createNativeStackNavigator()

const genScreen = (name: string, Component: FC, type: 'normal' | 'auth' = 'normal', options?: NativeStackNavigationOptions) => {
  if (type === 'auth') {
    return (
      <Stack.Screen name={ name } options={{ ...baseScreenOptions, presentation: 'transparentModal', ...options }}>
        {
          () => <AuthWrapper><Component/></AuthWrapper>
        }
      </Stack.Screen>
    )
  }

  return (
    <Stack.Screen name={ name } component={ Component } options={ baseScreenOptions } />
  )
}

const AppHolder: FC = () => {
  const dispatch = useDispatch()

  const { userProps, requestUserInfo } = useUserInfo()

  useEffect(() => {
    const validateUser = async () => {
      const token = await localStorage.getItem(DEFAULT_TOKEN_KEY)

      // token已经被删除但还在登录态，退出
      if (!token && userProps) {
        dispatch(setUserInfo(null))
        return
      }

      // token在但是用户态不在内存中了，重新获取
      if (token && !userProps) {
        console.log('本地有token，后台获取用户信息')
        requestUserInfo()
      }
    }

    validateUser()

  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Main'>
        <Stack.Screen name='Login' component={ Login } options={ baseScreenOptions }/>
        <Stack.Screen name='Main' component={ MainHolder } options={ baseScreenOptions }/>
        <Stack.Screen name='Test' component={ ResponderTest } options={ baseScreenOptions }/>
        <Stack.Screen name='MyWorks' options={{ ...baseScreenOptions, presentation: 'transparentModal' }}>
          {
            () => <AuthWrapper><MyWorks/></AuthWrapper>
          }
        </Stack.Screen>
        { genScreen('MySettings', MySettings, 'auth') }
        { genScreen('AppSettings', AppSettings, 'auth')}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const App: FC = () => {

  return (
    <Provider store={ store }>
      <AntdProvider>
        <AppHolder/>
      </AntdProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  
})

export default App
