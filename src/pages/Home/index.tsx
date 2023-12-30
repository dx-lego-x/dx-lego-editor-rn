import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import PageWrapper from '@/components/PageWrapper'
import baseStyles from '@/utils/styles/base-styles'
import { useSelector } from 'react-redux'
import { GlobalState } from '@/store'
import { DynamicConstantsState } from '@/store/reducers/dynamic-constants.reducer'
import Input from '@/components/Input'

const Home: FC = () => {
  const { bottomBarHeight } = useSelector<GlobalState, DynamicConstantsState>(store => store.dynamicConstants)

  return (
    <PageWrapper 
      headerOptions={{ hide: true }}
      safeAreaOptions={{ bottom: false }}
      >
      <View style={[baseStyles.page]}>
        <View>
          <Input placeholder='模板搜索' />
        </View>
        <FlatList
          data={ new Array(100).fill(0) }
          renderItem={({ item, index, separators}) => {
            return (
              <View key={ index }>
                <Text>list item: { index }</Text>
              </View>
            )
          }}
          ListFooterComponent={ () => <View style={{ height: bottomBarHeight }}></View> }
          />
      </View>
    </PageWrapper>
  )
}

export default Home

const styles = StyleSheet.create({
  
})