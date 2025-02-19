import defaultTheme from 'vitepress/theme'
import CodeViewer from './components/CodeViewer.vue'
import '../vitepress/styles/code.css'
import 'vant/lib/index.css';
import './styles/var.css'
// import 'prismjs/themes/prism.css'
// import 'prismjs/components/prism-javascript';
import Vant4Kit from 'vant4-kit'
export default {
    ...defaultTheme,
    enhanceApp({ app }) {
        app.use(Vant4Kit)
        app.component('CodeViewer', CodeViewer)
    }
}