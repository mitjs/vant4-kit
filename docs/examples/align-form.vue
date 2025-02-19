<template>
    <x-form :model="formValue" :items="formOptions" :label-align="formValue.labelAlign"
        :input-align="formValue.inputAlign">
    </x-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { XFormItemOption } from 'vant4-kit';
const formValue = ref({
    labelAlign: 'left',
    inputAlign: 'left',
})
const formOptions = ref<XFormItemOption>([
    {
        label: 'label对其方式',
        type: 'radio',
        name: 'labelAlign',
        options: [
            { text: '左对齐', value: 'left' },
            { text: '右对齐', value: 'right' },
            { text: '顶部对其', value: 'top' },
            { text: '居中对齐', value: 'center' },
        ]
    },
    {
        label: 'Input对其方式',
        type: 'radio',
        name: 'inputAlign',
        options: [
            { text: '左对齐', value: 'left' },
            { text: '居中对齐', value: 'center' },
            { text: '右对齐', value: 'right' },
        ]
    },
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
        type: 'rate',
        label: 'rate 评分',
        name: 'rate',
        attrs: {
            count: 6
        },
    },
    {
        type: 'date-picker',
        label: '日期',
        name: 'datePicker',
        attrs: {
        }
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