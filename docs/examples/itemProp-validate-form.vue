<template>
  <x-form ref="formRef" :model="formValue" :items="formItems"></x-form>
  <div>
    <Button type="primary" @click="onSubmit" block>提交</Button>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FieldRule } from 'vant'
import { Button, showFailToast } from 'vant'
import type { XFormItemOption } from 'vant4-kit';
import { ref, h } from 'vue'

const formRef = ref<FormInstance>()
const formValue = ref({})
const formItems = ref<XFormItemOption>([
  {
    type: 'input',
    label: '姓名',
    name: 'name',
    required: true,
  },
  {
    type: 'input',
    label: '邮箱',
    required: true,
    name: 'email',
    itemProps: {
      rules: [
        { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱', trigger: ['onChange', 'onBlur'] },
      ],
    }

  },
  {
    type: 'checkbox',
    label: '兴趣',
    name: 'hobby',
    required: true,
    options: [
      { text: '篮球', value: 'basketball' },
      { text: '足球', value: 'football' },
      { text: '羽毛球', value: 'badminton' },
    ],
    attrs: {
      shape: 'square'
    }
  }
])

const onSubmit = () => {
  formRef.value?.validate().then(() => {
    console.log('submit values =', formValue.value);
  }).catch(error => {
    console.log('error', error);
    showFailToast('请检查表单填写')
  })
}
</script>
<style lang="scss" scoped></style>