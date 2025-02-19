<template>
    <div class="code-viewer">
        <div class="left-code">
            <div class="code-operation">
                <button class="copy-btn" title="复制代码" @click="copyCode">
                    <CopyIcon size="18" color="#888" />
                </button>
                <button class="copy-btn" :title="isView ? '关闭预览' : '开启预览'" @click="onPreview">
                    <NoPreviewIcon v-if="isView" size="18" color="#888" />
                    <PreviewIcon v-else size="18" color="#888" />
                </button>
            </div>
            <div class="code-container" v-html="decoded"></div>
        </div>
        <div :class="['right-preview', { isPreview: isView }]">
            <div class="comp-title"> {{ compTitle }}</div>
            <div class="demo-container">
                <iframe :src="currentComponent" frameborder="0" height="100%" width="100%"></iframe>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import CopyIcon from './copy-icon.vue'
import PreviewIcon from './preview-icon.vue'
import NoPreviewIcon from './no-preview-icon.vue'
import { useClipboard } from '@vueuse/core'
import { showFailToast, showSuccessToast } from 'vant'
// const DEMO_RUN_URL = 'http://localhost:5173'
const DEMO_RUN_URL = 'https://vant4-kit-moblie.netlify.app'
const props = defineProps({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    rawSource: {
        type: String,
        required: true
    }
})

const { copy, isSupported } = useClipboard({
    source: decodeURIComponent(props.rawSource),
    read: false,
})

const decoded = computed(() => decodeURIComponent(props.code))
const currentComponent = computed(() => DEMO_RUN_URL + `/${props.name}`)
const compTitle = computed(() => props.title || props.name)

const copyCode = async () => {
    if (!isSupported) {
        showFailToast('复制失败')
    }
    try {
        await copy()
        showSuccessToast('已复制到剪切板')
    } catch (e) {
        showFailToast(e.message)
    }
}

const isView = ref(true)
const onPreview = () => {
    isView.value = !isView.value
}
</script>

<style scoped>
.code-viewer {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    overflow: hidden;
    margin: 20px 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 500px;
}

.left-code {
    box-sizing: border-box;
    overflow-x: auto;
    flex: 1 1 0%;
    height: 100%;
    overflow: hidden;
}

.left-code .code-operation {
    padding: 4px 10px;
    background-color: #f8f8f8;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    text-align: right;
}

.copy-btn {
    padding: 2px;
    margin: 0 2px;
}

.left-code .code-container {
    height: calc(100% - 35px);
    padding: 4px;
    overflow-y: auto;
}

.code-container::-webkit-scrollbar {
    width: 1px;
}

.code-container::-webkit-scrollbar-thumb {
    background-color: #0003;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
}

.right-preview {
    flex: 0 0 0px;
    box-sizing: border-box;
    height: 500px;
    border-left: 1px solid #e2e2e2;
    overflow: hidden;
    transition: all .3s;
    /* position: fixed;
    width: 325px;
    top: 20vh;
    right: -325px; */
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
    /* border-radius: 8px; */
    z-index: 10;
}

.right-preview.isPreview {
    flex: 0 0 345px;
    right: 10vw;
}

.right-preview .comp-title {
    padding: 6px 10px;
    /* background-color: #1989fa; */
    background-color: #f8f8f8;
    /* color: #fff; */
    font-size: 14px;
    border-bottom: 1px solid #eee;
}

.right-preview .demo-container {
    height: calc(100% - 35px);
    /* overflow: auto; */
    font-size: 14px;
}


/* .code {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 16px;
    overflow-x: auto;
}

pre {
    margin: 0;
}

code {
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
} */
</style>