// import { fetchUserInfoApi } from '@/api/user.api'
// import { PATHNAME_LOGIN } from '@/router'
import { GlobalState } from '@/store'
import { UserState, setUserInfo } from '@/store/reducers/user.reducer'
import { UserProps } from '@/types/user'
import { DEFAULT_TOKEN_KEY } from '@/utils/http'
import localStorage from '@/utils/localStorage'
import { useNavigation } from '@react-navigation/native'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function useUserInfo(needLogin = false) {
  const { userProps } = useSelector<GlobalState, UserState>(store => store.user)
  const navigate = useNavigation() as any
  const dispatch = useDispatch()

  const [error, setError] = useState<Error | null>(null)

  const { loading, run: fetchUserInfo } = useRequest(async () => {
    return new Promise<UserProps>(resolve => setTimeout(() => {
      resolve({
        _id: '1',
        id: '1',
        username: '',
        picture: '',
        nickName: '',
      })
    }, 500))
  }, {
    manual: true,

    onSuccess(res) {
      console.log('fetchUserInfo -> ', res)
      dispatch(setUserInfo(res))
    },

    onError(error) {
      console.log('fetchUserInfo error -> ', error)
      setError(error)
      if (needLogin) {
        navigate.push('Login')
      }
    }
  })

  useEffect(() => {
    if (userProps) {
      return
    }

    const token = localStorage.getItem(DEFAULT_TOKEN_KEY)

    if (!token) {
      if (needLogin) {
        // 去登录
        navigate.push('Login')
      }

    } else if (!userProps) {
      // 获取用户信息
      fetchUserInfo()
    }

  }, [fetchUserInfo, navigate, userProps, needLogin, dispatch])

  return {
    userInfo: userProps,
    error,
    loading
  }
}