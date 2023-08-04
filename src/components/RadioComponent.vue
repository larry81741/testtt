<script setup lang="ts">
import { Response } from '../composable/useTest'

const props = withDefaults(defineProps<{ modelValue?: number; options?: [Response] }>(), {
  modelValue: 0,
  options: Object
})
const emit = defineEmits(['update:modelValue'])
const updateValue = (event: Event) => {
  emit('update:modelValue', parseInt((event.target as HTMLInputElement).value))
}
</script>

<template>
  <div><slot></slot></div>
  <div v-for="option in options" :key="`${option.name}.${option.id}`">
    <input
      type="radio"
      :name="options[0].name"
      :value="option.id"
      :checked="modelValue === option.id"
      @change="updateValue"
    />
    <label :for="option.name">{{ option.name }}</label>
  </div>
</template>
