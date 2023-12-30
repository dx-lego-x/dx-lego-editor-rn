import { ImageStyle, TextStyle, ViewStyle, Text as _Text } from 'react-native'

export function hookGlobalProps(
  component: any, 
  options: { props?: any, customStyle?: TextStyle & ViewStyle & ImageStyle }, 
  type: 'render' | 'props' = 'render'
  ) {

  if (type === 'render') {
    const originRender = component.render
    const { customStyle, props } = options || {}

    component.render = function render(_props: any, ...rest: any[]) {
      const mergedProps = { ..._props, ...props, style: [customStyle, _props.style] }
      return originRender.apply(this, [mergedProps, ...rest])
    }
  } else if (type === 'props') {
    const { props = {} } = options
    Object.entries(props).forEach(entry => {
      const [key, value] = entry
      component.defaultProps[key] = value
    })
  }
}
