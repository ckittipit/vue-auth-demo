<template>
  <div class="w-full min-h-screen [min-height:100dvh] flex justify-center bg-gray-50 px-4 sm:px-6 py-8 text-black">
    <div class="w-full max-w-lg self-start sm:self-center bg-white rounded-xl shadow p-6 sm:p-8">
      <h1 class="text-2xl font-semibold">Register</h1>
      <p class="text-sm text-gray-600 mt-1">สร้างบัญชีใหม่เพื่อใช้งานระบบ</p>

      <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
        <FieldText name="username" label="Username" placeholder="เช่น kitto123" />
        <FieldText name="password" label="Password" type="password" placeholder="อย่างน้อย 8 ตัว" />
        <FieldText name="fullName" label="ชื่อ" placeholder="ชื่อ-นามสกุล" />

        <div>
          <label class="block text-sm font-medium text-gray-700">เพศ</label>
          <select
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring"
            v-model="genderValue"
            @change="setFieldValue('gender', genderValue)"
          >
            <option value="">-- เลือก --</option>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
            <option value="other">อื่น ๆ</option>
          </select>
          <p class="text-sm text-red-600 mt-1">{{ errors.gender }}</p>
        </div>

        <FieldText name="phone" label="เบอร์โทร" placeholder="เช่น 0812345678" />
        <FieldText name="email" label="อีเมล" placeholder="name@email.com" />
        <FieldText name="birthDate" label="วันเกิด" type="date" />

        <p v-if="serverError" class="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
          {{ serverError }}
        </p>

        <button class="w-full rounded-lg bg-black text-white py-2.5 font-medium hover:opacity-90">
          Create account
        </button>

        <div class="text-sm text-gray-700">
          มีบัญชีแล้ว?
          <router-link class="text-black font-medium underline" to="/login">ไปหน้า Login</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { register } from '../services/auth'
import FieldText from '../components/FieldText.vue'

const router = useRouter()
const serverError = ref('')

const schema = yup.object({
  username: yup.string().required('กรุณากรอก Username').min(3, 'อย่างน้อย 3 ตัวอักษร'),
  password: yup
    .string()
    .required('กรุณากรอก Password')
    .min(8, 'Password ต้องมีอย่างน้อย 8 ตัวอักษร')
    .matches(/[a-z]/, 'Password ต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว')
    .matches(/[A-Z]/, 'Password ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว')
    .matches(/[0-9]/, 'Password ต้องมีตัวเลขอย่างน้อย 1 ตัว')
    .matches(/[^A-Za-z0-9]/, 'Password ต้องมีอักขระพิเศษอย่างน้อย 1 ตัว'),
  fullName: yup.string().required('กรุณากรอกชื่อ'),
  gender: yup.string().required('กรุณาเลือกเพศ'),
  phone: yup
    .string()
    .required('กรุณากรอกเบอร์โทร')
    .matches(/^[0-9]{9,10}$/, 'กรุณากรอกเบอร์โทรเป็นตัวเลข 9-10 หลัก'),
  email: yup.string().required('กรุณากรอกอีเมล').email('รูปแบบอีเมลไม่ถูกต้อง'),
  birthDate: yup.string().required('กรุณาเลือกวันเกิด'),
})

const { handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: schema,
})

const { value: gender } = useField('gender')
const genderValue = ref(gender.value || '')

const onSubmit = handleSubmit(async (values) => {
  serverError.value = ''
  try {
    await register(values)
    router.push('/login')
  } catch (e) {
    serverError.value = e?.message || 'Register ไม่สำเร็จ'
  }
})
</script>