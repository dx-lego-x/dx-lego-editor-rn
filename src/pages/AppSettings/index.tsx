import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import PageWrapper from '@/components/PageWrapper'
import MenuList, { MenuListDataProps } from '@/components/MenuList'
import Button from '@/components/Button'
import { PADDING_EXTREME_LARGE_X } from '@/utils/styles/base-dimens'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '@/store/reducers/user.reducer'
import localStorage from '@/utils/localStorage'
import { DEFAULT_TOKEN_KEY } from '@/utils/http'

const AppSettings: FC = () => {
  const dispatch = useDispatch()

  const menuListData: MenuListDataProps[] = [{
    groupId: '1',
    groupName: '',
    items: [{
      icon: 'user',
      title: '我的资料',
      onPress: () => {}
    }]
  }, {
    groupId: '2',
    groupName: '',
    items: [{
      icon: 'read',
      title: '意见反馈',
      onPress: () => {}
    }]
  }, {
    groupId: '3',
    groupName: '',
    items: [{
      icon: 'project',
      title: '关于App',
      onPress: () => {}
    }]
  }]

  const onPress = async () => {
    await localStorage.removeItem(DEFAULT_TOKEN_KEY)
    dispatch(setUserInfo(null))
  }

  return (
    <PageWrapper headerOptions={{ defaultOptions: { title: '设置' } }}>
      <View>
        <MenuList data={ menuListData }/>
        <Button style={{ marginTop: PADDING_EXTREME_LARGE_X }} text='退出登录' onPress={ onPress } />
      </View>
    </PageWrapper>
  )
}

export default AppSettings

const styles = StyleSheet.create({

})
