<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { nextTick, watch, ref, computed } from 'vue'
import Sidebar from './Sidebar.vue'
import ColorSelectorNode from './ColorSelectorNode.vue'

let id = 0
function getId() {
  return `dndnode_${id++}`
}
const nodeData = ref({ 1: { input1: '11122233' }, dndnode_0: { input1: '999888777' } })
const updateData = (id, newData) => {
  nodeData.value[id] = newData
  console.log(123, id, newData)
  console.log(456, nodeData.value)
}
const { findNode, onConnect, addEdges, addNodes, project, vueFlowRef, toObject } = useVueFlow({
  nodes: [
    {
      id: '1',
      type: 'test',
      label: 'input node',
      position: { x: 250, y: 25 }
    },
    {
      id: 'dndnode_0',
      type: 'test',
      label: 'input node',
      position: { x: 350, y: 95 }
    }
  ]
})
const toObjectt = () => {
  function sortSourceTarget(arr) { //重新排列 點與點之間的關西 目前以 id 升冪排列 未來以type排列
    return arr.map(({ source, sourceHandle, target, targetHandle, ...rest }) => {
        if (source > target) {
            [source, target] = [target, source];
            [sourceHandle, targetHandle] = [targetHandle, sourceHandle];
        }
        return { source, sourceHandle, target, targetHandle, ...rest };
    });
  }
  const newObject=sortSourceTarget(toObject().edges)
  console.log(123, toObject().edges)
  console.log(456, newObject)
}
function onDragOver(event) {
  event.preventDefault()

  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

onConnect((params) => addEdges(params))

function onDrop(event) {
  const type = event.dataTransfer?.getData('application/vueflow')

  const { left, top } = vueFlowRef.value.getBoundingClientRect()
  console.log(vueFlowRef.value.getBoundingClientRect())
  const position = project({
    x: event.clientX - left,
    y: event.clientY - top
  })

  const newNode = {
    id: getId(),
    type,
    position,
    label: `${type} node`
  }

  addNodes([newNode])

  // align node position after drop, so it's centered to the mouse
  nextTick(() => {
    const node = findNode(newNode.id)
    const stop = watch(
      () => node.dimensions,
      (dimensions) => {
        if (dimensions.width > 0 && dimensions.height > 0) {
          node.position = {
            x: node.position.x - node.dimensions.width / 2,
            y: node.position.y - node.dimensions.height / 2
          }
          stop()
        }
      },
      { deep: true, flush: 'post' }
    )
  })
}
</script>

<template>
  <div class="dndflow" @drop="onDrop">
    <VueFlow @dragover="onDragOver">
      <template #node-customs="{ id }">
        <ColorSelectorNode :data="nodeData[id]" :id="id" />
      </template>
      <template #node-test="{ id }">
        <ColorSelectorNode :data="nodeData[id]" :id="id" @updateData="updateData" />
      </template>
      <!-- <MiniMap :node-stroke-color="nodeStroke" :node-color="nodeColor" /> -->
    </VueFlow>
    <div @click="toObjectt">123456789</div>
    <Sidebar />
  </div>
</template>
<style>
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.22.2/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.22.2/dist/theme-default.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/minimap@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/node-resizer@latest/dist/style.css';

html,
body,
#app {
  margin: 0;
  height: 100%;
  width: 100%;
}

#app {
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}

.dndflow {
  flex-direction: column;
  display: flex;
  height: 100%;
}
.dndflow aside {
  color: #fff;
  font-weight: 700;
  border-right: 1px solid #eee;
  padding: 15px 10px;
  font-size: 12px;
  background: rgba(16, 185, 129, 0.75);
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0 5px 10px #0000004d;
}
.dndflow aside .nodes > * {
  margin-bottom: 10px;
  cursor: grab;
  font-weight: 500;
  -webkit-box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.25);
  box-shadow: 5px 5px 10px 2px #00000040;
}
.dndflow aside .description {
  margin-bottom: 10px;
}
.dndflow .vue-flow-wrapper {
  flex-grow: 1;
  height: 100%;
}
@media screen and (min-width: 640px) {
  .dndflow {
    flex-direction: row;
  }
  .dndflow aside {
    min-width: 25%;
  }
}
@media screen and (max-width: 639px) {
  .dndflow aside .nodes {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }
}
</style>
