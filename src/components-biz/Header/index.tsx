import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { BaseFCProps } from '@/types/base'
import { COLOR_MAIN_GRAY } from '@/utils/styles/base-colors'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { isPageInStackBottom } from '@/utils/ui'
import Button from '@/components/Button'
import { Icon } from '@ant-design/react-native'
import { FONT_SIZE_HEADER_TITLE, FONT_SIZE_NORMAL_XXX, FONT_WEIGHT_HEADER_TITLE } from '@/utils/styles/base-dimens'

export interface HeaderProps extends BaseFCProps {
  title?: string
  backOptions?: {
    hide?: boolean
  }
}

const Header: FC<HeaderProps> = (props) => {
  const { title, backOptions = {} } = props
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const renderBackButton = () => {
    const { hide } = backOptions
    if (hide) {
      return null
    }

    if (!isPageInStackBottom(navigation)) {
      return (
        <Button 
          icon={ <Icon color={ COLOR_MAIN_GRAY } size={ FONT_SIZE_NORMAL_XXX } name='left' />} 
          borderless
          size='compact' 
          onPress={ onBackPress }
          type='round' 
          />
      )
    }

    return null
  }

  const onBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }

  return (
    <View style={[ styles.root, ]}>
      <View style={[styles.leftWrapper]}>
        {
          renderBackButton()
        }
      </View>
      <Text style={[styles.title]}>{ title }</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    justifyContent: 'center'
  },
  title: {
    fontSize: FONT_SIZE_HEADER_TITLE,
    fontWeight: FONT_WEIGHT_HEADER_TITLE,
  },
  leftWrapper: {
    position: 'absolute',
    left: 0,
  }
})