/**
 * 标准化表格组件类型定义
 * @author WaterRun
 * @date 2025-09-29
 * @file stdTable.ts
 */

// 表格字段定义
export interface TableField {
    /** 字段显示标题 */
    title: string;
    /** 字段宽度权重，默认为平均值 */
    size?: number;
}

// 表格数据行类型
export interface TableRow {
    /** 行数据，键值对形式 */
    [key: string]: any;
}

// 表格配置接口
export interface StdTableConfig {
    /** 表格名称 */
    tableName: string;
    /** 表格字段列表 */
    fields: TableField[];
    /** 表格初始高度(单页展示行数)，可选，默认10 */
    initialHeight?: number;
    /** 表格说明信息，可选，默认为空 */
    description?: string;
    /** 表的最小宽度倍率，可选，默认1.0 */
    minWidthRatio?: number;
    /** 表格数据，可选 */
    data?: TableRow[];
    /** 总数据条数，用于分页计算，可选 */
    totalCount?: number;
    /** 当前页码，可选，默认1 */
    currentPage?: number;
    /** 数据加载URL，用于异步加载，可选 */
    dataUrl?: string;
    /** 忽略宽度限制，可选 */
    ignoreWidthLimit?: boolean;
    /** 禁用高度调节控件，可选 */
    disableHeightAdjust?: boolean;
    /** 禁用标记控件，可选 */
    disableMarking?: boolean;
    /** 禁用导出控件，可选 */
    disableOutput?: boolean;
    /** 管理员注释，可选 */
    adminComment?: string;
    /** 禁用排序功能，可选 */
    disableSort?: boolean;
}

// 表格状态类型
export type TableStatus =
    | 'normal'      // 正常状态
    | 'loading'     // 加载中
    | 'empty'       // 数据为空
    | 'error'       // 组件异常
    | 'narrow'      // 宽度过窄
    | 'noheader'    // 无表头
    | 'pagelimit';  // 页数超限

// 表格状态信息接口
export interface TableStatusInfo {
    /** 状态类型 */
    status: TableStatus;
    /** 状态图标路径 */
    icon: string;
    /** 主要状态文本 */
    mainText: string;
    /** 次要状态文本 */
    subText: string;
    /** 图标CSS类，用于动画等 */
    iconClass?: string;
}

// 分页信息接口
export interface PaginationInfo {
    /** 当前页码 */
    currentPage: number;
    /** 总页数 */
    totalPages: number;
    /** 每页显示行数 */
    pageSize: number;
    /** 总数据条数 */
    totalCount: number;
    /** 是否有上一页 */
    hasPrevious: boolean;
    /** 是否有下一页 */
    hasNext: boolean;
}

// 表格事件类型
export interface TableEvents {
    /** 页面变化事件 */
    onPageChange?: (page: number) => void;
    /** 表高变化事件 */
    onHeightChange?: (height: number) => void;
    /** 数据加载事件 */
    onDataLoad?: (params: any) => Promise<any>;
    /** 错误处理事件 */
    onError?: (error: Error) => void;
    /** 行点击事件 */
    onRowClick?: (row: TableRow, index: number) => void;
    /** 字段点击事件 */
    onFieldClick?: (field: TableField) => void;
}

// 表格组件属性接口
export interface StdTableProps {
    /** 表格配置 */
    config: StdTableConfig;
    /** 表格事件处理器 */
    events?: TableEvents;
    /** 是否显示加载状态 */
    loading?: boolean;
    /** 自定义CSS类名 */
    className?: string;
    /** 自定义样式 */
    style?: Record<string, any>;
}

// API响应接口
export interface TableApiResponse {
    /** 是否成功 */
    success: boolean;
    /** 数据列表 */
    data: TableRow[];
    /** 总数据条数 */
    totalCount: number;
    /** 当前页码 */
    currentPage: number;
    /** 每页大小 */
    pageSize: number;
    /** 错误信息，可选 */
    error?: string;
    /** 错误代码，可选 */
    errorCode?: string | number;
}

