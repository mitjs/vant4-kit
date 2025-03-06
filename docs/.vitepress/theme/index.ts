import defaultTheme from 'vitepress/theme'
import CodeViewer from './components/CodeViewer.vue'
import { inBrowser, type Theme } from 'vitepress'
import '../vitepress/styles/code.css'
import 'vant/lib/index.css';
import './styles/var.css'
// import 'prismjs/themes/prism.css'
// import 'prismjs/components/prism-javascript';
import Vant4Kit from 'vant4-kit'
import useVisitData from '../hooks/useVisitData';
import type { Plugin } from 'vue';

export default {
    ...defaultTheme,
    enhanceApp({ app, router }) {
        app.use(Vant4Kit as any)
        app.component('CodeViewer', CodeViewer)
        if (inBrowser) {
            router.onAfterPageLoad = (to) => {
                useVisitData()
            }
        }
    }
} as Theme