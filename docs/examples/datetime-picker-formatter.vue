<template>
    <p>基础用法</p>
    <x-datetime-picker v-model="dateTime" title="选择时间" :minYear="2020" :maxYear="2025"
        :columns-type="['hour', 'minute']" :formatter="handleFormatter"></x-datetime-picker>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const dateTime = ref([])

const handleFormatter = (type: string, option: any) => {
    console.log('type', type);
    if (type === 'year') {
        option.text += '年'
    }
    if (type === 'month') {
        option.text += '月'
    }
    if (type === 'day') {
        option.text += '日'
    }
    if (type === 'hour') {
        option.text += '时'
    }
    if (type === 'minute') {
        option.text += '分'
    }
    if (type === 'second') {
        option.text += '秒'
    }

    return option;
}
</script>
<style lang="scss" scoped></style>