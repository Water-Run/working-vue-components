/**
 * 页面标题组件类型定义
 * @author WaterRun
 * @date 2025-09-19
 * @file pageHeader.ts
 */

// 页面标题组件属性
export interface PageHeaderProps {
    /** 页面标题 */
    title: string;
    /** 页面次标题 */
    subtitle?: string;
    /** 帮助内容*/
    helpContent?: string;
}