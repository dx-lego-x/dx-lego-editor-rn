import { View } from 'react-native'
import React, { FC, useEffect, useRef } from 'react'
import { BaseFCProps } from '@/types/base'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import PopupWrapper from '@/components/PopupWrapper'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { COLOR_WHITE } from '@/utils/styles/base-colors'
import LoginContent from '../LoginContent'
import { getScreenHeight } from '@/utils/display'
import { ActivityIndicator, Icon, Provider, Result } from '@ant-design/react-native'
import localStorage from '@/utils/localStorage'
import { DEFAULT_TOKEN_KEY } from '@/utils/http'
import useUserInfo from '@/hooks/useUserInfo'

export interface AuthWrapperProps extends BaseFCProps {

}

const AuthWrapper: FC<AuthWrapperProps> = (props) => {
  const { children } = props

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { userProps, requestUserInfo, loading: fetchUserInfoLoading, error } = useUserInfo()
  const userPropsRef = useRef(userProps)

  // 登出时从当前路由退出
  useEffect(() => {
    if (userPropsRef.current !== null && userProps === null) {
      // 从登录到未登录
      console.log('用户登出')
      if (navigation.canGoBack()) {
        navigation.goBack() // 登出时退出自己
      }
    }

    userPropsRef.current = userProps

  }, [userProps])

  const onLoginSuccess = async (res: { token: string }) => {
    const token = res.token
    await localStorage.setItem(DEFAULT_TOKEN_KEY, token)
    requestUserInfo()
  }

  return (
    <Provider>
      {
        userProps === null
        ?
        <PopupWrapper 
          style={{ 
            height: getScreenHeight() / 2, 
          }} 
          headerProps={{ title: '用户登录' }}
          onClose={ () => navigation.goBack() }
          >
          <LoginContent onSuccess={ onLoginSuccess } />
        </PopupWrapper>
        :
        <View style={{ flex: 1, backgroundColor: COLOR_WHITE }}>
          { 
            fetchUserInfoLoading
            ?
            <View style={{ flex: 1 }}>
              <ActivityIndicator text='获取用户信息...'/>
            </View>
            :
            error
            ?
            <View style={{ flex: 1 }}>
              <Result 
                img={ <Icon name='close' /> }
                title='获取用户信息失败'
                message='请点击重试'
                buttonText='重试'
                onButtonClick={ () => {} }
                />
            </View>
            :
            children
          }
        </View>
      }
    </Provider>
  )
}

export default AuthWrapper
