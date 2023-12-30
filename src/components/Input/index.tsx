import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData } from 'react-native'
import React, { FC } from 'react'
import { COLOR_MAIN_DIVIDER } from '@/utils/styles/base-colors'
import { BaseFCProps } from '@/types/base'
import { DIVIDER_WIDTH, PADDING_NORMAL, RADIUS_NORMAL } from '@/utils/styles/base-dimens'

export interface InputProps extends BaseFCProps {
  value?: string
  placeholder?: string
  clear?: boolean
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
}

const Input: FC<InputProps> = (props) => {
  const { style, value, placeholder, clear = true, onChange } = props

  return (
    <TextInput 
      style={[styles.input, style]} 
      value={ value }
      placeholder={ placeholder } 
      clearButtonMode={ clear ? 'always' : 'never' }
      onChange={ onChange }
      />
  )
}

export default Input

const styles = StyleSheet.create({
  input: {
    borderColor: COLOR_MAIN_DIVIDER,
    borderWidth: DIVIDER_WIDTH,
    padding: PADDING_NORMAL,
    borderRadius: RADIUS_NORMAL,
  }
})