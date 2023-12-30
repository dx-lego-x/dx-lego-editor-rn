import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { BaseFCProps } from '@/types/base'
import { COLOR_WHITE } from '@/utils/styles/base-colors'
import { PAGE_PADDING_LEFT, PAGE_PADDING_RIGHT, PAGE_PADDING_TOP, POPUP_MIN_HEIGHT, RADIUS_NORMAL_XX } from '@/utils/styles/base-dimens'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export interface PopupWrapperProps extends BaseFCProps {
  onClose: () => void
}

const PopupWrapper: FC<PopupWrapperProps> = (props) => {
  const { style, children, onClose } = props
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
        style={[
          styles.content,
          style, 
          { 
            paddingTop: style?.paddingTop !== undefined ? style.paddingTop : PAGE_PADDING_TOP,
            paddingLeft: style?.paddingLeft !== undefined ? style.paddingLeft : PAGE_PADDING_LEFT,
            paddingRight: style?.paddingRight !== undefined ? style.paddingRight : PAGE_PADDING_RIGHT,
            paddingBottom: safeBottom, 
            minHeight: style?.minHeight !== undefined ? style.minHeight : POPUP_MIN_HEIGHT 
          }
        ]}
        >
        { children }
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

  content: {
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      backgroundColor: COLOR_WHITE,
      zIndex: 1,
      borderTopLeftRadius: RADIUS_NORMAL_XX,
      borderTopRightRadius: RADIUS_NORMAL_XX,
  },
})
