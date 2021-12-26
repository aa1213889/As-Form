<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormType } from './AsForm/type'
const refForm = ref<FormType>()
const formData = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: [{ required: true, validator: () => {} }],
  password: [
    {
      required: true,
      message: 'Please enter the correct format',
      pattern: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
    }
  ]
})

const login = () => {
  refForm.value?.validate((isValid) => {
    if (isValid) {
      console.log(formData)
    } else {
      console.log('error')
    }
  })
}
</script>

<template>
  <as-form ref="refForm" :model="formData" :rules="rules">
    <as-form-item label="帐号：" prop="username">
      <as-input v-model="formData.username" />
    </as-form-item>
    <as-form-item label="密码：" prop="password">
      <as-input v-model="formData.password" type="password" />
    </as-form-item>
  </as-form>
  <p>
    <button @click="login">提交</button>
  </p>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
