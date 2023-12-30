import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { FC, useRef } from 'react'
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview'
import { genArrayWithIndex } from '@/utils/array'

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2
}

const RecyclerListTest: FC = () => {
  let { width } = Dimensions.get("window")

  const layoutProvider = useRef(new LayoutProvider((index: number) => {
    if (index % 3 === 0) {
      return ViewTypes.FULL;
    } else if (index % 3 === 1) {
      return ViewTypes.HALF_LEFT;
    } else {
      return ViewTypes.HALF_RIGHT;
    }
  }, (type, dim) => {
    switch (type) {
      case ViewTypes.HALF_LEFT:
          dim.width = width / 2;
          dim.height = 160;
          break;
      case ViewTypes.HALF_RIGHT:
          dim.width = width / 2;
          dim.height = 160;
          break;
      case ViewTypes.FULL:
          dim.width = width;
          dim.height = 140;
          break;
      default:
          dim.width = 0;
          dim.height = 0;
    }
  })).current

  const dataProvider = useRef(new DataProvider((r1, r2) => {
    return r1 !== r2
  })).current

  const rowRenderer = (type: string | number, data: any, index: number, extendedState?: object) => {

    const CellContainer = (props: any) => {
      return (
        <View {...props}>{props.children}<Text>Cell Id: { index }</Text></View>
      )
    }

    switch (type) {
      case ViewTypes.HALF_LEFT:
          return (
              <CellContainer style={styles.containerGridLeft}>
                  <Text>Data: {data}</Text>
              </CellContainer>
          );
      case ViewTypes.HALF_RIGHT:
          return (
              <CellContainer style={styles.containerGridRight}>
                  <Text>Data: {data}</Text>
              </CellContainer>
          );
      case ViewTypes.FULL:
          return (
              <CellContainer style={styles.container}>
                  <Text>Data: {data}</Text>
              </CellContainer>
          );
      default:
          return null;
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <RecyclerListView
        layoutProvider={ layoutProvider }
        dataProvider={ dataProvider.cloneWithRows(genArrayWithIndex(300)) }
        rowRenderer={ rowRenderer }
        />
    </View>
  )
}

export default RecyclerListTest

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#00a1f1"
  },
  containerGridLeft: {
      justifyContent: "space-around",
      alignItems: "center",
      flex: 1,
      backgroundColor: "#ffbb00"
  },
  containerGridRight: {
      justifyContent: "space-around",
      alignItems: "center",
      flex: 1,
      backgroundColor: "#7cbb00"
  }
})