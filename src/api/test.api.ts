import { Api } from '@/types/base'
import { getInstance } from '@/utils/http'

export const testApi: Api<{ msg: string }> = () => {
  return getInstance().get('/')
}