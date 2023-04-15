# 微小bug

## NodeJS项目

### npm install 安装注意

- 全局安装 加  `-g` ，**通常安装的是工具包，仅开发使用，例如CLI脚手架等...**

  *把依赖装全局就无法在**远端运行**了，因为`package.json`文件中没有完整的依赖条目*

- 仅项目安装 `--save`，**直接写入package.json文件**

- 还有一种 `-D`，这种其实是 `--save-dev` 的缩写，**意思就是写入package.json但是仅在开发版本中使用。**（例如生成***静态***页面，在运行时是***不需要***这些依赖的）

### nrm镜像源控制工具bug

编译问题，将 `cli` 文件中第9行的 `require` 换成 `import` 即可，是版本冲突问题，更新后还要**手动改**。

### npm 运行程序 报错

通常是升级 `npm` 后，版本冲突导致

```bash
code: 'ERR_OSSL_EVP_UNSUPPORTED'
```

**最佳方法：**

环境变量中加一个 `NODE_OPTIONS` ，内容是 `--openssl-legacy-provider`。否则就是**每次都要输入**，还不一定能有效

<img src="https://md-pic-1300959784.cos.ap-nanjing.myqcloud.com/img/202304151640542.png" alt="image-20230415150248181" style="zoom: 67%;" />

## Github使用

### 添加gitignore文件

- 对于 `hexo` 博客，我们可以不用自己添加 `.gitignore` 文件，

  因为 `hexo` 框架是 **自带 `.gitignore` 的**（可能是从 `github` 中 `clone` 来的）

- 对于 `vuePress` 这种**纯净**的 `nodejs` 项目，需要手动添加 `.gitignore` 文件，不然会上传**一大堆**的 `node_modules` 等**无用文件**。

  
