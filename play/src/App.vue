<template>
  <div class="container">
    <x-form ref="formRef" label-align="top" :model="formValue" :items="formOptions" :rules="rules" inset
      @failed="onFailed" @change="onXFormChange" @confirm="onXFormConfirm">
      <template #customSlot>
        <h1>2222</h1>
      </template>
      <template #customSlot1>
        <h2>333</h2>
      </template>
    </x-form>
    <!-- <x-datetime-picker title="选择日期" @change="onChange"></x-datetime-picker>
    <van-date-picker title="选择日期" @confirm="(...args: any) => {
      console.log(args);

    }"></van-date-picker> -->
    <div>
      <Button block type="primary" @click="onSubmit">提交</Button>
    </div>

    <!-- <van-form ref="formRef1">
      <van-field v-model="formValue['name']" name="name" required :rules="[{ required: true, message: '请输入姓名' }]"
        label="姓名" placeholder="请输入姓名" />
      <van-field v-model="formValue['tel']" name="tel" required :rules="[{ required: true, message: '请输入手机号' }]"
        label="手机号" placeholder="请输入手机号" />
      <van-field v-model="formValue['number']" name="number" required :rules="[{ required: true, message: '请输入数字' }]"
        label="数字" placeholder="请输入数字" />
    </van-form>
    <div>
      <van-button block type="primary" @click="onSubmit1">提交</van-button>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import { ref, watch, h } from 'vue'
