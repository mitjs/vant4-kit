<template>
    <x-form :model="formValue" :items="formOptions" readonly>
    </x-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { XFormItemOption } from 'vant4-kit';
const formValue = ref({
    name: '苏苏',
    tel: '123456789',
    idCard: '320830200012120124',
    textarea: '测试数据',
    password: '15212344567',
    checkbox: ['2'],
    slider: 20,
    rate: 3,
    switch: '1',
    picker1Text: '温州',
    picker1: 'Wenzhou'

})
const formOptions = ref<XFormItemOption>([
    {
        label: '普通输入',
        type: 'input',
        name: 'name',
    },
    {
        label: '身份证号',
        type: 'input',
        name: 'idCard',
        itemProps: {
            formatter: (val) => {
                console.log('val', val);
                return val.replace(/(\d{3})\d*(\d{4})/, '$1' + '*'.repeat(val.length - 7) + '$2');
            }
        }
    },
    {
        label: '手机号',
        type: 'input',
        name: 'tel',
        itemProps: {
            type: 'tel',
            formatter: (val) => {
                const phoneNumber = val.toString().replace(/\D/g, '');
                return phoneNumber.replace(/(\d{3})\d*(\d{4})/, '$1' + '*'.repeat(phoneNumber.length - 7) + '$2');
            }
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
        label: '选择器',
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
])
</script>
<style lang="scss" scoped></style>