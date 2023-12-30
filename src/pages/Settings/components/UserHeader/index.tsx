import Button from '@/components/Button'
import { UserProps } from '@/types/user'
import { COLOR_MAIN_DIVIDER, COLOR_MAIN_UNDERLAY_COLOR } from '@/utils/styles/base-colors'
import { DIVIDER_WIDTH, PADDING_LARGE } from '@/utils/styles/base-dimens'
import { Icon } from '@ant-design/react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FC, } from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'

const UserHeader: FC<{ userProps: UserProps | null }> = ({ userProps }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const onUserInfoWrapperPress = () => {
    navigation.push('MySettings')
  }

  const onSettingPress = () => {
    
  }

  return (
    <View style={[styles.root]}>
      <TouchableHighlight underlayColor={ COLOR_MAIN_UNDERLAY_COLOR } style={ styles.leftWrapper } onPress={ onUserInfoWrapperPress }>
        <>
          <Image 
            style={ styles.headerIcon } 
            source={{ 
              uri: userProps?.picture 
              ? 
              userProps.picture 
              : 
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?quality,q_1/resize,m_mfit,h_200,w_200' }} 
            />
          <Text style={ styles.nickname }>
            { userProps ? userProps.nickName : '未登录' }
          </Text>
        </>
      </TouchableHighlight>
      <View>
        <View>
          <Button onPress={ onSettingPress } size='normal' icon={ <Icon name='setting' /> } borderless text='设置' />
        </View>
      </View>
    </View>
  )
}

export default UserHeader

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100
  },
  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: DIVIDER_WIDTH,
    borderColor: COLOR_MAIN_DIVIDER,
  },
  nickname: {
    fontSize: 18,
    marginLeft: PADDING_LARGE
  }
})
