<script setup lang="ts">
const props = withDefaults(defineProps<{ modelValue?: string; options?: null  }>(), {
  modelValue: '',
  options:null,
})
const emit = defineEmits(['update:modelValue'])
const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
<template>
  <div><slot></slot></div>
  <input type="text" :value="modelValue" @input="updateValue" />
</template>
