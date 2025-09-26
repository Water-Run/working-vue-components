# 班上的一些Vue组件

班上的搓的一些通用的Vue组件,减少以后的工作量.  
项目使用`pnpm`构建.`node_modules`没有上传到Git中.在项目目录下运行:  

```powershell
pnpm build
```

构建组件.  

构建前,**记得修改`vite.config.ts`**的输出目录:  

```typescript
    build: {
    outDir: '../admin/Lib/vueapp', // 改成你的输出路径
        emptyOutDir: true,
        cssCodeSplit: true,
        assetsInlineLimit: 1024 * 1024 * 10,
        rollupOptions: {
        input: inputConfig,
            output: {
            entryFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
                manualChunks: undefined,
        },
    },
    minify: 'esbuild',
        assetsDir: 'assets',
},
```

和资源路径映射:  

```typescript
    resolve: {
    alias: {
        '@': resolve(__dirname, 'src'), // 修改这些映射路径的内容.提供在assets_sync中(尽量)  
            '@image': resolve(__dirname, '../image'),
            '@material-icons': resolve(__dirname, '../image/material-icons'), 
    },
},
```

在`docs/`下有对应组件的文档,使用前先阅读.  

设计风格基本采用谷歌的MaterialDesign.  

组件是用于一个老旧的,基于PHP5.3的OpenCart时期打造的内部后端平台.(Vue不是说它"渐进式"么 :)  
因此,  

- 图片均采用内联形式  

导入组件的用法都是,在`.tpl`(对于没见过的: 实质上就是`.php`,上古PHP用的比较多,MVC中的"V"),<html>部分挂载挂载点:  

```php
    <!-- Vue StdTable组件挂载点 -->
    <div id="std-table-app">
        <div style="padding: 40px; text-align: center; color: #6c757d;">
            <div>Vue StdTable组件将在此处渲染</div>
        </div>
    </div>
```

导入对应的编译后的`.css`和`.js`:  

```php
<link rel="stylesheet" href="<?php echo $vue_app_path; ?>std-table.css" /> # 我配置了$vue_app_path全局变量,对应导出的路径
<script type="module" src="<?php echo $vue_app_path; ?>std-table.js"></script>
```

并在<script>部分配置参数:  

```php
    window.stdTableConfig = {
        tableName: '日库存明细表',
        fields: [
            {title: '数量',},
            {title: '条码',},
            {title: '品牌',},
        ],
        dataUrl: window.location.pathname + '?route=caiwu/daily_inventory_detail/getTableData&token=' + window.pageConfig.token,
    };
```

即可使用.  

考虑到实际的使用需求,这些组件基本都是较"大"的组件(也就是一个页面基本只用一个).组件大致程度上的水平也就是尽量做到比*"能跑就行"*稍微完善一点...不过如果觉得有用的上的话,不妨点个Star了.  

***不定期更新***  


> 高度依赖Claude 4 :-/  
