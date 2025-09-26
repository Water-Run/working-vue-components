# PageHeader

`2025-09-26@WaterRun`

![一个PageHeader示例](./assets/PageHeader示例图.png)
*一个PageHeader示例*  

## 概述

`PageHeader`是设计用来放在页面的开头部分,表明页面的基本信息.  

包含:  

- 页面标题: 页面的名称,显示在组件的左上方  
- 副标题`可选`: 页面的副标题,显示在页面标题的下方.当值为空时,不显示  
- 帮助信息`可选`: 页面的详细描述,点击右侧图标向下展开显示.帮助信息可以写标准的HTML.当值为空时,不显示此图标   

`PageHeader`的高度固定,宽度跨越整个页面(保留左右边距).  

![一个展开的PageHeader](./assets/展开的PageHeader.png)  
*一个展开的PageHeader示例*

## API参考

```typescript
export interface PageHeaderProps {
    /** 页面标题 */
    title: string;
    /** 页面次标题 */
    subtitle?: string;
    /** 帮助内容*/
    helpContent?: string; // 可以写HTML
}
```

## `.tpl`中的调用示例

<HTML>中的挂载点:

```php
    <!-- Vue PageHeader组件挂载点 -->
    <div id="page-header-app">
        <div class="loading-placeholder">
            正在加载页面标题...
        </div>
    </div>
```

调用示例:  

```php
    window.pageConfig = {
        title: "标题",
        subtitle: "副标题, 可选",
        helpContent: "帮助信息,可以写HTML,能够正确解析,可选",
    }
```
