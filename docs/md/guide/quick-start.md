# 快速上手

## 版本要求

因为我们的 `vant4-kit` 是基于 `Vant 4.x`开发，所有目前仅支持 Vant 4.x 版本搭建的移动端项目，而且安装使用 `vant4-kit` 之前，你需要先安装 `Vant 4.x`。

:::tip 其他库版本要求
- **`Vant 4.x`**
- **`Vue 3.x`**
:::

## 安装
```bash
# npm
npm install vant4-kit

# pnpm
pnpm add vant4-kit

# yarn
yarn add vant4-kit

```
## 引入
### 全局使用
- 在完结根目录下 `main.ts` 中引入
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant'
import VantKit from 'vant4-kit'
import 'vant4-kit/dist/index.css'

const app = createApp(App)
app.use(Vant)
app.use(VantKit)
app.mount('#app')
```
- 在组件中使用
```vue
<template>
  <x-form :model="formValue" :items="formOptions" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { XFormItemOption } from 'vant4-kit';

const formValue = ref({})
const formOptions = ref<XFormItemOption[]>([
    {
        label: '普通输入',
        type: 'input',
        name: 'name',
    },
])

</script>
```

### 按需引入
只需要在  `main.ts` 中引入其样式文件即可
```vue
<template>
  <XForm :model="formValue" :items="formOptions" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { XForm,type XFormItemOption } from 'vant4-kit';

const formValue = ref({})
const formOptions = ref<XFormItemOption[]>([
    {
        label: '普通输入',
        type: 'input',
        name: 'name',
    },
])
</script>
```