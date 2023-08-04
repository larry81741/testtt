<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: number[]
    options?: Object
  }>(),
  {
    modelValue: () => [],
    options: Object
  }
)

const emit = defineEmits(['update:modelValue'])
const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value)
  const checked = target.checked
  if (checked) {
    if (!props.modelValue.includes(value)) {
      emit('update:modelValue', [...props.modelValue, value])
    }
  } else {
    emit(
      'update:modelValue',
      props.modelValue.filter((item) => item !== value)
    )
  }
}
</script>
<template>
  <div><slot></slot></div>
  <div v-for="option in options" :key="`${option.name}.${option.id}`">
    <input
      type="checkbox"
      :id="option.name"
      :value="option.id"
      :checked="modelValue.includes(option.id)"
      @change="updateValue"
    />
    <label for="checkbox1">{{ option.name }}</label>
  </div>
</template>
