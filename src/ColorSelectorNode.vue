<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { watch, reactive } from 'vue'
import {useVueFlow } from '@vue-flow/core'
const { removeNodes } = useVueFlow()
const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const nodeInputs = reactive({ input1: props.data['input1'] })
console.log(123456, props.data)
const emit = defineEmits(['change', 'gradient', 'updateData'])
const updateValue = () => {
  emit('updateData', props.id, nodeInputs)
}
watch(nodeInputs, () => {
  updateValue()
})
</script>

<template>
  <div style="border: 2px black solid; border-radius: 20px; position: relative">
    <div>
      {{ id }}
    </div>
    <button
      style="
        position: absolute;
        top: 5px;
        right: 10px;
        padding: 0;
        width: 20px;
        border-radius: 100%;
        background-color: red;
        color: white;
      "
      @click="removeNodes(id,true,true)"
    >
      X
    </button>
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
      <input type="text" v-model="nodeInputs.input1" />
    </div>
  </div>

  <Handle  type="source" :position="Position.Right" />
</template>
