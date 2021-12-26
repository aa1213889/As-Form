import { App } from 'vue'
import AsForm from './AsForm.vue'
import AsFormItem from './AsFormItem/index.vue'
import AsInput from './AsInput.vue'

export default {
  install(app: App) {
    app.component(AsForm.name, AsForm)
    app.component(AsFormItem.name, AsFormItem)
    app.component(AsInput.name, AsInput)
  }
}
