import { Dimensions, PixelRatio } from 'react-native'

// const deviceWidthDp = Dimensions.get('window').width
const uiWidthPx = 750

export function getScreenWidth() {
  return Dimensions.get('window').width
}

export function getScreenHeight() {
  return Dimensions.get('window').height
}

export function px2dp(uiElementPx: number) {
	return (uiElementPx * getScreenWidth()) / uiWidthPx
}

export function dp2px(dpValue: number) {
  return dpValue / PixelRatio.get()
}