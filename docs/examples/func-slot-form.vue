<template>
    <x-form :model="formValue" :items="formItems">
    </x-form>
</template>

<script lang="ts" setup>
import type { XFormItemOption } from 'vant4-kit';
import { ref, h } from 'vue'
import { Icon, Button } from 'vant';

const formValue = ref({})
const formItems = ref<XFormItemOption>([
    {
        type: 'input',
        label: 'Label 插槽',
        name: 'labelSlot',
        itemProps: {
            slots: {
                label: () => h('span', { style: { color: 'red' } }, '我是label插槽')
            }
        }
    },
    {
        type: 'input',
        label: '图标插槽',
        name: 'leftIconSlot',
        itemProps: {
            slots: {
                'left-icon': () => h(Icon, { name: 'smile' }),
                'right-icon': () => h(Icon, { name: 'fire-o', color: '#ee0a24' })
            }
        }
    },
    {
        type: 'input',
        label: '按钮插槽',
        name: 'button',
        itemProps: {
            slots: {
                'button': () => h(Button, { type: 'primary', size: 'small' }, '尾部按钮'),
            }
        }
    },
    {
        type: 'input',
        label: '错误提示插槽',
        name: 'errorMessage',
        itemProps: {
            'errorMessage': '我错啦',
            slots: {
                'error-message': ({ message }: { message: string }) => h('span', { style: { color: 'red' } }, `错误提示插槽:${message}`)
            }
        }
    },
    {
        type: 'input',
        label: '额外内容插槽',
        name: 'extra',
        itemProps: {
            slots: {
                extra: () => h('span', { style: { color: 'green' } }, `额外内容`)
            }
        }
    },
    {
        type: 'input-slot',
        label: '自定义插槽',
        name: 'customSlot',
        itemProps: {
            slots: {
                input: () => h('div', {}, '自定义插槽'),
            }
        }
    },
])
</script>
<style lang="scss" scoped></style>