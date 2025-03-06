<template>
  <div>
    <x-form :model="formValue" :items="formOptions" label-align="top">
      <template #customSlot1>
        <h3>我是一个自定义 field input插槽</h3>
      </template>
      <template #customSlot>
        <Button type="primary" block>我也是插槽，但我是一个不带field的插槽</Button>
      </template>
    </x-form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from 'vant'
import type { XFormItemOption } from 'vant4-kit';
const formValue = ref({
  text: '我是一段自定义文本',
  html: '<h4>我是一个带h4标签的html片段</h4>'
})
const formOptions = ref<XFormItemOption>([
  {
    label: '普通输入',
    type: 'input',
    name: 'name',
  },
  {
    label: '手机号',
    type: 'input',
    name: 'tel',
    itemProps: {
      type: 'tel',
    }
  },
  {
    label: '纯数字（可以带小数）',
    type: 'input',
    name: 'number',
    itemProps: {
      type: 'number',
    }
  },
  {
    label: '整数',
    type: 'input',
    name: 'digit',
    itemProps: {
      type: 'digit',
    }
  },
  {
    label: '密码输入',
    type: 'input',
    name: 'password',
    itemProps: {
      type: 'password',
    }
  },
  {
    label: '文本域',
    type: 'input',
    name: 'textarea',
    itemProps: {
      type: 'textarea',
      row: 2,
      autosize: true,
      'show-word-limit': true,
      maxlength: 50,
    }
  },
  {
    label: '步进器',
    type: 'stepper',
    name: 'age',

  },
  {
    label: '单选',
    type: 'radio',
    name: 'sex',
    options: [
      { text: '男', value: '1' },
      { text: '女', value: '0' },

    ]
  },
  {
    label: '多选',
    type: 'checkbox',
    name: 'checkbox',
    options: [
      { text: '男', value: '1', attrs: { disabled: true } },
      { text: '女', value: '0' },
      { text: '未知', value: '2' },
    ],
    attrs: {
      shape: 'square',
    }
  },
  {
    label: '滑动',
    type: 'slider',
    name: 'slider',
  },
  {
    label: '开关',
    type: 'switch',
    name: 'switch',
    attrs: {
      activeValue: '1',
      inactiveValue: '0'
    }
  },
  {
    type: 'rate',
    label: 'rate 评分',
    name: 'rate',
    attrs: {
      count: 6
    },
  },

  {
    label: '选择器（多列）',
    type: 'picker',
    name: 'hubby',
    options: [
      {
        text: '浙江',
        value: 'Zhejiang',
        children: [
          {
            text: '杭州',
            value: 'Hangzhou',
            children: [
              { text: '西湖区', value: 'Xihu' },
              { text: '余杭区', value: 'Yuhang' },
            ],
          },
          {
            text: '温州',
            value: 'Wenzhou',
            children: [
              { text: '鹿城区', value: 'Lucheng' },
              { text: '瓯海区', value: 'Ouhai' },
            ],
          },
        ],
      },
      {
        text: '福建',
        value: 'Fujian',
        children: [
          {
            text: '福州',
            value: 'Fuzhou',
            children: [
              { text: '鼓楼区', value: 'Gulou' },
              { text: '台江区', value: 'Taijiang' },
            ],
          },
          {
            text: '厦门',
            value: 'Xiamen',
            children: [
              { text: '思明区', value: 'Siming' },
              { text: '海沧区', value: 'Haicang' },
            ],
          },
        ],
      },
    ]
  },
  {
    label: '选择器（单列）',
    type: 'picker',
    name: 'picker1',
    options: [
      { text: '杭州', value: 'Hangzhou' },
      { text: '宁波', value: 'Ningbo' },
      { text: '温州', value: 'Wenzhou' },
      { text: '绍兴', value: 'Shaoxing' },
      { text: '湖州', value: 'Huzhou' },
    ],
  },
  {
    type: 'date-picker',
    label: '日期',
    name: 'datePicker',
    attrs: {
      // 'columns-type': ['year']
    }
  },
  {
    type: 'date-picker',
    label: '日期（年份）',
    name: 'datePicker2',
    attrs: {
      'columns-type': ['year']
    },
  },
  {
    type: 'time-picker',
    label: '时间选择',
    name: 'timePicker',
    attrs: {
    }
  },
  {
    type: 'datetime-picker',
    label: '日期时间（单页）',
    name: 'datetimePicker',
    attrs: {
      showType: 'single',
      groupProps: {
        'columns-type': ['hour', 'minute']
      }

    }
  },
  {
    type: 'datetime-picker',
    label: '日期时间（组合）',
    name: 'datetimePicker1',
    attrs: {
      showType: 'group',
      groupProps: [
        { 'columns-type': ['year', 'month', 'day'] },
        { 'columns-type': ['hour', 'minute', 'second'] }
      ]
    }
  },
  {
    type: 'date-range-picker',
    label: '日期范围',
    name: 'dateRangePicker',
    attrs: {
    }
  },
  {
    type: 'time-range-picker',
    label: '时间范围',
    name: 'timeRangePicker',
    attrs: {
    }
  },
  {
    type: 'datetime-range-picker',
    label: '日期时间范围',
    name: 'datetimeRangePicker',
    attrs: {
      groupProps: [
        { 'columns-type': ['hour', 'minute',] },
        { 'columns-type': ['hour', 'minute', 'second'] }
      ]
    }
  },
  {
    type: 'area',
    label: '地区',
    name: 'areaPicker',
    attrs: {
    }
  },
  {
    type: 'cascader',
    label: '级联',
    name: 'cascader',
    attrs: {
      useVantAreaData: true
    }
  },
  {
    type: 'text',
    label: '文本',
    name: 'text',
  },
  {
    type: 'html',
    label: 'html片段',
    name: 'html',
    hiddenLabel: false
  },
  {
    type: 'input-slot',
    label: '表单插槽',
    name: 'customSlot1',
  },
  {
    type: 'slot',
    label: '全部插槽',
    name: 'customSlot',
  },
])
</script>
<style scoped></style>
