import path from "path";
import fs from "fs";
// @ts-ignore
import MarkdownIt from 'markdown-it'
// @ts-ignore
import mdContainer from 'markdown-it-container'
// @ts-ignore
import type Token from "markdown-it/lib/token";

import { highlight } from '../utils/highlight';
import { docRoot } from "../theme/global";

const localMd = MarkdownIt();

interface ContainerOpts {
    marker?: string | undefined;
    validate?(params: string): boolean;
    render?(tokens: Token[], index: number): string;
}

export const mdPlugin = (md: MarkdownIt) => {
    md.use(mdContainer, 'component', {
        validate(params) {
            return !!params.trim().match(/^component\s*(.*)$/)
        },
        render(tokens, idx) {
            const m = tokens[idx].info.trim().match(/^component\s+(.*)$/);
            if (tokens[idx].nesting === 1) {
                const description = m && m.length > 1 ? m[1] : "";
                const sourceFileToken = tokens[idx + 2];
                // demo文件名称
                const sourceFile = sourceFileToken.children?.[0].content ?? "";
                let source = "";
                if (sourceFileToken.type === "inline") {
                    // 读取示列代码文件
                    source = fs.readFileSync(
                        path.resolve(docRoot, "examples", `${sourceFile}.vue`),
                        "utf-8"
                    );
                }
                if (!source) throw new Error(`Incorrect source file: ${sourceFile}`);
                return `<CodeViewer 
                            title="${description}"
                            code="${encodeURIComponent(highlight(source, 'vue'))}" 
                            name="${sourceFile}" 
                            raw-source="${encodeURIComponent(source)}" 
                        >`
            } else {
                return "</CodeViewer>";
            }
        },
    } as ContainerOpts)
}