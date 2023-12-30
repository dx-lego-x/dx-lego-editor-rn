import React, { PropsWithChildren } from 'react'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

export type BaseFCProps = PropsWithChildren<{
  style?: ViewStyle & TextStyle & ImageStyle
}>

export type Api<R = any, P = any> = (params?: P) => Promise<R>

export interface BaseResponse<T> {
  errno: number
  data?: T
  message?: string
}

export interface HttpErrorDetail {
  type: 'http' | 'biz' | 'unknown'
  errno?: number
  message: string
  httpCode?: number
}
