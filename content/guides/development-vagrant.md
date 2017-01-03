---
title: 开发 - Vagrant
sort: 12
contributors:
  - SpaceK33z
  - xie-qianyue
---

如果你在开发一个更大的项目，并且开发环境是在虚拟机上运行 [Vagrant](https://www.vagrantup.com/) 的话，那么你或许需要在虚拟机上运行 webpack。

## 项目配置

首先，确保 `Vagrantfile` 拥有一个固定 IP。

```ruby
Vagrant.configure("2") do |config|
  config.vm.network :private_network, ip: "10.10.10.61"
end
```

接下来便是安装 webpack 和 webpack-dev-server。

```bash
npm install webpack webpack-dev-server --save-dev
```

确保已经设好配置文件 `webpack.config.js`。如果没有的话，下面的示例代码可以作为入门的简单配置：

```js
module.exports = {
  context: __dirname,
  entry: "./app.js"
};
```

然后创建 `index.html`。其中的 `script` 标签应当指向你的打包文件(bundle)。如果 `output.filename` 没有在配置里设定，它的默认值便是 `bundle.js`。 

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

默认配置下，服务器只允许在本地访问。通过更改 `--host` 参数，便能够在我们的 PC 上访问它。

webpack-dev-server 会在打包文件中加上一段连接 WebSocket 的脚本(script)，一旦你的文件被更改，服务器便会重新加载应用。`--public` 参数便是为了告诉脚本从哪里去找 WebSocket。服务器默认使用 `8080` 端口，我们也需要在这里标明。

`--watch-poll` 确保 webpack 能够察觉到文件的更改。默认配置下，webpack 会监听文件系统触发的相关事件，但是 VirtualBox 总会有这样或那样的的问题。 

现在服务器应该能够通过 `http://10.10.10.61:8080` 访问了。如果你改动了 `app.js`，应用便会重新加载。

## 使用 nginx

如果你需要更进一步模仿生产环境，可以使用 nginx 来代理 webpack-dev-server。

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

`proxy_set_header` 这几行配置很重要，因为它们关系 WebSocket 的正确运行。

上一节中启动 webpack-dev-server 的命令可改为：

```bash
webpack-dev-server --public 10.10.10.61 --watch-poll
```

现在服务器只能通过 `127.0.0.1` 访问，这点关系不大，ngnix 无需额外配置，你便能够从你的 PC 访问到服务器。

## 小结

我们使 Vagrant box 能够被固定 IP 访问。然后开放 webpack-dev-server，让我们通过浏览器便能访问它。最后解决了 VirtualBox 文件系统的事件触发问题，让服务器在文件更改后能够重新加载。

***

> 原文：https://webpack.js.org/guides/development-vagrant/