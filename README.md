# 生成 webview 页面专用

* 考虑到需要用到图表，为了更方便地获取 图表(echarts) 的 api, 使用 typescript 开发

* 最外层路由通过 `src/route.json` 书写

```
{
  "index": "/index",
  "test": "/test",
  "test/g": "/test/g",
  "g": "/test/g" 可以这样写，但是不推荐，这样路由和目录不匹配，容易造成混乱
}
```

* 理论上每一个外层路由的页面可以用任何框架方案开发

# 扩展性

* 此项目理论上可以承接任何 app 的 webview 页面，即需要单独页面的地方都可以用此项目做
