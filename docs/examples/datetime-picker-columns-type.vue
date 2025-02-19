<template>
    <h4>到小时级别</h4>
    <x-datetime-picker v-model="dateTimeH" title="选择时间" :columns-type="['hour']" :minYear="2020"
        :maxYear="2025"></x-datetime-picker>

    <h4>到分钟级别</h4>
    <x-datetime-picker v-model="dateTimeM" title="选择时间" :columns-type="['hour', 'minute']" :minYear="2020"
        :maxYear="2025"></x-datetime-picker>

    <h4>到秒级别</h4>
    <x-datetime-picker v-model="dateTimeS" title="选择时间" :columns-type="['hour', 'minute', 'second']" :minYear="2020"
        :maxYear="2025"></x-datetime-picker>

    <p></p>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const dateTimeH = ref([])
const dateTimeM = ref([])
const dateTimeS = ref([])
</script>
<style lang="scss" scoped></style>