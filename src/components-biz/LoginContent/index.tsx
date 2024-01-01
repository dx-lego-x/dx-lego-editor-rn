import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { BaseFCProps } from '@/types/base'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { Toast, WhiteSpace } from '@ant-design/react-native'
import { useRequest } from 'ahooks'
import { loginApi } from '@/api/user.api'

export interface LoginContentProps<T = { token: string }> extends BaseFCProps {
  offset?: number // 左边空的距离
  span?: number // 右边空的距离，左右 + = 24
  onSuccess?: (res: T) => void | Promise<void>
}

const LoginContent: FC<LoginContentProps> = (props) => {
  const { style, offset = 5, span = 19, onSuccess } = props
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })

  const { loading: loginLoading, run: requestLoginApi } = useRequest(loginApi, {
    manual: true,

    onSuccess: async (res) => {
      onSuccess && await onSuccess(res)
    },

    onError: async (error) => {
      Toast.fail('登录失败:' + error.message)
    }
  })

  const onUsernameChanged = (username: string) => {
    setLoginForm({
      ...loginForm,
      username
    })
  }

  const onPassworkChanged = (password: string) => {
    setLoginForm({
      ...loginForm,
      password,
    })
  }

  const onLoginPress = () => {
    const { username, password } = loginForm

    if (!username) {
      Toast.fail('用户名不能为空')
      return
    }

    if (!password) {
      Toast.fail('密码不能为空')
      return
    }

    requestLoginApi(loginForm)
  }

  const onRegisterPress = () => {

  }

  return (
    <View
      style={[style]}
      >
      <View style={ styles.inputArea }>
        <View style={ styles.inputWrapper }>
          <Text style={{ flex: offset }} >用户名：</Text>
          <Input 
            style={[styles.input, { flex: span }]} 
            value={ loginForm.username } 
            onChange={ (e) => onUsernameChanged(e.nativeEvent.text) }
            />
        </View>
        <WhiteSpace/>
        <View style={ styles.inputWrapper }>
          <Text style={{ flex: offset }} >密码：</Text>
          <Input 
            style={[styles.input, { flex: span }]} 
            value={ loginForm.password }
            type='password' 
            onChange={ (e) => onPassworkChanged(e.nativeEvent.text) }
            />
        </View>
      </View>
      <WhiteSpace size='lg' />
      <WhiteSpace size='lg' />
      <View style={ styles.buttonArea }>
        <View style={{ width: '100%' }}>
          <Button text='登录' theme='primary' onPress={ onLoginPress } loading={ loginLoading } />
          <WhiteSpace size='lg' />
          <Button text='注册' onPress={ onRegisterPress } />
        </View>
      </View>
    </View>
  )
}

export default LoginContent

const styles = StyleSheet.create({
  root: {

  },
  inputArea: {
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {

  },
  buttonArea: {
    flexDirection: 'row'
  }
})