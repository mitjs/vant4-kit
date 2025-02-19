<template>
    <svg t="1739369406741" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="9865" :width="size" :height="size" :fill="color">
        <path
            d="M768 384h-128V241.92A114.346667 114.346667 0 0 0 526.08 128H241.92A114.346667 114.346667 0 0 0 128 241.92v284.16A114.346667 114.346667 0 0 0 241.92 640H384v128a128 128 0 0 0 128 128h256a128 128 0 0 0 128-128v-256a128 128 0 0 0-128-128z m-384 128v42.666667H241.92a28.586667 28.586667 0 0 1-28.586667-28.586667V241.92A28.586667 28.586667 0 0 1 241.92 213.333333h284.16a28.586667 28.586667 0 0 1 28.586667 28.586667V384h-42.666667a128 128 0 0 0-128 128z"
            p-id="9866"></path>
    </svg>
</template>
<script setup>
const props = defineProps({
    size: {
        type: String || Number,
        required: false,
        default: 16
    },
    color: {
        type: String,
        required: false,
        default: '#314659'
    },

})
</script>