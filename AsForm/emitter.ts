import mitt from 'mitt'
import { FormItem } from './type'

export type Events = {
  validate: undefined
  addFormItem: FormItem
}
export const emitter = mitt<Events>()
