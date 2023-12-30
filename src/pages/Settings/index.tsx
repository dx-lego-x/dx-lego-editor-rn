import { FlatList } from 'react-native'
import React, { FC } from 'react'
import PageWrapper from '@/components/PageWrapper'
import { useSelector } from 'react-redux'
import { GlobalState } from '@/store'
import { UserState } from '@/store/reducers/user.reducer'
import UserHeader from './components/UserHeader'
import MenuList, { MenuListDataProps } from '@/components/MenuList'
import Button from '@/components/Button'


const Settings: FC = () => {
  const { userProps } = useSelector<GlobalState, UserState>(store => store.user)

  const menuListData: MenuListDataProps[] = [{
    groupId: '1',
    groupName: '',
    items: [{
      icon: 'star',
      title: '我的收藏',
      extra: '0'
    }]
  }, {
    groupId: '2',
    groupName: '',
    items: [{
      icon: 'file-add',
      title: '收藏模板',
      extra: '0'
    }, {
      icon: 'user-add',
      title: '我的模板',
      extra: '0'
    }]
  }, {
    groupId: '3',
    groupName: '',
    items: [{
      icon: 'fire',
      title: '订阅营销热点',
      extra: '未订阅'
    }, {
      icon: 'swap',
      title: '会员兑换',
      extra: ''
    }]
  }, {
    groupId: '4',
    groupName: '',
    items: [{
      icon: 'customer-service',
      title: '在线客服',
      extra: '未订阅'
    }, {
      icon: 'share-alt',
      title: '分享编辑器',
      extra: ''
    }, {
      icon: 'heart',
      title: '关注公众号',
      extra: <Button size='small' text='复制' />
    }]
  }]

  return (
    <PageWrapper 
      headerOptions={{ defaultOptions: { backOptions: { hide: true }, title: '用户中心' } }} 
      safeAreaOptions={{ bottom: false }}
      >
      <FlatList
        data={ new Array(2).fill(0) }
        renderItem={({ index }) => {
          if (index === 0) {
            return (
              <UserHeader key={ index } userProps={ userProps }/>
            )
          } else {
            return (
              <MenuList
                data={ menuListData }
                />
            )
          }
        }}
        />
    </PageWrapper>
  )
}

export default Settings
