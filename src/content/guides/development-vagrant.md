---
title: 开发 - Vagrant
sort: 19
contributors:
  - SpaceK33z
  - chrisVillanueva
---

如果你在开发一个更高级的项目，并且使用 [Vagrant](https://www.vagrantup.com/) 来实现在虚拟机(Virtual Machine)上运行你的开发环境(development environment)，那么你或许需要在虚拟机上运行 webpack。

## 项目配置

首先，确保 `Vagrantfile` 拥有一个固定 IP。

```ruby
Vagrant.configure("2") do |config|
  config.vm.network :private_network, ip: "10.10.10.61"
end
```

接下来便是在项目中安装 webpack 和 webpack-dev-server。

```bash
npm install --save-dev webpack webpack-dev-server
```

确保已经设好配置文件 `webpack.config.js`。如果没有的话，下面的示例代码可以作为入门的简单配置：

```js
module.exports = {
  context: __dirname,
  entry: "./app.js"
};
```

然后创建一个 `index.html` 文件。其中的 `script` 标签应当指向你的 bundle。如果 `output.filename` 没有在配置里设定，它的默认值便是 `bundle.js`。

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="/bundle.js" charset="utf-8"></script>
  </head>
  <body>
    <h2>Heey!</h2>
  </body>
</html>
```

注意，你也需要创建一个 `app.js` 文件。

## 启动服务器

现在我们可以启动服务器了：

```bash
webpack-dev-server --host 0.0.0.0 --public 10.10.10.61:8080 --watch-poll
```

默认配置下，服务器只允许在它的本地访问。通过更改 `--host` 参数，便能够在我们的 PC 上访问它。

webpack-dev-server 会在 bundle 中加上一段连接 WebSocket 的脚本，一旦你的文件被更改，服务器便会重新加载应用。`--public` 参数便是为了告诉脚本从哪里去找 WebSocket。服务器默认使用 `8080` 端口，我们也需要在这里标明。

`--watch-poll` 确保 webpack 能够检测到文件的更改。默认配置下，webpack 会监听文件系统触发的相关事件，但是 VirtualBox 总会有这样或那样的问题。

现在服务器应该能够通过 `http://10.10.10.61:8080` 访问了。如果你改动了 `app.js`，应用便会重新加载。

## 配合 nginx 的高级用法

为了更好的模拟类生产环境(production-like environment)，还可以用 nginx 来代理 webpack-dev-server。

在你的 nginx 配置文件中，加入下面代码：

```nginx
server {
  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    error_page 502 @start-webpack-dev-server;
  }

  location @start-webpack-dev-server {
    default_type text/plain;
    return 502 "Please start the webpack-dev-server first.";
  }
}
```

`proxy_set_header` 这几行配置很重要，因为它们关系到 WebSocket 的正确运行。

上一节中启动 webpack-dev-server 的命令可改为：

```bash
webpack-dev-server --public 10.10.10.61 --watch-poll
```

现在服务器只能通过 `127.0.0.1` 访问，这点关系不大，因为 ngnix 能够使得你的 PC 能访问到服务器。

## 小结

我们能够从固定 IP 访问 Vagrant box，然后由于公开了 webpack-dev-server，使浏览器可以直接访问到它。最后解决了 VirtualBox 不派发文件系统事件的常见问题，此问题会导致服务器不重新加载文件更改。

***

> 原文：https://webpack.js.org/guides/development-vagrant/
