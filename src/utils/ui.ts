import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export function isPageInStackBottom(navigation: NativeStackNavigationProp<any>) {
  return navigation.getState().index === 0
}