// 表格请求参数接口
export interface TableRequestParams {
    /** 页码 */
    page: number;
    /** 每页大小 */
    pageSize: number;
    /** 排序字段，可选 */
    sortField?: string;
    /** 排序方向，可选 */
    sortOrder?: 'asc' | 'desc';
    /** 搜索关键词，可选 */
    keyword?: string;
    /** 筛选条件，可选 */
    filters?: Record<string, any>;
    /** 其他自定义参数，可选 */
    [key: string]: any;
}

// 工具提示配置接口
export interface TooltipConfig {
    /** 是否显示 */
    visible: boolean;
    /** 内容 */
    content: string;
    /** 位置样式 */
    style: Record<string, any>;
    /** 最大宽度 */
    maxWidth?: number;
}

// 表格内部状态接口
export interface TableInternalState {
    /** 当前配置 */
    config: StdTableConfig;
    /** 当前数据 */
    tableData: TableRow[];
    /** 当前状态 */
    currentStatus: TableStatus;
    /** 当前页码 */
    currentPage: number;
    /** 表格高度 */
    tableHeight: number;
    /** 总数据条数 */
    totalCount: number;
    /** 是否显示高度滑动条 */
    isHeightSliderVisible: boolean;
    /** GOTO输入框值 */
    gotoPageInput: string;
    /** GOTO输入框是否激活 */
    isGotoInputActive: boolean;
    /** 工具提示配置 */
    tooltip: TooltipConfig;
}

// 行标记信息接口
export interface RowMarking {
    /** 是否高亮 */
    highlighted: boolean;
    /** 是否删除线 */
    strikethrough: boolean;
}

// 标记数据存储结构
export interface StoredMarkingData {
    /** 表格ID到行标记的映射 */
    [tableId: string]: {
        /** 行ID到标记信息的映射 */
        [rowId: string]: RowMarking;
    };
}

// 导出格式类型
export type ExportFormat =
    | 'csv'         // CSV格式
    | 'html'        // HTML格式
    | 'markdown'    // Markdown格式
    | 'json'        // JSON格式
    | 'xml'         // XML格式
    | 'yml'         // YML格式
    | 'toml'        // TOML格式
    | 'sql'         // SQL格式
    | 'python'      // Python字典格式
    | 'text';       // 纯文本格式

// 导出元信息接口
export interface ExportMeta {
    /** 导出时间 */
    exportTime: string;
    /** 哈希识别码 */
    hash: string;
    /** 表格名称 */
    tableName: string;
    /** 总记录数 */
    totalCount: number;
    /** 导出格式 */
    format?: ExportFormat;
    /** 导出工具标识 */
    exportedBy?: string;
}

// 管理员控制状态接口
export interface AdminControlState {
    /** 是否禁用标记功能 */
    isMarkingDisabled: boolean;
    /** 是否禁用导出功能 */
    isOutputDisabled: boolean;
    /** 是否禁用高度调节 */
    isHeightAdjustDisabled: boolean;
    /** 是否禁用GOTO跳转 */
    isGotoJumpDisabled: boolean;
    /** 是否忽略宽度限制 */
    isWidthLimitIgnored: boolean;
    /** 管理员提示内容 */
    adminTooltipContent: string;
}

// 字段处理后的结构
export interface ProcessedField {
    /** 内部唯一标识 */
    key: string;
    /** 显示标题 */
    title: string;
    /** 计算后的宽度百分比 */
    width: string;
    /** 权重大小 */
    size: number;
}

// 处理后的字段结构
export interface ProcessedField {
    /** 内部唯一标识 */
    key: string;
    /** 显示标题 */
    title: string;
    /** Flex增长系数 */
    flexGrow: number;
    /** 权重大小 */
    size: number;
    /** 原始字段索引 */
    originalIndex: number;
    /** 是否置顶 */
    isPinned: boolean;
    /** 排序状态 */
    sortState: 'none' | 'asc' | 'desc';
}

// 字段置顶和排序状态
export interface FieldState {
    /** 置顶字段的索引 */
    pinnedFieldIndex: number | null;
    /** 排序字段的索引 */
    sortFieldIndex: number | null;
    /** 排序方向 */
    sortOrder: 'asc' | 'desc' | null;
}

// 字段状态存储结构
export interface StoredFieldState {
    /** 表格ID到字段状态的映射 */
    [tableId: string]: FieldState;
}

