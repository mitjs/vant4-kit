<template>
    <x-form  ref="formRef" :model="formValue" :items="formItems" required >
        
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
      label: '账号',
      name:'name'
    },
    {
      type: 'input',
      label: '密码',
      name:'pasword',
      attrs:{
        type:'password',
      }
    },
    
  ])

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