import { Pressable, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { BaseFCProps } from '@/types/base'
import { COLOR_WHITE } from '@/utils/styles/base-colors'
import { PADDING_EXTREME_LARGE, PAGE_PADDING_LEFT, PAGE_PADDING_RIGHT, POPUP_MIN_HEIGHT, RADIUS_NORMAL_XX } from '@/utils/styles/base-dimens'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header, { HeaderProps } from '@/components-biz/Header'

export interface PopupWrapperProps extends BaseFCProps {
  headerProps?: HeaderProps
  onClose: () => void
}

const PopupWrapper: FC<PopupWrapperProps> = (props) => {
  const { style, children, onClose, headerProps } = props
  const { bottom: safeBottom } = useSafeAreaInsets()

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        ]}
        onPress={ onClose }
      />
      <View 
        style={[styles.root,]}
        >
        <Header 
          title={ headerProps?.title } 
          backOptions={ headerProps?.backOptions ? headerProps.backOptions : { icon: 'close' }} 
          />
        <View 
          style={[
            styles.content,
            style, 
            { 
              paddingTop: style?.paddingTop !== undefined ? style.paddingTop : PADDING_EXTREME_LARGE,
              paddingLeft: style?.paddingLeft !== undefined ? style.paddingLeft : 0,
              paddingRight: style?.paddingRight !== undefined ? style.paddingRight : 0,
              paddingBottom: style?.paddingBottom !== undefined ? (style.paddingBottom as number) + safeBottom : PADDING_EXTREME_LARGE + safeBottom, 
              minHeight: style?.minHeight !== undefined ? style.minHeight : POPUP_MIN_HEIGHT,
            }
          ]}
          >
          { children }
        </View>
      </View>
    </View>
  )
}

export default PopupWrapper

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  root: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: COLOR_WHITE,
    zIndex: 1,
    borderTopLeftRadius: RADIUS_NORMAL_XX,
    borderTopRightRadius: RADIUS_NORMAL_XX,
    paddingLeft: PAGE_PADDING_LEFT,
    paddingRight: PAGE_PADDING_RIGHT
  },

  content: {
    flex: 1
  },
})
