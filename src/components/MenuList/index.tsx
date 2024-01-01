import { FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { BaseFCProps } from '@/types/base'
import { Icon } from '@ant-design/react-native'
import { IconNames } from '@ant-design/react-native/lib/icon'
import { COLOR_ARROW, COLOR_MAIN_GRAY, COLOR_MAIN_UNDERLAY } from '@/utils/styles/base-colors'
import Divider from '../Divider'
import { FONT_SIZE_NORMAL, PADDING_NORMAL } from '@/utils/styles/base-dimens'

export interface MenuListItemProps {
  icon: IconNames
  title: string
  extra?: string | ReactNode
  onPress?: () => void
}

export interface MenuListDataProps {
  groupId: string
  groupName: string
  items: MenuListItemProps[]
}

export interface MenuListProps extends BaseFCProps {
  data: MenuListDataProps[]
}

const MenuList: FC<MenuListProps> = ({ data }) => {

  return (
    <FlatList
      data={ data }
      renderItem={(info) => {
        const { items } = info.item

        return (
          <>
            {
              items.map((item, index) => {
                return (
                  <TouchableHighlight 
                    key={ index } 
                    underlayColor={ COLOR_MAIN_UNDERLAY } 
                    style={[styles.itemWrapper]}
                    onPress={ () => console.log(item, index, items) }
                    >
                    <>
                      <View style={[styles.leftWrapper]}>
                        <Icon name={ item.icon } />
                        <Text style={ styles.title }>{ item.title }</Text>
                      </View>
                      <View style={[styles.rightWrapper]}>
                        <>
                          {
                            typeof item.extra === 'object' && item.extra !== null
                            ?
                            item.extra
                            :
                            <>
                              {
                                typeof item.extra === 'string'
                                &&
                                <Text style={ styles.extraText }>{ item.extra }</Text>
                              }
                              <Icon name='right' color={ COLOR_ARROW } />
                            </>
                          }
                        </>
                      </View>
                    </>
                  </TouchableHighlight>
                )
              })
            }

            <Divider />
          </>
        )

      }}
      />
  )
}

export default MenuList

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60
  },
  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 15,
    marginLeft: PADDING_NORMAL
  },
  rightWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  extraText: {
    fontSize: FONT_SIZE_NORMAL,
    color: COLOR_MAIN_GRAY,
    marginRight: PADDING_NORMAL
  }
})