import { View } from 'react-native'
import React, { FC } from 'react'
import { BaseFCProps } from '@/types/base'
import { ONE_PX } from '@/utils/styles/base-dimens'
import { COLOR_MAIN_DIVIDER } from '@/utils/styles/base-colors'

export interface DividerProps extends BaseFCProps {
  direction?: 'horizontal' | 'vertical'
}

const Divider: FC<DividerProps> = ({ direction = 'horizontal' }) => {
  return (
    <View 
      style={[
        {
          backgroundColor: COLOR_MAIN_DIVIDER
        },
        direction === 'horizontal'
        ?
        {
          width: '100%',
          height: ONE_PX,
        }
        :
        {
          width: ONE_PX,
          height: '100%'
        }
      ]} 
      />
  )
}

export default Divider
