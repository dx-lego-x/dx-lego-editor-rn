import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableHighlight, View, ViewStyle } from 'react-native'
import React, { FC, ReactNode, useRef, useState } from 'react'
import { BaseFCProps } from '@/types/base'
import { COLOR_GRAY_5, COLOR_MAIN_UNDERLAY_COLOR } from '@/utils/styles/base-colors'
import { DIVIDER_WIDTH, FONT_SIZE_DEFAULT, FONT_SIZE_NORMAL, FONT_SIZE_SMALL_XXX, PADDING_LARGE, PADDING_NARROW, PADDING_NARROW_XX, PADDING_NORMAL, RADIUS_NORMAL_X } from '@/utils/styles/base-dimens'
import { ActivityIndicator } from '@ant-design/react-native'

export interface ButtonProps extends BaseFCProps {
  size?: 'compact' | 'small' | 'normal'
  onPress?: (e: GestureResponderEvent) => void
  icon?: ReactNode
  borderless?: boolean
  loading?: boolean
  type?: 'round' | 'normal' | 'rect'
  text?: string
}

const Button: FC<ButtonProps> = (props) => {
  const { icon, children, onPress, size = 'normal', borderless, loading, type = 'normal', text } = props

  const wrapperRef = useRef<TouchableHighlight | null>(null)
  const [wrapperWidth, setWrapperWidth] = useState<number>(0)

  const genBorder = (): StyleProp<ViewStyle> | null => {
    if (borderless) {
      return null
    }

    return {
      borderWidth: DIVIDER_WIDTH,
      borderColor: COLOR_GRAY_5,
    }
  }

  const genBorderRadius = (): StyleProp<ViewStyle> => {
    if (type === 'round') {
      return {
        borderRadius: wrapperWidth / 2
      }
    } else if (type === 'rect') {
      return {
        borderRadius: 0,
      }
    }

    return {
      borderRadius: RADIUS_NORMAL_X,
    }
  }

  const genPaddingBySize = (): StyleProp<ViewStyle> => {
    let hPadding = PADDING_LARGE
    let vPadding = PADDING_NORMAL
    if (size === 'small') {
      hPadding = PADDING_LARGE
      vPadding = PADDING_NARROW_XX
    } else if (size === 'compact') {
      hPadding = PADDING_NARROW
      vPadding = PADDING_NARROW
    }

    return {
      paddingLeft: hPadding,
      paddingRight: hPadding,
      paddingTop: vPadding,
      paddingBottom: vPadding,
    }
  }

  const renderIconAndLoading = () => {
    let _icon = null
    if (loading) {
      _icon = <ActivityIndicator/>
    } else if (icon) {
      _icon = icon
    }

    if (_icon === null) {
      return null
    }

    return (
      <View 
        style={[{ marginRight: children || text ? PADDING_NORMAL : 0 }]}
        >
        { _icon }
      </View>
    )
  }

  const genFontSize = () => {
    if (size === 'compact') {
      return FONT_SIZE_SMALL_XXX
    } else if (size === 'small') {
      return FONT_SIZE_NORMAL
    } else {
      return FONT_SIZE_DEFAULT
    }
  }

  return (
    <TouchableHighlight
      ref={ wrapperRef }
      onLayout={ () => {
        if (wrapperRef.current) {
          wrapperRef.current.measure((_x, _y, width) => {
            setWrapperWidth(width)
          })
        }
      }}
      style={[
        styles.wrapper,
        genBorderRadius(), 
        genBorder(),
        genPaddingBySize()
      ]}  
      underlayColor={ COLOR_MAIN_UNDERLAY_COLOR } 
      onPress={ onPress }
      >
      <>
        {
          renderIconAndLoading()
        }
        {
          text !== undefined
          ?
          <Text style={{ fontSize: genFontSize() }}>{ text }</Text>
          :
          children
        }
      </>
    </TouchableHighlight>
  )
}

export default Button

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
