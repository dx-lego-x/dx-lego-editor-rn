import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useRef } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BaseFCProps } from '@/types/base'
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview'
import { getScreenWidth } from '@/utils/display'

const Tab = createMaterialTopTabNavigator()

const genHolder = (text: string, color: string, height = 50) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', height: height, backgroundColor: color }}>
      <Text>{ text }</Text>
    </View>
  )
}

const Publicity = () => {
  return genHolder('品宣', 'yellow', 80)
}

const Shortcut = () => {
  return genHolder('金刚位', 'lightgreen', 120)
}

const Download = () => {
  return genHolder('去下载', 'lightblue', 50)
}

const Marketing = () => {
  return genHolder('营销位', 'orange', 80)
}

interface FragmentProps extends BaseFCProps {
  navigation: any
  route: any
}

const Fragment: FC<FragmentProps> = ({navigation, route}) => {
  const name = route.name
  const layoutProvider = useRef(new LayoutProvider(index => {
    return index
  }, (type, dim) => {
    dim.width = getScreenWidth()
    dim.height = 50
  })).current

  const dataProvider = useRef(new DataProvider((r1, r2) => {
    return r1 !== r2
  })).current

  const rowRenderer = (type: string | number, data: any, index: number, extendedState?: object) => {
    return (
      <View key={ index }>
        <Text>{ index }</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <RecyclerListView
        layoutProvider={ layoutProvider }
        dataProvider={ dataProvider.cloneWithRows(new Array(100).fill(0)) }
        rowRenderer={ rowRenderer }
        onScroll={ (e, offsetX, offsetY) => {
          console.log(offsetY)
        }}
        />
    </View>
  )
}

const RecyclerListTestXX: FC = () => {
  const { top: safeTop } = useSafeAreaInsets()

  return (
    <View style={[styles.root, { paddingTop: safeTop }]}>
      <View style={{ height: 40 }}>
        <Text>搜索</Text>
      </View>
      <Publicity/>
      <Shortcut/>
      <Download/>
      <Marketing/>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
        }}
        >
        {
          new Array(10).fill(0).map((_, index) => {
            return (
              <Tab.Screen key={ index } name={'F' + index} component={Fragment}/>
            )
          })
        }
      </Tab.Navigator>
    </View>
  )
}

export default RecyclerListTestXX

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})