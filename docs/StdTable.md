# StdTable

`2025-09-26@WaterRun`

![一个StdTable示例](./assets/StdTable示例图.png)
*一个StdTable示例*  

## 概述

`PageHeader`是一个通用的表格,封装了多种功能,包括导出,可调高度,标记等.  

## 样式与交互

从上到下,依次分为三个区域:  

### 表头域

![一个StdTable表头域示例](./assets/StdTable表头域示例.png)  
*一个StdTable表头域示例*  

表头域位于表的最顶上,从做到右依次是:  

- 表标题  
- 表信息.悬浮可查看(可选,该项值为空时不显示图标)  
- 扩展功能组,悬浮可展开功能选单.包含标记和导出功能  
- 表高调节功能组,包括表高调节按钮和调节滑动条  

![一个StdTable导出浮窗示例](./assets/StdTable导出浮窗.png)  
*StdTable内置了导出功能.可以导出为多种类型,当鼠标悬浮到对应扩展功能组图标上时展开,点击对应项执行导出*  

> 导出功能收到浏览器引擎约束,导出数据量过大的表时导出内容会提示相应错误  

> 包括可导出一个带交互的独立HTML网页  

![一个StdTable表高调节浮窗示例](./assets/StdTable表高调节浮窗.png)
*一个StdTable表高调节浮窗示例.当鼠标悬浮到对应扩展功能组图标上时展开*

调节表高可以通过拖动滑条,或修改输入框内的值(带内置按钮)实现,都是实时响应的.  
滑条设置5,10,15,30,75五个挡位.输入框则没有这些限制.表高调节的范围是5-75条/页.滑条底部提示中央为当前设置表高.当当前表高不再这些值之一时,会显示对应橙色提示(如图所示).  

### 数据域

![一个StdTable数据域示例](./assets/StdTable数据域示例.png)
*一个StdTable数据域示例*  

数据域是表的核心部分: 表头字段和数据字段.  
表头字段居中显示,宽度是可自定义配置的,并会根据缩放响应.  
数据字段居左显示,和顶上的表头字段对齐.在数据字段右键可以将数据标记删除线,双击可标记高亮.  
![高亮删除线,以及展开的标记功能组件](./assets/一个带标记的StdTable.png)  
*高亮删除线,以及展开的标记功能组件*  

数据是保存在设备本机上的,只要不清除缓存,下次加载页面时仍能加载.不过,要持久化数据,还是选择导出为Python模块.导出的`.py`代码中有使用示例.  

在表的最后一页,会用占位数据填充缺失内容.  
![占位数据,高亮和删除线](./assets/StdTable占位数据和高亮与删除线.png)
*占位数据,高亮和删除线*  

### 控件域

![一个StdTable控件域示例](./assets/StdTable控件域示例.png)  
*一个StdTable控件域示例*  

表的底部是控件域.从左到右依次是状态指示器,辅助信息和GOTO跳转控件.  
状态指示器位于表的最左侧,指示当前组件的工作状态: 加载,就绪,警告,和错误.包括一个呼吸灯,状态文本,以及页数指示文本.  

控件域的正中央是辅助信息,鼠标悬浮可以显示对应内容.包括管理员配置信息,使用指引,和组件信息.  
![展开辅助信息](./assets/StdTable控件域信息.png)  
*一个展开的辅助信息*  

控件域的右侧是GOTO跳转按钮.可以点击按钮跳到首末页,或上下页.中央的输入框可以调整具体页面,并点击GOTO调整按钮或摁下回车(需要保证`key.enter`不被覆盖)进行跳转.最右侧是控件信息.  

![跳转按钮: 在最终页](./assets/StdTable无法跳转.png)  
*一个在最终页的跳转按钮*  

交互均有响应式设计,对应当前的表的状态.  

### 管理员配置

管理员可以配置表的功能.例如,修改前端过窄的响应级别乃至整个禁用,设置预定表高,或停用某些子组件.  

![禁用功能的空表](./assets/StdTable被管理员禁用功能的空表.png)  
*一个被管理员禁用了功能的空表*  

例如,当要保证表格以固定高度显示时,就可以配置预设表高,并禁用表高调节.或者,当表的内容过大导出会出错时,可以禁用导出功能.  

## 表的状态

### 加载状态

当表尝试加载数据时,表就处于加载状态.  
此时,状态指示灯闪烁,提示加载.数据段为呼吸状的加载图标:  

![加载中的表格](./assets/StdTable加载示例.png)  
*一个加载中的表格*  

每次换页,调整表高都会重新进行加载.  

### 就绪状态

当表加载完毕,且没有异常情况时,就处于就绪状态.  
就绪态不代表表中就有数据,例如加载完毕的空表也是就绪态.  

### 警告和错误

当表的运行出现故障时,便会进入警告和错误.  
![空表头的表格](./assets/StdTable无表头示例.png)  
*一个构建时表头字段为空的表格*  

例如,以上就是一个由空的表头字段构造的表格.此时,状态指示灯为橙色,显示警告.  

### 特别: 前端过窄

![前端过窄示例](./assets/StdTable前端过窄.png)  
*StdTable前端过窄*  

当识别到表的宽度不足时,表会自动进入前端过窄显示,覆盖整个表,提示用户,避免造成内容显示错误.  
管理员可配置倍率来调整响应的敏感度: 倍率越大,越敏感.也可以禁用到这整个功能.  

## API参考

```typescript
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
}
```

## `.tpl`中的调用示例

<HTML>中的挂载点:

```php
    <!-- Vue StdTable组件挂载点 -->
    <div id="std-table-app">
        <div style="padding: 40px; text-align: center; color: #6c757d;">
            <div>Vue StdTable组件将在此处渲染</div>
        </div>
    </div>
```

调用示例:  

```php
    window.stdTableConfig = {
        tableName: '日库存明细表',
        fields: [
            {title: '数量',},
            {title: '条码',},
            {title: '品牌',},
        ],
        dataUrl: window.location.pathname + '?route=caiwu/daily_inventory_detail/getTableData&token=' + window.pageConfig.token,
        disableOutput: true,
    };
```
