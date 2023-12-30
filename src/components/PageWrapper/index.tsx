import { StatusBar, StyleSheet, View } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BaseFCProps } from '@/types/base'
import baseStyles from '@/utils/styles/base-styles'
import { PAGE_PADDING_LEFT, PAGE_PADDING_RIGHT } from '@/utils/styles/base-dimens'
import Header, { HeaderProps } from '@/components-biz/Header'

export interface PageWrapperProps extends BaseFCProps {
  headerOptions?: {
    hide?: boolean
    defaultOptions?: HeaderProps
    custom?: ReactNode
  }
  statusBarOptions?: {
    backgroundColor?: string
  }
  loadingOptions?: {
    state?: boolean
    custom?: ReactNode
  },
  errorOptions?: {
    error?: Error
    custom?: ReactNode
  }
  safeAreaOptions?: {
    top?: boolean // 必须传false不设置安全区，否则都会有
    bottom?: boolean
  }
  baseUiOPtions?: {
    paddings?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }
}

const PageWrapper: FC<PageWrapperProps> = (props) => {
  const { headerOptions = {}, safeAreaOptions = {}, loadingOptions = {}, errorOptions = {}, baseUiOPtions = {}, children } = props

  const { top: safeTop, bottom: safeBottom } = useSafeAreaInsets()
  const { paddings: baseUiPaddings } = baseUiOPtions

  const renderContent = () => {
    const renderHeader = () => {
      const { hide, custom, defaultOptions = {} } = headerOptions

      if (hide) {
        return null
      }

      return (
        <>
          {
            custom
            ?
            custom
            :
            <Header { ...defaultOptions }/>
          }
        </>
      )
    }

    const renderLoading = () => {
      const { custom } = loadingOptions

      return (
        <>
          {
            custom
            ?
            custom
            :
            <View>
              loading...
            </View>
          }
        </>
      )
    }

    const renderError = () => {
      const { error, custom } = errorOptions

      return (
        <>
          {
            custom
            ?
            custom
            :
            <View>
              { error?.message }
            </View>
          }
        </>
      )
    }

    return (
      <>
        {
          renderHeader()
        }
        {
          loadingOptions.state
          ?
          renderLoading()
          :
          errorOptions.error
          ?
          renderError()
          :
          children
        }
      </>
    )
  }

  return (
    <>
      <StatusBar/>
      <View
        style={[baseStyles.page, styles.root, { 
          paddingTop: safeAreaOptions.top === false ? 0 : safeTop,
          paddingBottom: safeAreaOptions.bottom === false ? 0 : safeBottom,
          paddingLeft: baseUiPaddings?.left === undefined ? PAGE_PADDING_LEFT : baseUiPaddings?.left ,
          paddingRight: baseUiPaddings?.right === undefined ? PAGE_PADDING_RIGHT : baseUiPaddings?.right
        }]}
        >
        {
          renderContent()
        }
      </View>
    </>
  )
}

export default PageWrapper

const styles = StyleSheet.create({
  root: {
    height: '100%',
  }
})
