<template>
  <div>
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>

    <input
      class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="handleChange"
      @blur="handleBlur"
    />

    <p v-if="errorMessage" class="text-sm text-red-600 mt-1">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
})

const { value, errorMessage, handleChange, handleBlur } = useField(() => props.name)
</script>