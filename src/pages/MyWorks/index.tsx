import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import PageWrapper from '@/components/PageWrapper'

const MyWorks: FC = () => {
  return (
    <PageWrapper headerOptions={{ hide: true }}>
      <View>
        <Text>MyWorks</Text>
      </View>
    </PageWrapper>
  )
}

export default MyWorks

const styles = StyleSheet.create({})