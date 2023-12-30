import { Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { BaseFCProps } from '@/types/base'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import PopupWrapper from '@/components/PopupWrapper'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { COLOR_WHITE } from '@/utils/styles/base-colors'
import Button from '@/components/Button'

export interface AuthWrapperProps extends BaseFCProps {

}

const AuthWrapper: FC<AuthWrapperProps> = (props) => {
  const { children } = props
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  const [userProps, setUserProps] = useState<{ username: string } | null>(null)

  const onLogin = () => {
    setUserProps({ username: 'dxxx' })
  }

  return (
    <>
      {
        userProps === null
        ?
        <PopupWrapper onClose={ () => navigation.goBack() }>
          <View>
            <Text>Login</Text>
            <Button onPress={ onLogin } text='登录' />
          </View>
        </PopupWrapper>
        :
        <View style={{ flex: 1, backgroundColor: COLOR_WHITE }}>
          { children }
        </View>
      }
    </>
  )
}

export default AuthWrapper
