<script lang="ts">
export default {
  name: 'AsFormItem'
}
</script>

<script setup lang="ts">
import Schema from 'async-validator'
import { inject, onMounted, ref } from 'vue'
import { FormItem, key } from '../type'
import { emitter } from '../emitter'

const errorText = ref<string>('')
interface Props {
  label?: string
  prop?: string
}
const props = withDefaults(defineProps<Props>(), { label: '', prop: '' })
const formData = inject(key)

const o: FormItem = {
  validate
}

defineExpose(o)
onMounted(() => {
  if (props.prop) {
    emitter.on('validate', () => {
      validate()
    })
    emitter.emit('addFormItem', o)
  }
})

function validate() {
  if (formData?.rules === undefined) {
    return Promise.resolve({ result: true })
  }
  const rules = formData.rules[props.prop]
  const value = formData.model[props.prop]
  const schema = new Schema({ [props.prop]: rules })
  return schema.validate({ [props.prop]: value }, (errors) => {
    if (errors) {
      errorText.value = errors[0].message || '校验错误'
    } else {
      errorText.value = ''
    }
  })
}
</script>

<template>
  <div class="el-form-item">
    <label v-if="label">{{ label }}</label>
    <slot />
    <p v-if="errorText" class="error">
      {{ errorText }}
    </p>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
