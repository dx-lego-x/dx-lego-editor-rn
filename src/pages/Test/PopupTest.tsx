import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { Button } from '@ant-design/react-native'
import PageWrapper from '@/components/PageWrapper'
import { useNavigation } from '@react-navigation/native'

const Test: FC = () => {
  // const [open, setOpen] = useState(false)

  const navigate = useNavigation() as any

  return (
    <PageWrapper>
    <View>
      <Button onPress={ () => navigate.push('MyWorks') }>jump</Button>
    </View>
    </PageWrapper>
    // <PageWrapper>
    //   <View>
    //     <Text>Test</Text>
    //     <Button onPress={ () => setOpen(true) }>popup</Button>
    //   </View>
    //   <PopupModal open={ open } onClose={ () => setOpen(false) }>
    //     <View><Text>popup</Text></View>
    //   </PopupModal>
    // </PageWrapper>
  )
}

export default Test

const styles = StyleSheet.create({})