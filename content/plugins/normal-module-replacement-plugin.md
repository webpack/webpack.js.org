---
title: NormalModuleReplacementPlugin
contributors:
  - gonzoyumo
---
## 安装

 `NormalModuleReplacementPlugin` 是webpack的一个内置插件.


## 使用

``` javascript
new webpack.NormalModuleReplacementPlugin(resourceRegExp, newResource)
```

`NormalModuleReplacementPlugin` 允许你用 `newResource` 替换与 `resourceRegExp` 匹配的资源。如果 `newResource` 是相对路径，它会相对于先前的资源被解析。如果 `newResource` 是函数，它将会覆盖之前被提供资源的请求。

这对于允许在构建中的不同行为是有用的。

## 基本示例

在构建[开发环境](/guides/production-build)时替换特定的模块 。


假设你有一个配置文件 `some/path/config.development.module.js` 并且在生产环境有一个特殊的版本 `some/path/config.production.module.js`

只需在生产构建时添加以下插件：

``` javascript
new webpack.NormalModuleReplacementPlugin(
  /some\/path\/config\.development\.js/,
  './config.production.js'
);
```

## 高级示例

根据[指定环境](/configuration/configuration-types)的条件构建。

假设你想要一个为了不同构建目标的特定值的配置。

``` javascript
module.exports = function(env) {
  var appTarget = env.APP_TARGET || 'VERSION_A';
  return {
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/(.*)-APP_TARGET(\.*)/, function(resource) {
        resource.request = resource.request.replace(/-APP_TARGET/, `-${appTarget}`);
      })
    ]
  }
  
}
```

创建两个配置文件：

**app/config-VERSION_A.js:**
``` javascript
export default {
  title : 'I am version A'
}
```
**app/config-VERSION_B.js:**
``` javascript
export default {
  title : 'I am version B'
}
```
然后使用在正则中查找的关键字来引入配置：

``` javascript
import config from 'app/config-APP_TARGET';
console.log(config.title);
```

根据你的构建目标，现在你引入了正确的配置。

``` shell
webpack --env.APP_TARGET VERSION_A
=> 'I am version A'

webpack --env.APP_TARGET VERSION_B
=> 'I am version B'

```
