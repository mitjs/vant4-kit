# Datetime-Picker 日期时间选择器

## 介绍

`DateTime-Picker` 组件用于选择日期和时间。主要是填补了 `Vant` 针对日期实现选择的缺失，实现了日期时间选择。
## 引入
```vue
<template>
  <DatetimePicker v-model="datetime" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DatetimePicker  } from 'vant4-kit'

const datetime=ref()
</script>
```
## 代码演示

### 基础用法
通过 `v-model` 绑定当前选中的日期，通过 `min-year` 和 `max-year` 属性来设定可选的时间范围。
::: component 基础用法
datetime-picker-base
:::

### 选项类型
通过 columns-type 属性可以控制选项的类型，支持对 `hour`、`minute` 和 `sencond` 进行排列组合，默认为 `['hour', 'minute']`。

比如：
- 传入 `['hour']` 来选择年月日小时。
- 传入 `['hour', 'minute']` 来选择年月日时分。
- 传入 `['hour', 'minute','sencond']` 来选择年月日时分秒。

::: component 选项类型
datetime-picker-columns-type
:::

### 格式化选项

通过传入 formatter 函数，可以对选项文字进行格式化处理。
::: component 格式化选项
datetime-picker-formatter
:::


## Api

### Props 参数

| 参数                | 说明                                                 | 类型                                                                          | 默认值             |
| ------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------ |
| v-model             | 当前选中的日期时间                                   | `string[]`                                                                    | []                 |
| min-year            | 可选的最小年份（最小值必须大于1970年）               | `number`                                                                      |                    |
| max-year            | 可选的最大年份                                       |                                                                               |                    |
| title               | 顶部栏标题                                           | `string`                                                                      | ''                 |
| columns-type        | 选项类型，由 `hour`、`minute` 和 `second` 组成的数组 | DateTimePickerColumnType[]                                                    | ['hour', 'minute'] |
| confirm-button-text | 确认按钮文字                                         | *string*                                                                      | `确认`             |
| cancel-button-text  | 取消按钮文字                                         | *string*                                                                      | `取消`             |
| show-toolbar        | 是否显示顶部栏                                       | `boolean`                                                                     | `true`             |
| loading             | 是否显示加载状态                                     | `boolean`                                                                     | `false`            |
| readonly            | 是否为只读状态，只读状态下无法切换选项               | `boolean`                                                                     | `false`            |
| filter              | 选项过滤函数                                         | `(type: string, options: PickerOption[], values: string[]) => PickerOption[]` | -                  |
| formatter           | 选项格式化函数                                       | `(type: string, option: PickerOption) => PickerOption`                        | -                  |
| option-height       | 选项高度，支持 `px` `vw` `vh` `rem` 单位，默认 `px`  | `number \| string`                                                            | `44`               |
| visible-option-num  | 可见的选项个数                                       | `number \| string`                                                            | `6`                |



### Events 事件

| 事件名  | 说明               | 回调参数                                                            |
| ------- | ------------------ | ------------------------------------------------------------------- |
| confirm | 点击完成按钮时触发 | `{ selectedValues, selectedOptions, selectedIndexes }`              |
| cancel  | 点击取消按钮时触发 | `{ selectedValues, selectedOptions, selectedIndexes }`              |
| change  | 选项改变时触发     | `{ selectedValues, selectedOptions, selectedIndexes, columnIndex }` |



### Slots 插槽

| 名称           | 说明                   | 参数                                  |
| -------------- | ---------------------- | ------------------------------------- |
| toolbar        | 自定义整个顶部栏的内容 | -                                     |
| title          | 自定义标题内容         | -                                     |
| confirm        | 自定义确认按钮内容     | -                                     |
| cancel         | 自定义取消按钮内容     | -                                     |
| option         | 自定义选项内容         | `option: PickerOption, index: number` |
| columns-top    | 自定义选项上方内容     | -                                     |
| columns-bottom | 自定义选项下方内容     | -                                     |

### Methods 方法

通过 ref 可以获取到 Picker 实例并调用实例方法

| 方法名          | 说明                              | 参数 | 返回值     |
| :-------------- | :-------------------------------- | :--- | :--------- |
| confirm         | 停止惯性滚动并触发 `confirm` 事件 | -    | -          |
| getSelectedDate | 获取当前选中的日期                | -    | `string[]` |



## 类型定义
组件导出以下类型定义：

```ts
export type { 
    DatetimePickerProps,
    DateTimePickerColumnType, 
    DateTimePickerInstance 
} from 'vant';

```
**类型申明**
::: details 类型申明
```ts
type DateTimePickerColumnType = 'hour' | 'minute' | 'second';
```
:::