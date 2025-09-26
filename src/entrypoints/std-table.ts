/**
 * 页面表格入口
 * @author WaterRun
 * @date 2025-09-26
 * @file std-table.ts
 * @description 为页面提供Vue StdTable组件
 */

import { createApp } from 'vue'
import StdTable from '../components/StdTable.vue'
import type { StdTableConfig, TableApiResponse, TableRequestParams } from '@/types/stdTable'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

// 创建一个新的全局配置变量名，避免与pageConfig冲突
declare global {
    interface Window {
        stdTableConfig?: StdTableConfig;
        // 表格相关的全局函数
        loadTableData?: (params: TableRequestParams) => Promise<TableApiResponse>;
        handleTableError?: (error: Error) => void;
        vueTableApp?: any;
        vueTableInstance?: any;
        reloadTableData?: (params?: Partial<TableRequestParams>) => void;
        updateTableConfig?: (newConfig: Partial<StdTableConfig>) => void;
        getTableState?: () => any;
    }
}

/**
 * 默认数据加载函数
 * @param params 请求参数
 * @returns Promise<TableApiResponse>
 */
async function defaultDataLoader(params: TableRequestParams): Promise<TableApiResponse> {
    try {
        // 使用新的配置变量名
        const tableConfig = window.stdTableConfig

        // 如果配置中有dataUrl，发起AJAX请求
        if (tableConfig?.dataUrl) {
            const url = new URL(tableConfig.dataUrl, window.location.origin)

            // 添加请求参数
            Object.keys(params).forEach(key => {
                url.searchParams.append(key, String(params[key]))
            })

            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`)
            }

            const data = await response.json()

            // 标准化返回数据格式
            return {
                success: data.success !== false,
                data: data.data || data.rows || [],
                totalCount: data.totalCount || data.total || 0,
                currentPage: data.currentPage || data.page || params.page,
                pageSize: data.pageSize || data.size || params.pageSize,
                error: data.error || data.message,
                errorCode: data.errorCode || data.code
            }
        }

        // 如果没有dataUrl，返回配置中的静态数据
        const staticData = tableConfig?.data || []
        const pageSize = params.pageSize
        const startIndex = (params.page - 1) * pageSize
        const endIndex = startIndex + pageSize

        return {
            success: true,
            data: staticData.slice(startIndex, endIndex),
            totalCount: staticData.length,
            currentPage: params.page,
            pageSize: pageSize
        }

    } catch (error) {
        // console.error('表格数据加载失败:', error)

        return {
            success: false,
            data: [],
            totalCount: 0,
            currentPage: 1,
            pageSize: params.pageSize,
            error: error instanceof Error ? error.message : '数据加载失败',
            errorCode: 'LOAD_ERROR'
        }
    }
}

/**
 * 默认错误处理函数
 * @param _error 错误对象
 */
function defaultErrorHandler(_error: Error): void {
    // console.error('表格组件错误:', error)
    // 可以在这里添加全局错误处理逻辑
    // 比如显示全局错误提示、上报错误等
}

/**
 * 初始化Vue表格应用
 */
function initVueTableApp(): void {
    const mountPoint = document.getElementById('std-table-app')
    if (!mountPoint) {
        // console.warn('未找到表格组件挂载点: #std-table-app')
        return
    }

    try {
        // 验证配置 - 使用新的配置变量名
        if (!window.stdTableConfig) {
            throw new Error('未找到表格配置 window.stdTableConfig')
        }

        if (!window.stdTableConfig.tableName) {
            throw new Error('表格配置缺少必需的 tableName 属性')
        }

        if (!window.stdTableConfig.fields || !Array.isArray(window.stdTableConfig.fields) || window.stdTableConfig.fields.length === 0) {
            throw new Error('表格配置缺少有效的 fields 数组')
        }

        // 设置默认值
        const config: StdTableConfig = {
            initialHeight: 15,
            description: '',
            minWidthRatio: 1.0,
            data: [],
            totalCount: 0,
            currentPage: 1,
            ...window.stdTableConfig
        }

        // 更新全局配置
        window.stdTableConfig = config

        // 设置默认回调函数
        if (!window.loadTableData) {
            window.loadTableData = defaultDataLoader
        }

        if (!window.handleTableError) {
            window.handleTableError = defaultErrorHandler
        }

        // 创建Vue应用
        const app = createApp(StdTable)

        // 挂载 Vuetify
        app.use(vuetify)

        // 提供全局错误处理
        app.config.errorHandler = (err: any) => {
            // console.error('Vue应用错误:', err)
            if (window.handleTableError) {
                window.handleTableError(err instanceof Error ? err : new Error(String(err)))
            }
        }

        // 挂载应用
        const vueInstance = app.mount('#std-table-app')

        // 保存到全局变量
        window.vueTableApp = app
        window.vueTableInstance = vueInstance

        // // console.log('表格组件初始化成功')

    } catch (error) {
        // console.error('表格组件初始化失败:', error)

        // 显示降级UI
        showFallbackUI(mountPoint, error instanceof Error ? error.message : String(error))
    }
}

/**
 * 显示降级UI
 * @param container 容器元素
 * @param errorMessage 错误信息
 */
function showFallbackUI(container: HTMLElement, errorMessage: string): void {
    const title = window.stdTableConfig?.tableName || '数据表格'

    container.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            padding: 24px;
            color: white;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            margin-bottom: 24px;
            text-align: center;
        ">
            <div style="margin-bottom: 16px;">
                <div style="
                    width: 48px;
                    height: 48px;
                    margin: 0 auto 12px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                ">⚠</div>
                <h1 style="
                    margin: 0 0 8px 0; 
                    font-size: 24px; 
                    font-weight: 600; 
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                ">
                    ${title}
                </h1>
                <p style="
                    margin: 0; 
                    opacity: 0.9; 
                    font-size: 16px;
                    font-weight: 500;
                ">
                    表格组件加载失败
                </p>
            </div>
            <div style="
                background: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                padding: 16px;
                margin-top: 16px;
                text-align: left;
            ">
                <p style="margin: 0 0 8px 0; font-weight: 600; font-size: 14px;">错误详情:</p>
                <p style="
                    margin: 0; 
                    font-family: monospace; 
                    font-size: 12px; 
                    opacity: 0.9;
                    word-break: break-all;
                ">${errorMessage}</p>
            </div>
            <p style="
                margin: 16px 0 0 0; 
                opacity: 0.8; 
                font-size: 12px;
            ">
                联系系统管理员或刷新页面重试
            </p>
        </div>
    `
}

/**
 * 等待后端注入 stdTableConfig，再挂载 Vue 应用
 */
function waitForTableConfig(): void {
    if (window.stdTableConfig) {
        initVueTableApp()
    } else {
        // 最多等待5秒
        const timeout = setTimeout(() => {
            // console.warn('等待stdTableConfig超时，使用默认配置')
            window.stdTableConfig = {
                tableName: '数据表格',
                fields: [
                    { title: 'ID' },
                    { title: '名称' }
                ],
                initialHeight: 10,
                description: '表格配置加载超时',
                data: []
            }
            initVueTableApp()
        }, 5000)

        // 继续检查配置
        const checkConfig = (): void => {
            if (window.stdTableConfig) {
                clearTimeout(timeout)
                initVueTableApp()
            } else {
                setTimeout(checkConfig, 100)
            }
        }

        setTimeout(checkConfig, 100)
    }
}

/**
 * 公开API：重新加载表格数据
 * @param params 可选的请求参数
 */
function reloadTableData(params?: Partial<TableRequestParams>): void {
    if (window.vueTableInstance && typeof window.vueTableInstance.reloadData === 'function') {
        window.vueTableInstance.reloadData(params)
    } else {
        // console.warn('表格实例未准备就绪，无法重新加载数据')
    }
}

/**
 * 公开API：更新表格配置
 * @param newConfig 新的配置
 */
function updateTableConfig(newConfig: Partial<StdTableConfig>): void {
    if (window.stdTableConfig) {
        window.stdTableConfig = { ...window.stdTableConfig, ...newConfig }

        if (window.vueTableInstance && typeof window.vueTableInstance.updateConfig === 'function') {
            window.vueTableInstance.updateConfig(window.stdTableConfig)
        }
    }
}

/**
 * 公开API：获取当前表格状态
 * @returns 当前表格状态信息
 */
function getTableState(): any {
    if (window.vueTableInstance && typeof window.vueTableInstance.getState === 'function') {
        return window.vueTableInstance.getState()
    }
    return null
}

// 将公开API挂载到全局
if (typeof window !== 'undefined') {
    window.reloadTableData = reloadTableData
    window.updateTableConfig = updateTableConfig
    window.getTableState = getTableState
}

// 应用入口
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForTableConfig)
} else {
    waitForTableConfig()
}

// 导出类型和函数供其他模块使用
export {
    initVueTableApp,
    reloadTableData,
    updateTableConfig,
    getTableState,
    defaultDataLoader,
    defaultErrorHandler
}

export type { StdTableConfig, TableApiResponse, TableRequestParams }