<script lang="ts">
export default {
  name: 'AsInput'
}
</script>
<script setup lang="ts">
import { emitter } from './emitter'

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:model-value', value: string): void
}>()

function onInput(e: Event) {
  const input = e.target as HTMLInputElement
  emit('update:model-value', input.value)
  emitter.emit('validate')
}
</script>

<template>
  <div>
    <input :value="modelValue" @input="onInput" />
  </div>
</template>

<style lang="less" scoped></style>
