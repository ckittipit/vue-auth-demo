<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4 text-black">
    <div class="w-full max-w-md bg-white rounded-xl shadow p-6">
      <h1 class="text-2xl font-semibold">Login</h1>
      <p class="text-sm text-gray-600 mt-1">เข้าสู่ระบบด้วย Username และ Password</p>

      <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
        <FieldText name="username" label="Username" placeholder="Username" />
        <FieldText name="password" label="Password" type="password" placeholder="Password" />

        <p v-if="serverError" class="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
          {{ serverError }}
        </p>

        <button class="w-full rounded-lg bg-black text-white py-2.5 font-medium hover:opacity-90">
          Login
        </button>

        <div class="text-sm text-gray-700">
          ยังไม่มีบัญชี?
          <router-link class="text-black font-medium underline" to="/register">ไปหน้า Register</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { login } from '../services/auth'
import FieldText from '../components/FieldText.vue'

const router = useRouter()
const serverError = ref('')

const schema = yup.object({
  username: yup.string().required('กรุณากรอก Username'),
  password: yup.string().required('กรุณากรอก Password'),
})

const { handleSubmit } = useForm({ validationSchema: schema })

const onSubmit = handleSubmit(async (values) => {
  serverError.value = ''
  try {
    const token = await login(values)
    // login success เมื่อมี token
    if (token) router.push('/success')
  } catch (e) {
    serverError.value = e?.message || 'Login ไม่สำเร็จ'
  }
})
</script>