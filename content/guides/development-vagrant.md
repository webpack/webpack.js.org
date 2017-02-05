---
title: Development - Vagrant
sort: 51
contributors:
  - SpaceK33z
  - chrisVillanueva
---

If you have a more advanced project and use [Vagrant](https://www.vagrantup.com/) to run your development environment in a Virtual Machine, you'll often want to also run webpack in the VM.

## Configuring the Project

To start, make sure that the `Vagrantfile` has a static IP;

```ruby
Vagrant.configure("2") do |config|
  config.vm.network :private_network, ip: "10.10.10.61"
end
```

Next, install webpack and webpack-dev-server in your project;

```bash
npm install webpack webpack-dev-server --save-dev
```

Make sure to have a `webpack.config.js` file. If you haven't already, use this as a minimal example to get started:

```js
module.exports = {
  context: __dirname,
  entry: "./app.js"
};
```

And create a `index.html` file. The script tag should point to your bundle. If `output.filename` is not specified in the config, this will be `bundle.js`.

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

Note that you also need to create an `app.js` file.

## Running the Server

Now, let's run the server:

```bash
webpack-dev-server --host 0.0.0.0 --public 10.10.10.61:8080 --watch-poll
```

By default the server will only be accessible from localhost. We'll be accessing it from our host PC, so we need to change `--host` to allow this.

webpack-dev-server will include a script in your bundle that connects to a WebSocket to reload when a change in any of your files occurs.
The `--public` flag makes sure the script knows where to look for the WebSocket. The server will use port `8080` by default, so we should also specify that here.

`--watch-poll` makes sure that webpack can detect changes in your files. By default webpack listens to events triggered by the filesystem, but VirtualBox has many problems with this.

The server should be accessible on `http://10.10.10.61:8080` now. If you make a change in `app.js`, it should live reload.

## Advanced Usage with nginx

To mimic a more production-like environment, it is also possible to proxy the webpack-dev-server with nginx.

In your nginx config file, add the following:

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

The `proxy_set_header` lines are important, because they allow the WebSockets to work correctly.

The command to start webpack-dev-server can then be changed to this:

```bash
webpack-dev-server --public 10.10.10.61 --watch-poll
```

This makes the server only accessible on `127.0.0.1`, which is fine, because nginx takes care of making it available on your host PC.

## Conclusion

We made the Vagrant box accessible from a static IP, and then made webpack-dev-server publicly accessible so it is reachable from a browser. We then tackled a common problem that VirtualBox doesn't send out filesystem events, causing the server to not reload on file changes.
