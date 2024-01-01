import { Animated, FlatList, GestureResponderEvent, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getScreenWidth } from '@/utils/display'
import Swiper from 'react-native-swiper'
import Button from '@/components/Button'

const VIEW_HEIGHT = 150

const ResponderTest = () => {
  const { top: safeTop } = useSafeAreaInsets()
  const swiperRef = useRef<Swiper | null>(null)
  const [tabIndex, setTabIndex] = useState(0)
  const [isUserScroll, setIsUserScroll] = useState(false)
  const [goodsData, setGoodsData] = useState<{ name: string }[]>(
    new Array(20).fill(0).map((_, index) => ({ name: 'goods named ' + index })
  ))
  
  const lastX = useRef<number | null>(null)
  const lastY = useRef<number | null>(null)
  const [headerViewTop, setHeaderViewTop] = useState(0)
  const [startReached, setStartReached] = useState(true)

  useEffect(() => {
    if (isUserScroll) {
      setIsUserScroll(false)
      return
    }

    swiperRef.current?.scrollTo(tabIndex)
  }, [tabIndex])

  const h = useRef(new Animated.Value(headerViewTop))
  useEffect(() => {
    h.current.setValue(headerViewTop)
  }, [headerViewTop])

  return (
    <View 
      style={[styles.root]} 
      >
      <Animated.View style={{
        position: 'absolute',
        top: h.current,
        width: getScreenWidth(),
        height: VIEW_HEIGHT,
        backgroundColor: 'lightgreen',
        zIndex: 1,
        }}>

      </Animated.View>


      <FlatList
        style={{ flexGrow: 0, marginTop: VIEW_HEIGHT + headerViewTop }}
        data={ new Array<number>(12).fill(0) }
        keyExtractor={ (item, index) => index + '' }
        renderItem={ (info) => {
          const { index: index2 } = info
          return (
            <View style={ styles.tabWrapper }>
              <Button theme='borderless' onPress={ () => setTabIndex(index2) }>
                <Text style={{ fontWeight: tabIndex === index2 ? 'bold' : '100'}} >tab{ index2 }</Text>
              </Button>
            </View>
          )
        } }
        horizontal
        showsHorizontalScrollIndicator={ false }
        />
      <Swiper
        ref={ swiperRef }
        showsHorizontalScrollIndicator={false}
        showsPagination={false}
        loop={false}
        index={ 0 }
        onIndexChanged={ (index) => { 
          setTabIndex(index)
          setIsUserScroll(true)
         } }
        onTouchStart={ (e: GestureResponderEvent) => {
          const { pageX, pageY } = e.nativeEvent
          console.log('start:', pageX, pageY)

          lastX.current = pageX
          lastY.current = pageY
         }}

        onTouchMove={ (e) => {
          if (lastY.current === null || lastX.current === null) {
            return
          }

          const { pageX, pageY } = e.nativeEvent
          
          const dy = pageY - lastY.current
          const dx = pageX - lastX.current

          if (Math.abs(dy) > Math.abs(dx)) {
            console.log('that is what i want', dy, dx, startReached)
            if (dy > 0 && !startReached) {
              return
            }

            setHeaderViewTop(() => {
              const result = headerViewTop + dy
              if (result < -VIEW_HEIGHT) {
                return -VIEW_HEIGHT
              } else if (result >= 0) {
                return 0
              }

              return result
            })
          }
          lastX.current = pageX
          lastY.current = pageY
         }}

        onTouchEnd={ () => {
          console.log('end')
         }}
        >
        {
          new Array(12).fill(0).map((_, outIndex) => {
            return (
              <FlatList
                key={ outIndex }
                style={{ width: getScreenWidth() }}
                data={ goodsData }
                keyExtractor={ (item, index) => index + '' }
                renderItem={ (info) => {
                  const goods = info.item as { name: string }
                  return (
                    <View style={ styles.verticalWrapper }>
                      <Text>tab: { tabIndex }, { goods.name }</Text>
                    </View>
                  )
                } }
                
                bounces={false}
                showsVerticalScrollIndicator={ false }
                scrollEnabled={ headerViewTop <= -VIEW_HEIGHT ? true: false }
                onStartReached={ () => {
                  setStartReached(true)
                } }
                onScroll={ e => {
                  console.log('onScroll', e.nativeEvent)
                  if (e.nativeEvent.contentOffset.y > 0) {
                    setStartReached(false)
                  }
                }}
                onEndReached={() => {
                  const newData: { name: string }[] = new Array(20).fill(0).map((_, index) => {
                    return {
                      name: 'goods named ' + (index + goodsData.length)
                    }
                  })
                  setGoodsData([...goodsData, ...newData])
                }}
              />
            )
          })
        }
      </Swiper>
    </View>
  )
}

export default ResponderTest

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  tabWrapper: {
    height: 40,
    backgroundColor: 'yellow'
  },
  verticalWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightblue',
    height: 50,
    alignItems: 'center'
  }
})
