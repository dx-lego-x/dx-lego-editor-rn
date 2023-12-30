import { Animated, Easing, StyleSheet, Text, View, ViewStyle, ActivityIndicator as AI } from 'react-native'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Icon } from '@ant-design/react-native'

type FadeInViewProps = PropsWithChildren<{style: ViewStyle}>

const FadeInView: React.FC<FadeInViewProps> = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start()

  }, [fadeAnim])

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  )
}


const AnimationTest = () => {

  const spinValue = useRef(new Animated.Value(0)).current

  const [rotateValue, setRotateValue] = useState<string>('0deg')

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 360,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start()

    spinValue.addListener(value => {  
      const _value = Math.floor(value.value) + 'deg'
      setRotateValue(_value)
      if (value.value === 360) {
        spinValue.setValue(0)
      }
    })
  }, [])

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FadeInView
        style={{
          width: 250,
          height: 50,
          backgroundColor: 'powderblue',
        }}>
        <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
          Fading in
        </Text>
      </FadeInView>
      <View
        style={[{ padding: 0 }]}
        >
        <Icon style={{
          padding: 0,
          transform: [{rotate: rotateValue }] 
        }} name='loading-3-quarters' />
        
      </View>
    </View>
  )
}

export default AnimationTest

const styles = StyleSheet.create({
  
})