<template>
    <x-form :model="formValue" :items="formItems">
        <template #labelSlot.label>
            <span style="color:red">我是label插槽</span>
        </template>
        <template #leftIconSlot.left-icon>
            <Icon name="smile" />
        </template>
        <template #rightIconSlot.right-icon>
            <Icon name="fire-o" color="#ee0a24" />
        </template>
        <template #errorMessage.error-message="{ message }">
            <span>错误提示插槽:{{ message }}</span>
        </template>
        <template #button.button>
            <Button type="primary" size="small">尾部按钮</Button>
        </template>
        <template #extra.extra>
            <span>额外内容</span>
        </template>
        <template #customSlot>
            <h3>自定义表单项输入区插槽</h3>
        </template>
        <template #solt>
            <h3>自定义表单项插槽</h3>
        </template>
    </x-form>
</template>

<script lang="ts" setup>
import type { XFormItemOption } from 'vant4-kit';
import { ref } from 'vue'
import { Icon, Button } from 'vant';

const formValue = ref({})
const formItems = ref<XFormItemOption>([
    {
        type: 'input',
        label: 'Label 插槽',
        name: 'labelSlot'
    },
    {
        type: 'input',
        label: '左图标插槽',
        name: 'leftIconSlot'
    },
    {
        type: 'input',
        label: '有图标插槽',
        name: 'rightIconSlot'
    },
    {
        type: 'input',
        label: '按钮插槽',
        name: 'button'
    },
    {
        type: 'input',
        label: '错误提示插槽',
        name: 'errorMessage',
        itemProps: {
            'errorMessage': '我错啦'
        }
    },
    {
        type: 'input',
        label: '额外内容插槽',
        name: 'extra'
    },
    {
        type: 'input-slot',
        label: '自定义插槽',
        name: 'customSlot'
    },
    {
        type: 'slot',
        label: '输入框',
        name: 'solt'
    }
])
</script>
<style lang="scss" scoped></style>