<template>
  <x-form  ref="formRef" :model="formValue" :items="formItems" :rules="formRules" >
   </x-form>
  <div >
    <Button type="primary" @click="onSubmit" block>提交</Button>
  </div>
</template>

<script lang="ts" setup>
import type {FormInstance,FieldRule} from 'vant'
import  { Button,showFailToast } from 'vant'
import type { XFormItemOption } from 'vant4-kit';
import { ref, h } from 'vue'

const formRef=ref<FormInstance>()
const formValue = ref({})
const formItems = ref<XFormItemOption>([
  {
    type: 'input',
    label: '姓名',
    name:'name'
  },
  {
    type: 'input',
    label: '手机号',
    name:'tel',
    attrs:{
      type:'tel',
    }
  },
  {
    type: 'input',
    label: '邮箱',
    name:'email',
  },
])

const formRules:{ [key:string]:FieldRule[] }={
  name:[
    { required:true,message:'请输入姓名',trigger:['onBlur']}
  ],
  tel:[
    { required:true,message:'请输入手机号',trigger:['onBlur']},
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: ['onChange','onBlur'] },
  ],
  email:[
    { required:true,message:'请输入邮箱',trigger:['onBlur',]},
    { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱', trigger: ['onChange','onBlur'] },
  ]
}

const onSubmit=()=>{
  formRef.value?.validate().then(()=>{
    console.log('submit values =',formValue.value);
  }).catch(error=>{
    console.log('error',error);
    showFailToast('请检查表单填写')
  })
}
</script>
<style lang="scss" scoped>
</style>