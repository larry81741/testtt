<script setup lang="ts">
import { Response } from '../composable/useTest'
const props = withDefaults(defineProps<{ modelValue?: number ,options?:[Response] }>(), {
  modelValue: 0,
  options:Object,
})
console.log(99999,props.modelValue);

const emit = defineEmits(['update:modelValue'])
const updateValue = (event: Event) => {
  emit('update:modelValue', parseInt((event.target as HTMLInputElement).value))
}
</script>
<template>
  <div><slot></slot></div>
  <select :value="modelValue" @change="updateValue" id="">
    <option :value=option.id v-for="option in options" :key="`${option.name}.${option.id}`">{{ option.name }}</option>
  </select>
</template>
