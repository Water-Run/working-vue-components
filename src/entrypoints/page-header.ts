/**
 * 页面标题入口
 * @author WaterRun
 * @date 2025-09-24
 * @file page-header.ts
 * @description 为页面提供Vue PageHeader组件
 */

import { createApp } from 'vue'
import PageHeader from '../components/PageHeader.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

declare global {
    interface Window {
        pageConfig: {
            title: string
            subtitle?: string
            helpContent?: string
            token?: string
        }
        vueApp?: any
        vueInstance?: any
    }
}

/**
 * 初始化Vue应用
 */
function initVueApp() {
    const mountPoint = document.getElementById('page-header-app')
    if (!mountPoint) {
        return
    }

    try {
        const app = createApp(PageHeader)

        // 挂载 Vuetify
        app.use(vuetify)

        const vueInstance = app.mount('#page-header-app')

        window.vueApp = app
        window.vueInstance = vueInstance
    } catch (error) {
        // console.error('Vue应用挂载失败:', error)

        const title = window.pageConfig?.title || '标题加载失败'
        mountPoint.innerHTML = `
      <div style="
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        padding: 24px;
        color: white;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        margin-bottom: 24px;
      ">
        <h1 style="margin: 0; font-size: 28px; font-weight: 600; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          ${title}
        </h1>
        <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">
          Vue应用加载失败，联系系统管理员
        </p>
      </div>
    `
    }
}

/**
 * 等待后端注入 pageConfig，再挂载 Vue 应用
 */
function waitForPageConfig() {
    if (window.pageConfig) {
        initVueApp()
    } else {
        setTimeout(waitForPageConfig, 100)
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForPageConfig)
} else {
    waitForPageConfig()
}