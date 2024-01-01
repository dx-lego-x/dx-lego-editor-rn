import { fetchUserInfoApi } from '@/api/user.api'
import { GlobalState } from '@/store'
import { UserState, setError, setLoding, setUserInfo } from '@/store/reducers/user.reducer'
import { useRequest } from 'ahooks'
import { useDispatch, useSelector } from 'react-redux'

export default function useUserInfo() {
  const { userProps, loading, error } = useSelector<GlobalState, UserState>(store => store.user)

  const dispatch = useDispatch()
  const { run: requestUserInfo } = useRequest(fetchUserInfoApi, {
    manual: true,

    onBefore() {
      console.log('开始获取用户信息')
      dispatch(setLoding(true))
    },

    onSuccess(res) {
      console.log('获取用户信息成功')
      dispatch(setError(null))
      dispatch(setUserInfo(res))
    },

    onError(error) {
      console.log('获取用户信息失败')
      dispatch(setError(error))
    },

    onFinally() {
      dispatch(setLoding(false))
    }
  })

  return {
    userProps,
    loading,
    error,
    requestUserInfo
  }
}