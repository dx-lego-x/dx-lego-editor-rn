import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useCallback, useEffect, useRef } from 'react'
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview'
import { getScreenWidth } from '@/utils/display'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const genHolder = (text: string, color: string, height = 50) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', height: height, backgroundColor: color }}>
      <Text>{ text }</Text>
    </View>
  )
}

const Publicity = (props: any) => {
  return genHolder(props.data.msg, 'yellow', 80)
}

const Shortcut = (props: any) => {
  return genHolder(props.data.msg, 'lightgreen', 120)
}

const Download = (props: any) => {
  return genHolder(props.data.msg, 'lightblue', 50)
}

const Marketing = (props: any) => {
  return genHolder(props.data.msg, 'orange', 80)
}
const Tab = createMaterialTopTabNavigator();
const Fragment1 = () => {
  return (
    <View>
      <Text>f1</Text>
    </View>
  )
}

const Fragment2 = () => {
  return (
    <View>
      <Text>f2</Text>
    </View>
  )
}
const MainTab = () => {
  return (
    <Tab.Navigator
      >
      <Tab.Screen name="Home" component={ Fragment1 } />
      <Tab.Screen name="Settings" component={ Fragment2 } />
    </Tab.Navigator>
  )
}

const ViewTypes = {
  Publicity: 0,
  Shortcut: 1,
  Download: 2,
  Marketing: 3,
  MainTab: 4
}


const RecyclerListTestX: FC = () => {
  // const width = useMemo(() => getScreenWidth(), [])
  const { top: safeTop } = useSafeAreaInsets()
  const layoutProvider = useRef(new LayoutProvider(
    (index) => {
      return index
    },
    (type, dim) => {
      dim.width = getScreenWidth()
      switch (type) {
        case ViewTypes.Publicity:
          dim.height = 80
          break;
        case ViewTypes.Shortcut:
          dim.height = 120
          break
        case ViewTypes.Download:
          dim.height = 50
          break
        case ViewTypes.Marketing:
          dim.height = 80
          break
      }
    }
  )).current

  const dataProvider = useRef(new DataProvider((r1, r2) => {
    return r1 !== r2
  })).current

  const rowRenderer: (type: string | number, data: any, index: number, extendedState?: object) => JSX.Element | JSX.Element[] | null = useCallback(
    (type, data,) => {

      if (type === ViewTypes.Publicity) {
        return <Publicity data={ data }/>
      } else if (type === ViewTypes.Shortcut) {
        return <Shortcut data={ data } />
      } else if (type === ViewTypes.Download) {
        return <Download data={ data }/>
      } else if (type === ViewTypes.Marketing) {
        return <Marketing data={ data }/>
      } else if (type === ViewTypes.MainTab) {
        return <MainTab/>
      }

      return null
    }, [])


  return (
    <View style={[ styles.root, { paddingTop: safeTop } ]}>
      <View style={{ height: 40 }}>
        <Text>搜索</Text>
      </View>
      <RecyclerListView
        layoutProvider={ layoutProvider }
        dataProvider={ dataProvider.cloneWithRows([
          { msg: '品宣的data' },
          { msg: '金刚位的data' },
          { msg: '去下载的data'},
          { msg: '活动的data' },
          '4'
        ]) }
        rowRenderer={ rowRenderer }
        />
    </View>
  )
}

export default RecyclerListTestX

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})