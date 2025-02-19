# XForm 表单组件

## 介绍

此表单组件和 `Vant` 的  `Form 组件` 不同，`XForm` 收集了 Vant 的各类表单组件以及自定义组件，目前支持 [**20种组件**](#支持的组件类型)，这些组件覆盖了90%日常业务功能；开发者只需要通过简单的配置即可完成日常业务的开发。

## 引入 

这里只展示局部引入使用，如需要全局引入，请参考 [全局引入](https://vant4-kit.netlify.app/md/guide/quick-start.html#全局引入)

```vue
<template>
  <XForm :form="form" :options="formOption" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { XForm,type XFormItemRow } from 'vant4-kit'

const form = ref()
const formOption=ref<XFormItemRow[]>(
    {
        type:'input',
        name:'name',
        label:'姓名',
    }
)
</script>
```

## 代码演示

### 基础用法

:::component 基本表单
basic-form
:::

### 对其方式
:::component 对齐方式
align-form
:::

### 校验表单
校验表单有多种配置方式，

- 通过 `XForm` 的 `required` 参数快捷配置全部表单项必填

:::component 校验表单
required-validate-form
:::

- 通过在 `XForm` 的 `rules` 参数来配置表单项的自定义校验
:::component 校验表单
rules-validate-form
:::

- 通过在 `XForm` 组件的 `items` 的参数配置对象中配置 `required` ，实现当前表单的必填校验，或在参数中配置 `rules` 来实现当前表单项的自定义校验规则

:::component 校验表单
itemProp-validate-form
:::

### 插槽用法

插槽用法分为两种，一种是在 `XForm` 组件上直接使用[插槽](#slots-插槽)，另外一种是直接在`itemProps` 通过配置 slots 属性下的插槽渲染函数来实现自定义渲染


#### 组件插槽方式
:::component 自定义插槽
custom-slot-form
:::

#### 插槽函数
:::component 自定义插槽函数
func-slot-form
:::

### 只读表单
:::component 只读表单
readonly-form
:::

## Api

### Props 参数
`XForm` 组件支持 `Vant` 的 `Form` 组件的所有属性，具体属性请参考 [Vant Form](https://vant-contrib.gitee.io/vant/#/zh-CN/form),以下是 `XForm` 组件特有的属性

| 参数  | 说明                                                                         | 类型                             | 默认值 |
| ----- | ---------------------------------------------------------------------------- | -------------------------------- | ------ |
| model | 搜集表单组件产生的值                                                         | `object`                         | `{}`   |
| items | 表单组件渲染配置，参见：[**items的表单项配置对象** ](#items的表单项配置对象) | [XFormItemRow](#xform类型参考)[] | `[]`   |
| rules | 设置表单组件的检验规则                                                       | `object`                         | `{}`   |
| inset | 是否展示为圆角卡片风格                                                       | `boolean`                        | `true` |

#### items的表单项配置对象

| 参数        | 说明                                                                                                   | 类型                                                     | 是否必填 |
| ----------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- | -------- |
| type        | 需要渲染的组件类型，参见：[支持的组件类型](#支持的组件类型)                                            | [`CompType`](#支持的组件类型)                            | ✅️        |
| prop        | 表单项标识key                                                                                          | `string`                                                 | ✅️        |
| label       | 表单项名称                                                                                             | `string`                                                 | ❌️        |
| required    | 是否显示表单必填星号                                                                                   | `boolean`                                                | ❌️        |
| rules       | 表单校验规则                                                                                           | `Record<string,FieldRule[]>`                             | ❌️        |
| itemProps   | 表单项目配置props（即：Field参数）                                                                     | `object`                                                 | ❌️        |
| attrs       | `type` 对应原始组件的属性及方法，针对个别组件的辅助增强特性参见下文的[attrs 辅助特性](#attrs-辅助特性) | `object`                                                 | ❌️        |
| options     | 选择类组件的选择项                                                                                     | `PickerOption[]`                                         | ❌️        |
| vif         | 是否显示当前表单项，默认`true`                                                                         | `boolean  \| ((values: Record<string,any>) => boolean);` | ❌️        |
| hiddenLabel | 是否隐藏label内容区域                                                                                  | `boolean`                                                | ❌️        |


### attrs 辅助特性
####  ✨ 辅助特性 1️⃣ （cascader ） 

当 `type: 'cascader'` 时，可以配置 attrs下的 `useVantAreaData` 为 `true` 来使用Vant提供的全国区域选择数据，或者自定义 `options`
```ts
...,
{
    type:'cascader',
    label:'地区选择',
    name:'area',
    attrs:{
        useVantAreaData: true // [!code focus]  [!code ++]
    }
}
...
```
#### ✨ 辅助特性 2️⃣（datetime-picker）

当 `type: 'datetime-picker'` 时，可以通过在 `attrs` 中配置 `showType` 来选择选择器类型是`单页形式`还是`分组形式`。

`showType` 可选值有 `single`、`group`，默认为 `group`

```ts
// showType=single 时, 
// groupProps参数配置参考： /md/components/datetime-picker/#props-参数  
{
    type:'datetime-picker',
    label:'日期时间',
    name:'datetime',
    attrs:{
        showType: 'single', //  [!code ++]
        groupProps: {} // [!code ++]
    }
}
// or

// showType=group 时 
// groupProps[0]的参数配置参考：https://vant.pro/vant/#/zh-CN/date-picker#props
// groupProps[1]的参数配置参考：https://vant.pro/vant/#/zh-CN/time-picker#props
{
    type:'datetime-picker',
    label:'日期时间',
    name:'datetime',
    attrs:{
        showType: 'group', // [!code ++]
        groupProps: [ // [!code ++]
            {}, // [!code ++]
            {} // [!code ++]
        ]
    }
}
```
#### ✨ 辅助特性 3️⃣（范围选择器 ）

配置的组件类型为如下三种时，对应的`attrs` 均存在 `groupProps` 数组。

- **`date-range-picker`**

`groupProps[0]` 参考：[Vant DatePicker](https://vant.pro/vant/#/zh-CN/date-picker#props) 

`groupProps[1]` 参考：[Vant DatePicker](https://vant.pro/vant/#/zh-CN/date-picker#props) 

- **`time-range-picker`**
  

`groupProps[0]` 参考：[Vant TimePicker](https://vant.pro/vant/#/zh-CN/time-picker#props) 

`groupProps[1]` 参考：[Vant TimePicker](https://vant.pro/vant/#/zh-CN/time-picker#props) 

- **`datetime-range-picker`**

`groupProps[0]` 参考：[DateTimePicker](/md/components/datetime-picker/#props-参数) 

`groupProps[1]` 参考：[DateTimePicker](/md/components/datetime-picker/#props-参数) 

### Events 事件

除`submit`、`failed` 两种事件外，其他事件在触发时才返回的参数中，第一个参数 `prop`为触发此事件的组件唯一标识

| 事件名     | 说明                                        | 回调参数                                                                              |
| ---------- | ------------------------------------------- | ------------------------------------------------------------------------------------- |
| submit     | 提交表单且验证通过后触发                    | `values: object`                                                                      |
| failed     | 提交表单且验证不通过后触发                  | `errorInfo: { values: object, errors: object[] }`                                     |
| change     | 具备`change`事件的组件选项改变时触发        | `prop:string,{ selectedValues, selectedOptions, selectedIndexes }`                    |
| blur       | 具备`blur`事件的组件，输入框失去焦点时触发  | `prop:string,event: Event`                                                            |
| focus      | 具备`focus`事件的组件，输入框获得焦点时触发 | `prop:string,event: Event`                                                            |
| click      | 具备`click`事件的组件，点击组件时触         | `prop:string,event: Event`                                                            |
| confirm    | 点击弹框完成按钮时触发                      | `prop:string,{ selectedValues, selectedOptions, selectedIndexes }`                    |
| cancel     | 点击弹框取消按钮时触发                      | `prop:string,{ selectedValues, selectedOptions, selectedIndexes }`                    |
| drag-start | `slider` 类型组件，开始拖动时触发           | `prop:string,event: TouchEvent`                                                       |
| drag-end   | `slider` 类型组件，结束拖动时触发           | `prop:string,event: TouchEvent`                                                       |
| plus       | `stepper`类型组件，点击增加按钮时触发       | `prop:string`                                                                         |
| minus      | `stepper`类型组件，点击减少按钮时触发       | `prop:string`                                                                         |
| overlimit  | `stepper`类型组件，点击不可用的按钮时触发   | `prop:string`                                                                         |
| finish     | `cascader` 类型组件，全部选项选择完成后触发 | `prop:string,{ value: Numeric, selectedOptions: CascaderOption[], tabIndex: number }` |
| click-tab  | `cascader` 类型组件，点击标签时触发         | `prop:string,tabIndex: number, title: string`                                         |



### Slots 插槽

针对片`options` 配置的参数 prop对应的value值为唯一属性来自定义对应部分`Field`组件的插槽内容

| 名称                     | 说明                                                                                                                 | 参数                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `[prop值]`               | 自定义`type='input-slot'`,`prop=[prop值]`的Field输入框位置渲染内容 或  自定义 `type='slot'`,`prop=[prop值]` 渲染内容 | -                     |
| `[prop值]`.label         | 自定义标识为`prop`的输入框左侧文本                                                                                   | -                     |
| `[prop值]`.left-icon     | 自定义标识为`prop`的输入框头部图标                                                                                   | -                     |
| `[prop值]`.right-icon    | 自定义标识为`prop`的输入框尾部图标                                                                                   | -                     |
| `[prop值]`.button        | 自定义标识为`prop`的输入框尾部按钮                                                                                   | -                     |
| `[prop值]`.error-message | 自定义标识为`prop`的组件底部错误提示文案                                                                             | `{ message: string }` |
| `[prop值]`.extra         | 自定义标识为`prop`的输入框最右侧的额外内容                                                                           | -                     |



### Expose 实例方法
通过 ref 可以获取到 `XForm` 实例并调用实例方法。`XForm`支持Vant Form所有的实例化方法


#### 支持的组件类型

| 组件类型              | 对应`Vant`组件                                                   | 说明                  |
| --------------------- | ---------------------------------------------------------------- | --------------------- |
| input                 | [Field 输入框](https://vant.pro/vant/#/zh-CN/field)              |                       |
| picker                | [Picker 选择器](https://vant.pro/vant/#/zh-CN/picker)            |                       |
| cascader              | [Cascader 级联选择](https://vant.pro/vant/#/zh-CN/cascader)      |                       |
| area                  | [Area 省市区选择](https://vant.pro/vant/#/zh-CN/area)            |                       |
| radio                 | [Radio 单选框](https://vant.pro/vant/#/zh-CN/radio)              |                       |
| checkbox              | [Checkbox 复选框](https://vant.pro/vant/#/zh-CN/checkbox)        |                       |
| date-picker           | [DatePicker 日期选择](https://vant.pro/vant/#/zh-CN/date-picker) |                       |
| time-picker           | [TimePicker 时间选择](https://vant.pro/vant/#/zh-CN/time-picker) |                       |
| datetime-picker       | -                                                                | 新定义组合类组件      |
| date-range-picker     | -                                                                | 新定义组合类组件      |
| time-range-picker     | -                                                                | 新定义组合类组件      |
| datetime-range-picker | -                                                                | 新定义组件            |
| switch                | [Switch 开关](https://vant.pro/vant/#/zh-CN/switch)              |                       |
| rate                  | [Rate 评分](https://vant.pro/vant/#/zh-CN/rate)                  |                       |
| slider                | [Slider 滑块](https://vant.pro/vant/#/zh-CN/slider)              |                       |
| stepper               | [Stepper 步进器](https://vant.pro/vant/#/zh-CN/stepper)          |                       |
| text                  | -                                                                | 渲染普通文本          |
| html                  | -                                                                | 渲染html片段          |
| input-slot            | -                                                                | 自定义Field input插槽 |
| slot                  | -                                                                | 自定义form-item       |

## XForm类型定义

::: details 类型申明
```ts
type SelectComp = 'picker' | 'cascader' | 'area' | 'radio' | 'checkbox';
type InputComp = 'input';
type DateComp = 'date-picker' | 'time-picker' | 'datetime-picker' | 'date-range-picker' | 'time-range-picker' | 'datetime-range-picker';
type OtherComp = 'switch' | 'rate' | 'slider' | 'stepper' | 'text' | 'html' | 'slot' | 'input-slot';
export type CompTypes = SelectComp | InputComp | DateComp | OtherComp;

export type XFormItemRow<T extends CompTypes = CompTypes> = {
    type: T;
    label?: string;
    name: string;
    required?: boolean;
    attrs?: (T extends keyof CompAttrsPropsMap ? (CompAttrsPropsMap[T] & Indexable) : Indexable) & { slots?: { [k: string]: (...args: any) => any } };
    vif?: boolean | ((values: Indexable) => boolean);
    rules?: FieldRule[];
    itemProps?: Partial<FieldProps> & { slots?: XFormItemSlots<T> } & Indexable;
    hiddenLabel?: boolean;
    popup?: PopupProps
} & OptionsRow<T>

export type PickerOption<T> = {
    text: string;
    value: Numeric;
    children?: PickerOption<T>[];
} & T extends 'radio' | 'checkbox' ? {
    attrs: T extends 'radio' ? RadioProps : CheckboxProps;
} : Indexable;
export type OptionsRow<T> = T extends SelectComp ? {
    options: PickerOption<T>[];
} : {
    options?: PickerOption<T>[];
};

```
:::