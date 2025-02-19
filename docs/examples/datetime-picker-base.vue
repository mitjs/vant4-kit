<template>
    <p>基础用法</p>
    <x-datetime-picker v-model="dateTime" title="选择时间" :minYear="2020" :maxYear="2025"></x-datetime-picker>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const dateTime = ref([])
</script>
<style lang="scss" scoped></style>