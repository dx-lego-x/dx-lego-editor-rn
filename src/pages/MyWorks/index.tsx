import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import PageWrapper from '@/components/PageWrapper'
import WebView from 'react-native-webview'

const MyWorks: FC = () => {
  return (
    <PageWrapper headerOptions={{ hide: true }}>
      <View style={{ flex: 1, backgroundColor: 'yellow'}}>
        <WebView
          source={{ uri: 'https://infinite.red' }}
          />
      </View>
    </PageWrapper>
  )
}

export default MyWorks

const styles = StyleSheet.create({})