# Vue PageHeader 组件文档

## 组件简介

PageHeader 是一个标准化的页面标题栏组件，专为老式 OpenCart 页面集成而设计。该组件提供统一的页面标题显示、可选的副标题和折叠式帮助信息功能，具有现代化的 Material Design 风格界面和响应式布局。

**主要特性：**
- 标准化的页面标题显示
- 可选的副标题支持
- 可折叠的帮助信息面板
- Material Design 风格图标
- 响应式布局，适配移动设备
- 平滑的展开/收起动画效果
- 与 OpenCart 页面无缝集成

## API 说明

### 全局配置对象

组件通过全局 `window.pageConfig` 对象获取配置信息：

```typescript
interface PageConfig {
  /** 页面标题 - 必需 */
  title: string;
  /** 页面副标题 - 可选 */
  subtitle?: string;
  /** 帮助内容HTML - 可选 */
  helpContent?: string;
  /** 认证令牌 - 可选 */
  token?: string;
}
```

### 组件属性说明

| 属性名 | 类型 | 必需 | 默认值 | 描述 |
|--------|------|------|--------|------|
| title | string | 是 | - | 页面主标题 |
| subtitle | string | 否 | - | 页面副标题 |
| helpContent | string | 否 | - | 帮助内容，支持HTML格式 |

### 内部状态

- `isHelpVisible`: 控制帮助面板的显示/隐藏状态
- `config`: 从 `window.pageConfig` 读取的配置对象

### 计算属性

- `displayTitle`: 显示的标题文本
- `hasHelpContent`: 是否有帮助内容
- `hasSubtitle`: 是否有副标题

### 方法

- `toggleHelp()`: 切换帮助面板的显示状态

## 前端调用示例

### 1. HTML 页面结构

在 OpenCart 页面中添加挂载点：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>页面标题示例</title>
</head>
<body>
    <!-- Vue PageHeader 组件挂载点 -->
    <div id="page-header-app">
        <!-- 组件加载时的占位内容 -->
        <div style="padding: 20px; text-align: center; color: #999;">
            <div>页面标题组件加载中...</div>
        </div>
    </div>

    <!-- 页面其他内容 -->
    <div class="page-content">
        <!-- OpenCart 原有内容 -->
    </div>

    <!-- 引入组件脚本 -->
    <script src="path/to/page-header.js"></script>
</body>
</html>
```

### 2. 基础配置示例

```javascript
// 在页面脚本中设置配置
window.pageConfig = {
    title: "商品管理",
    subtitle: "管理店铺中的所有商品信息"
};
```

### 3. 带帮助内容的完整配置

```javascript
window.pageConfig = {
    title: "订单管理系统",
    subtitle: "查看和管理客户订单信息",
    helpContent: `
        <h3>功能说明</h3>
        <p>本页面用于管理客户订单，您可以：</p>
        <ul>
            <li><strong>查看订单：</strong>浏览所有订单的详细信息</li>
            <li><strong>更新状态：</strong>修改订单的处理状态</li>
            <li><strong>打印发票：</strong>生成订单发票文档</li>
            <li><strong>退款处理：</strong>处理客户退款申请</li>
        </ul>
        <h4>操作提示</h4>
        <p>点击订单号可以查看详细信息，使用筛选功能可以快速找到特定订单。</p>
    `,
    token: "user_auth_token_here"
};
```

### 4. PHP 后端集成示例

```php
<?php
// 在 OpenCart 控制器中
class ControllerManageProducts extends Controller {
    public function index() {
        // 页面数据准备
        $data['page_config'] = [
            'title' => $this->language->get('heading_title'),
            'subtitle' => '管理店铺商品信息和库存',
            'helpContent' => $this->getHelpContent(),
            'token' => $this->session->data['user_token']
        ];
        
        $this->response->setOutput($this->load->view('manage/products', $data));
    }
    
    private function getHelpContent() {
        return '
            <h3>商品管理帮助</h3>
            <p>在这个页面您可以：</p>
            <ul>
                <li>添加新商品</li>
                <li>编辑现有商品信息</li>
                <li>管理商品分类</li>
                <li>设置商品价格和库存</li>
            </ul>
        ';
    }
}
?>
```

### 5. 模板文件中的使用

```twig
{# 在 Twig 模板中 #}
<script>
    // 设置页面配置
    window.pageConfig = {
        title: "{{ heading_title|escape('js') }}",
        subtitle: "{{ page_subtitle|default('')|escape('js') }}",
        helpContent: `{{ help_content|default('')|raw }}`,
        token: "{{ user_token|default('')|escape('js') }}"
    };
</script>

<!-- 组件挂载点 -->
<div id="page-header-app"></div>
```

### 6. 动态更新配置

```javascript
// 运行时动态更新配置
function updatePageTitle(newTitle, newSubtitle) {
    window.pageConfig = {
        ...window.pageConfig,
        title: newTitle,
        subtitle: newSubtitle
    };
    
    // 如果组件已经挂载，可以通过实例更新
    if (window.vueInstance) {
        window.vueInstance.$forceUpdate();
    }
}

// 使用示例
updatePageTitle("新的页面标题", "更新后的副标题");
```

### 7. 错误处理和降级方案

组件内置了错误处理机制，当 Vue 应用加载失败时会自动显示降级的 HTML 标题：

```javascript
// 组件会自动检测加载失败并显示备用标题
// 无需额外配置，但可以通过以下方式自定义错误处理
window.addEventListener('error', function(event) {
    if (event.target && event.target.src && event.target.src.includes('page-header')) {
        console.log('PageHeader 组件资源加载失败');
        // 自定义错误处理逻辑
    }
});
```

### 8. CSS 样式自定义

组件支持通过 CSS 变量进行样式自定义：

```css
/* 自定义组件样式 */
#page-header-app {
    --header-bg-color: #ffffff;
    --header-text-color: #1a1a1a;
    --header-border-color: #f0f0f0;
    --help-bg-color: #fafafa;
}

/* 覆盖特定样式 */
.md-page-header {
    margin-bottom: 32px;
}
```

这样的设计使得 PageHeader 组件能够无缝集成到现有的 OpenCart 系统中，提供统一的用户界面体验。