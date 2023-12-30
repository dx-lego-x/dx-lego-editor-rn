import { StyleSheet } from 'react-native'
import React, { FC, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Home'
import MyWorks from '../MyWorks'
import Settings from '../Settings'
import { baseTabNavigationOptions } from '@/utils/base-options'
import { COLOR_MAIN_BLUE } from '@/utils/styles/base-colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TAB_BOTTOM_BAR_HEIGHT } from '@/utils/styles/base-dimens'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '@/store'
import { DynamicConstantsState, setBottomBarHeight } from '@/store/reducers/dynamic-constants.reducer'
import { Icon } from '@ant-design/react-native'

const Tab = createBottomTabNavigator()

const MainHolder: FC = () => {
  const { bottomBarHeight } = useSelector<GlobalState, DynamicConstantsState>(store => store.dynamicConstants)
  const dispatch = useDispatch()
  const { bottom } = useSafeAreaInsets()

  useEffect(() => {
    dispatch(setBottomBarHeight(bottom + TAB_BOTTOM_BAR_HEIGHT))
  }, [])

  return (
    <Tab.Navigator 
      initialRouteName='Home' 
      screenOptions={{ tabBarActiveTintColor: COLOR_MAIN_BLUE, tabBarStyle: { height: bottomBarHeight } }}
      >
      <Tab.Screen
        name='Home' 
        component={ Home } 
        options={{ 
          ...baseTabNavigationOptions,
          tabBarLabel: '首页',
          tabBarIcon: ({ color, size }) => <Icon name='home' color={ color } size={ size } />,
        }}
        />
      <Tab.Screen 
        name='MyWorks' 
        component={ MyWorks } 
        options={{
          ...baseTabNavigationOptions,
          tabBarLabel: '作品',
          tabBarIcon: ({ color, size }) => <Icon name='file-text' color={ color } size={ size } />
        }} />
      <Tab.Screen 
        name='Settings' 
        component={ Settings } 
        options={{
          ...baseTabNavigationOptions,
          tabBarLabel: '我的',
          tabBarIcon: ({ color, size }) => <Icon name='user' color={ color } size={ size } />
        }} 
        />
    </Tab.Navigator>
  )
}

export default MainHolder

const styles = StyleSheet.create({})
