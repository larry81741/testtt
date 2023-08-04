<script setup>
import { Handle, Position } from '@vue-flow/core'
import { computed } from 'vue'

// const props = defineProps({
//   data: {
//     type: Object,
//     required: true,
//   },
// })

const emit = defineEmits(['change', 'gradient'])

function onSelect(color) {
  emit('change', color)
}

function onGradient() {
  emit('gradient')
}

// const sourceHandleStyleA = computed(() => ({ backgroundColor: props.data.color, filter: 'invert(100%)', top: '10px' }))

// const sourceHandleStyleB = computed(() => ({
//   backgroundColor: props.data.color,
//   filter: 'invert(100%)',
//   bottom: '10px',
//   top: 'auto',
// }))
</script>

<template>
  <div style="border: 2px black solid; border-radius: 20px">
    <div>Select a color</div>
    <div
      style="
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        max-width: 90%;
        margin: auto;
        gap: 3px;
        margin-bottom: 10px;
      "
    >
      <label for="">123456</label>
      <input type="text" />
    </div>
  </div>
  
  <Handle id="a" type="source" :position="Position.Right" />

</template>
