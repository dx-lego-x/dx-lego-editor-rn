import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import PopupModal, { PopupModalProps } from '@/components/PopupModal'

export interface LoginPopupProps extends PopupModalProps {
}

const LoginPopup: FC<LoginPopupProps> = (props) => {
  const { open, onClose } = props

  return (
    <PopupModal open={ open } onClose={ onClose }>
      <Text>LoginPopup</Text>
    </PopupModal>
  )
}

export default LoginPopup

const styles = StyleSheet.create({})