import { Button, type FormInstance } from 'vant'
import type { XFormItemOption, XFormItemRow } from 'vant4-kit'
const formRef = ref<FormInstance>()
const formRef1 = ref<FormInstance>()
const formValue = ref<any>({ text: 'text 文本', html: '<h3>我是html</h3> ' })
const formOptions = ref<XFormItemOption>([
  {
    label: 'Input 输入框',
    type: 'input',
    name: 'name',
    required: true,
    vif: (values: any) => {
      console.log('vif values =', values);
      return true
    }
  },
  {
    label: '手机号',
    type: 'input',
    name: 'tel',

    rules: [
      { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: ['onChange', 'onBlur'] },
    ],
    itemProps: {
      required: true,
    }
  },
  {
    label: 'Input 数字',
    type: 'input',
    name: 'number',
    itemProps: {
      type: 'number',
    }
  },
  {
    label: 'Input 整数',
    type: 'input',
    name: 'digit',
    itemProps: {
      type: 'digit',
    }
  },
  {
    label: 'Input 密码',
    type: 'input',
    name: 'password',
    itemProps: {
      type: 'password',
    }
  },
  // {
  //   label: 'Input 文本域',
  //   type: 'input',
  //   name: 'textarea',
  //   itemProps: {
  //     type: 'textarea',
  //     row: 2,
  //     autosize: true,
  //     'show-word-limit': true,
  //     maxlength: 50,
  //     slots: {
  //       label: () => 2222
  //     }
  //   }
  // },
  // {
  //   label: 'Stepper 步进器',
  //   type: 'stepper',
  //   name: 'age',

  // },
  // {
  //   label: 'Radio 单选',
  //   type: 'radio',
  //   name: 'sex',
  //   options: [
  //     { text: '男', value: '1' },
  //     { text: '女', value: '0' },

  //   ]
  // },
  // {
  //   label: 'Checkbox 多选',
  //   type: 'checkbox',
  //   name: 'checkbox',
  //   options: [
  //     { text: '男', value: '1', attrs: { disabled: true } },
  //     { text: '女', value: '0' },
  //     { text: '未知', value: '2' },
  //   ],
  //   attrs: {

  //     shape: 'square',
  //   }
  // },
  // {
  //   label: 'Slider 滑动',
  //   type: 'slider',
  //   name: 'slider',
  // },
  // {
  //   label: 'switch 开关',
  //   type: 'switch',
  //   name: 'switch',
  //   attrs: {
  //     activeValue: '1',
  //     inactiveValue: '0'
  //   }
  // },
  // {
  //   type: 'rate',
  //   label: 'rate 评分',
  //   name: 'rate',
  //   attrs: {
  //     count: 6
  //   },
  // },

  // {
  //   label: 'picker 选择器',
  //   type: 'picker',
  //   name: 'hubby',
  //   options: [
  //     {
  //       text: '浙江',
  //       value: 'Zhejiang',
  //       children: [
  //         {
  //           text: '杭州',
  //           value: 'Hangzhou',
  //           children: [
  //             { text: '西湖区', value: 'Xihu' },
  //             { text: '余杭区', value: 'Yuhang' },
  //           ],
  //         },
  //         {
  //           text: '温州',
  //           value: 'Wenzhou',
  //           children: [
  //             { text: '鹿城区', value: 'Lucheng' },
  //             { text: '瓯海区', value: 'Ouhai' },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       text: '福建',
  //       value: 'Fujian',
  //       children: [
  //         {
  //           text: '福州',
  //           value: 'Fuzhou',
  //           children: [
  //             { text: '鼓楼区', value: 'Gulou' },
  //             { text: '台江区', value: 'Taijiang' },
  //           ],
  //         },
  //         {
  //           text: '厦门',
  //           value: 'Xiamen',
  //           children: [
  //             { text: '思明区', value: 'Siming' },
  //             { text: '海沧区', value: 'Haicang' },
  //           ],
  //         },
  //       ],
  //     },
  //   ]
  // },
  // {
  //   label: 'picker1 选择器',
  //   type: 'picker',
  //   name: 'picker1',
  //   options: [
  //     { text: '杭州', value: 'Hangzhou' },
  //     { text: '宁波', value: 'Ningbo' },
  //     { text: '温州', value: 'Wenzhou' },
  //     { text: '绍兴', value: 'Shaoxing' },
  //     { text: '湖州', value: 'Huzhou' },
  //   ],
  //   hiddenLabel: true
  // },
  // {
  //   type: 'date-picker',
  //   label: 'date-picker 日期选择器',
  //   name: 'datePicker',
  //   attrs: {
  //     // 'columns-type': ['year']
  //   }
  // },
  // {
  //   type: 'date-picker',
  //   label: '日期选择器',
  //   name: 'datePicker2',
  //   attrs: {
  //     'columns-type': ['year']
  //   },
  // },
  // {
  //   type: 'time-picker',
  //   label: '时间选择器',
  //   name: 'timePicker',
  //   attrs: {
  //   }
  // },
  {
    type: 'datetime-picker',
    label: '日期时间选择',
    name: 'datetimePicker',
    attrs: {
      showType: 'single',
      groupProps: {
        'columns-type': ['hour', 'minute']
      }
      // groupProps: [
      //   { label: '开始时间', prop: 'startTime' },
      // ]
    }
  },
  {
    type: 'datetime-picker',
    label: '日期时间选择',
    name: 'datetimePicker2',
    attrs: {
      showType: 'group',
      groupProps: {
        'columns-type': ['hour', 'minute']
      }
      // groupProps: [
      //   { label: '开始时间', prop: 'startTime' },
      // ]
    }
  },
  // {
  //   type: 'date-range-picker',
  //   label: '日期范围',
  //   name: 'dateRangePicker',
  //   attrs: {
  //   }
  // },
  // {
  //   type: 'time-range-picker',
  //   label: '时间范围',
  //   name: 'timeRangePicker',
  //   attrs: {
  //   }
  // },
  // {
  //   type: 'datetime-range-picker',
  //   label: '日期时间范围选择器',
  //   name: 'datetimeRangePicker',
  //   attrs: {
  //     groupProps: [
  //       { 'columns-type': ['hour', 'minute',] },
  //       { 'columns-type': ['hour', 'minute', 'second'] }
  //     ]
  //   }
  // },
  // {
  //   type: 'area',
  //   label: '地区',
  //   name: 'areaPicker',
  //   attrs: {
  //   }
  // },
  // {
  //   type: 'cascader',
  //   label: '级联',
  //   name: 'cascader',
  //   attrs: {
  //     useVantAreaData: true
  //   }
  // },
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
    label: '插槽',
    name: 'customSlot1',
  },
  {
    type: 'slot',
    label: '插槽',
    name: 'customSlot',
  },
])

const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'onChange' },
  ],
  // tel: [
  //   { required: true, message: '请输入手机号', trigger: ['onBlur', 'onChange'] },
  //   { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: ['onChange'] },
  // ],
}

watch(formValue, (val) => {
  console.log('watch formValues =', val)
}, { deep: true })

const onSubmit = () => {
  formRef.value?.validate().then(() => {
    console.log('submit values =', formValue.value);
  }).catch(error => {
    console.log('error', error);
  })
}

const onSubmit1 = () => {
  formRef1.value?.validate().then(() => {
    const values = formRef.value?.submit()
    console.log('submit values =', values);
    console.log('submit values =', values);
  }).catch(error => {
    console.log('error', error);
  })

}

const onFailed = (error: any) => {
  console.log('failed error =', error);
}
const onXFormChange = (...args: any) => {
  console.log('onXFormChange', ...args);
}

const onXFormConfirm = (...args: any) => {
  console.log('onXFormConfirm', ...args);
}

const onChange = (rows: any) => {
  console.log('onChange', rows);

}
</script>


<style scoped>
.container {
  height: 100%;
  width: 100%;
}
</style>
