<script lang="ts">
export default {
  name: 'AsForm'
}
</script>
<script setup lang="ts">
import { Rules } from 'async-validator'
import { PropType, ref, provide } from 'vue'
import { FormItem, key } from './type'
import { emitter } from './emitter'

const props = defineProps({
  model: { type: Object, required: true },
  rules: { type: Object as PropType<Rules> }
})

provide(key, {
  model: props.model,
  rules: props.rules
})

const items = ref<FormItem[]>([])

emitter.on('addFormItem', (item) => {
  items.value.push(item)
})

function validate(cb: (isValid: boolean) => void) {
  const tasks = items.value.map((item) => item.validate())
  Promise.all(tasks)
    .then(() => {
      cb(true)
    })
    .catch(() => {
      cb(false)
    })
}

defineExpose({
  validate
})
</script>

<template>
  <form class="as-form">
    <slot></slot>
  </form>
</template>

<style scoped>
.as-form {
  width: 100%;
}
</style>
