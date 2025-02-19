import escapeHtml from 'escape-html'
import prism from 'prismjs'
// import 'prismjs/themes/prism.css'
import loadLanguages from "prismjs/components/index";

loadLanguages(["markup", "css", "javascript"]);
// 定义一个wrap函数，用于将代码包裹在指定的语言标签中
function wrap(code: string, lang: string) {
    // 如果语言是vue，则将代码包裹在CodeViewer组件中
    if (lang === 'text') {
        code = escapeHtml(code)
    }
    // 否则，将代码包裹在pre和code标签中，并添加相应的语言类名
    return `<pre class="line-numbers"><code style="font-size: 14px" class="language-${lang}">${code}</code></pre>`
    // ...
}

export const highlight = (str: string, lang: string) => {
    // console.log('lang', lang);

    if (!lang) {
        return wrap(str, "text");
    }

    lang = lang.toLowerCase();
    const rawLang = lang;
    if (lang === "vue" || lang === "html") {
        lang = "markup";
    }
    if (lang === "md") {
        lang = "markdown";
    }
    if (lang === "ts") {
        lang = "typescript";
    }
    if (lang === "py") {
        lang = "python";
    }
    if (prism.languages[lang]) {
        const code = prism.highlight(str, prism.languages[lang], lang)
        return wrap(code, rawLang)
    }
    return wrap(str, "text");
}