// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [
    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^mt-([\.\d]+)$/, ([_, num]) => ({ 'margin-top': `${num}px` })],
    [/^mb-([\.\d]+)$/, ([_, num]) => ({ 'margin-bottom': `${num}px` })],
    [/^ml-([\.\d]+)$/, ([_, num]) => ({ 'margin-left': `${num}px` })],
    [/^mr-([\.\d]+)$/, ([_, num]) => ({ 'margin-right': `${num}px` })]
  ]
})
