import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableHighlight, View, ViewStyle } from 'react-native'
import React, { FC, ReactNode, useRef, useState } from 'react'
import { BaseFCProps } from '@/types/base'
import { COLOR_ARROW, COLOR_MAIN_BLACK, COLOR_MAIN_BLUE, COLOR_MAIN_BLUE_UNDERLAY, COLOR_MAIN_UNDERLAY, COLOR_WHITE } from '@/utils/styles/base-colors'
import { DIVIDER_WIDTH, FONT_SIZE_DEFAULT, FONT_SIZE_NORMAL, FONT_SIZE_SMALL_XXX, PADDING_LARGE, PADDING_NARROW, PADDING_NARROW_XX, PADDING_NORMAL, RADIUS_NORMAL_X } from '@/utils/styles/base-dimens'
import { ActivityIndicator } from '@ant-design/react-native'

export interface ButtonProps extends BaseFCProps {
  size?: 'compact' | 'small' | 'normal'
  onPress?: (e: GestureResponderEvent) => void
  icon?: ReactNode
  loading?: boolean
  type?: 'round' | 'normal' | 'rect'
  text?: string,
  theme?: 'default' | 'primary' | 'borderless'
}

const Button: FC<ButtonProps> = (props) => {
  const { style, icon, children, onPress, size = 'normal', loading, type = 'normal', text, theme = 'default' } = props

  const wrapperRef = useRef<TouchableHighlight | null>(null)
  const [wrapperWidth, setWrapperWidth] = useState<number>(0)

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
      paddingLeft: style?.paddingLeft !== undefined ? style.paddingLeft : hPadding,
      paddingRight: style?.paddingRight !== undefined ? style.paddingRight : hPadding,
      paddingTop: style?.paddingTop !== undefined ? style.paddingTop : vPadding,
      paddingBottom: style?.paddingBottom !== undefined ? style.paddingBottom : vPadding,
    }
  }

  const renderIconAndLoading = () => {
    let _icon = null
    if (loading) {
      _icon = <ActivityIndicator color={ theme === 'primary' ? COLOR_WHITE : undefined }/>
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

  const genThemeStyles = (): StyleProp<ViewStyle> => {
    if (theme === 'primary') {
      return {
        backgroundColor: COLOR_MAIN_BLUE,
        borderWidth: DIVIDER_WIDTH,
        borderColor: COLOR_MAIN_BLUE,
      }
    } else if (theme === 'borderless') {
      return {
        backgroundColor: COLOR_WHITE,
        borderWidth: undefined,
        borderColor: undefined,
      }
    }

    return {
      backgroundColor: COLOR_WHITE,
      borderWidth: DIVIDER_WIDTH,
      borderColor: COLOR_MAIN_UNDERLAY,
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
        style,
        genBorderRadius(), 
        genPaddingBySize(),
        genThemeStyles(),
      ]}  
      underlayColor={ theme === 'primary' ? COLOR_MAIN_BLUE_UNDERLAY : COLOR_MAIN_UNDERLAY } 
      onPress={ onPress }
      >
      <>
        {
          renderIconAndLoading()
        }
        {
          text !== undefined
          ?
          <Text style={{ fontSize: genFontSize(), color: theme === 'primary' ? COLOR_WHITE : COLOR_MAIN_BLACK }}>
            { text }
          </Text>
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
    justifyContent: 'center',
  },
})
