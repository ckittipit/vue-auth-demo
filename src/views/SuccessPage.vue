<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4 text-black">
    <div class="w-full max-w-md bg-white rounded-xl shadow p-6 text-center">
      <h1 class="text-2xl font-semibold">Success</h1>
      <p class="text-gray-700 mt-2">
        ล็อกอินสำเร็จ
        <span v-if="user" class="font-medium">({{ user.fullName || user.username }})</span>
      </p>

      <div class="mt-6 space-y-3">
        <div class="text-xs text-gray-500 break-all">
          Token: {{ token }}
        </div>

        <button class="w-full rounded-lg bg-black text-white py-2.5 font-medium hover:opacity-90" @click="onLogout">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getToken, getCurrentUser, logout } from '../services/auth'

const router = useRouter()

const token = computed(() => getToken() || '')
const user = computed(() => getCurrentUser())

function onLogout() {
  logout()
  router.push('/login')
}
</script>