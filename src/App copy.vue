<script setup lang="ts">
import { useTest } from './composable/useTest'
import { ref, computed } from 'vue'
const { looseJsonParse, formInputs } = useTest()

const data = ref({})
formInputs.value.forEach((element) => {
  data.value[element.name] = element.default
  // schema[element.name] = eval(element?.validate) ?? element.validate
  // console.log(schema);
})

const validateSchema = computed(() => {
  let schema = {}
  formInputs.value.forEach((element) => {
    schema[element.name] = looseJsonParse(data,element?.validate) ?? element.validate
  })
  console.log(9999,schema);
  console.log(8888,data);
  return schema
})
console.log(12345,new Function(`return required` ));

</script>

<template>
  <component
    v-for="formInput in formInputs"
    :is="formInput.type"
    v-model="data[formInput.name]"
    :key="formInput.name"
    :options="formInput.option"
  >{{  formInput.labelName}}
</component>
  <div>Schema:{{ validateSchema }}</div>
  <div>allValue:{{ data }}</div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
