import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData } from 'react-native'
import React, { FC } from 'react'
import { COLOR_ARROW } from '@/utils/styles/base-colors'
import { BaseFCProps } from '@/types/base'
import { DIVIDER_WIDTH, PADDING_NORMAL, RADIUS_NORMAL } from '@/utils/styles/base-dimens'

export interface InputProps extends BaseFCProps {
  value?: string
  placeholder?: string
  clear?: boolean
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
  type?: 'default' | 'number' | 'password'
}

const Input: FC<InputProps> = (props) => {
  const { style, value, placeholder, clear = true, onChange, type = 'default' } = props

  return (
    <TextInput 
      style={[styles.input, style]} 
      value={ value }
      placeholder={ placeholder } 
      clearButtonMode={ clear ? 'always' : 'never' }
      onChange={ onChange }
      secureTextEntry={ type === 'password' }
      />
  )
}

export default Input

const styles = StyleSheet.create({
  input: {
    borderColor: COLOR_ARROW,
    borderWidth: DIVIDER_WIDTH,
    padding: PADDING_NORMAL,
    borderRadius: RADIUS_NORMAL,
  }
})