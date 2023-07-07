<p align="center">
  <a href="https://lb1129.github.io/l-admin-react">
    <img width="100" src="https://github.com/lb1129/l-admin-react/blob/master/src/assets/image/logo.svg">
  </a>
</p>

<h1 align="center">L-ADMIN-REACT</h1>

<p align="center">一个基于 Antd 中后台前端解决方案，提供通用性封装及规范，让开发者更加专注于业务</p>

<p align="center">
  <a href="https://github.com/facebook/react">
    <img src="https://img.shields.io/badge/react-18.2.0-brightgreen.svg" alt="react">
  </a>
  <a href="https://github.com/ant-design/ant-design">
    <img src="https://img.shields.io/badge/antd-5.5.2-brightgreen.svg" alt="antd">
  </a>
  <a href="https://github.com/lb1129/l-admin-react/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
</p>

## 介绍

`l-admin-react` 是 `l-admin` 基于 [react18](https://github.com/facebook/react) 和 [antd-design](https://github.com/ant-design/ant-design) 的实现

## 特性

- 在线主题色切换
- 在线多语言切换
- 懒加载
- 基础路由
- 动态路由（用户有多少菜单，则挂多少路由）
- 登录跳转控制
- 操作权限控制
- ~~路由动画~~
- 路由组件 keep-alive
- 按模块拆分 server，各模块中复用
- Css-in-js
- TSX
- Typescript

关于路由动画（根据前进后退自动切换动画），由于浏览器的限制，popstate | hashchange 事件仅能知悉历史记录有变化，无法知悉用户到底点击了浏览器的前进还是后退按钮；已处理过的方案：url 上携带 query 唯一标识（支持 hisotry 模式或 hash 模式），在内存中维护一份路由历史，在路由跳转时（结合路由库 vue-router@4.2.0的 beforeEach, react-router@6.11.2的 subscribe, @angular/router@16.1.0的 RouteReuseStrategy），去路由历史中查找是否存在该 url，如果有为后退操作，如果没有为前进操作并加入路由历史并在 sessionStorage 中存一份，在浏览器刷新时还原路由历史；该方案缺点：url 上会携带额外 query

## 在线预览

[预览](https://lb1129.github.io/l-admin-react/)

## 开始使用

```sh
# 克隆项目
git clone https://github.com/lb1129/l-admin-react.git

# 进入项目目录
cd l-admin-react

# 安装依赖
npm install

# 启动服务
npm run start
```

浏览器访问 http://localhost:3000

## 发布

```sh
# 构建生产环境
npm run build
```

## 其他指令

```sh
# 代码格式美化
npm run format

# 代码检查并自动修复
npm run lint

# 运行测试用例
npm run test
```

## 权限控制流程

[详细文档](./PermissionFlow.md)

## Css-in-js

- Ant Design V5 [Token System](https://ant.design/docs/react/customize-theme-cn#theme)
- [emotion](https://emotion.sh/docs/introduction)

**直接在 FC 内使用**

```tsx
import { useEmotionCss } from '@/utils/useEmotionCss'

const Component: React.FC = () => {
  const wrapClassName = useEmotionCss(() => ({
    width: '100%',
    height: '100%'
  }))

  const textClassName = useEmotionCss(({ token }) => ({
    fontSize: 16,
    '&:hover': {
      // 将跟随主题色切换
      color: token.colorPrimary
    }
  }))

  return (
    <div className={wrapClassName}>
      <span className={textClassName}></span>
    </div>
  )
}

export default Component
```

**抽离样式文件**

```ts
// Component.style.ts
import { useEmotionCss } from '@/utils/useEmotionCss'

export default function useStyles() {
  return {
    wrap: useEmotionCss(() => ({
      width: '100%',
      height: '100%'
    })),
    text: useEmotionCss(() => ({
      fontSize: 16,
      '&:hover': {
        // 将跟随主题色切换
        color: token.colorPrimary
      }
    }))
  }
}
```

```tsx
// Component.tsx
import useStyles from './Component.style.ts'

const Component: React.FC = () => {
  const styles = useStyles()

  return (
    <div className={styles.wrap}>
      <span className={styles.text}></span>
    </div>
  )
}

export default Component
```

**全局样式**

```tsx
// 直接在 FC 内使用
import { useEmotionGlobalCss } from '@/utils/useEmotionCss'

const Component: React.FC = () => {
  useEmotionGlobalCss(({ token }) => ({
    '.global': {
      // 将跟随主题色切换
      color: token.colorPrimary
    },
    '#root': {}
    // ...其他全局选择器
  }))

  return <div className="global"></div>
}
```

```tsx
// 抽离样式文件
// style.global.ts
import { useEmotionGlobalCss } from '@/utils/useEmotionCss'

export default function useGlobalStyles() {
  useEmotionGlobalCss(({ token }) => ({
    '.global': {
      // 将跟随主题色切换
      color: token.colorPrimary
    },
    '#root': {}
    // ...其他全局选择器
  }))
}

// Component.tsx
import useGlobalStyles from './style.global.ts'
const Component: React.FC = () => {
  useGlobalStyles()
  return <div className="global"></div>
}
```

```ts
// 直接使用 injectGlobal 不支持跟随主题色切换
import { injectGlobal } from '@emotion/css'

injectGlobal({
  '.global': {
    color: '#1890ff'
  }
})
```

## TodoTree

基于[vscode](https://code.visualstudio.com/)插件[todo-tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)

```sh
// BUG ...
// FIXME ...
// TODO ...
// HACK ...
// XXX ...
// TAG ...
// DONE ...
// NOTE ...
// INFO ...
```

## Git Commit Message 规范

Commit Message 包括 `type`、`scope`、`subject` 三部分，其中 `type`、`subject` 是必须的，而 `scope` 是可选的。

```sh
<type>(<scope>): <subject>
```

**type** 用于说明 commit 的类型，只允许使用下面几个标识：

- **feat** 新功能
- **fix** 修复 bug
- **docs** 仅包含文档的修改
- **style** 格式化变动，不影响代码逻辑。比如删除多余的空白，删除分号等
- **refactor** 重构，既不是新增功能，也不是修改 bug 的代码变动
- **perf** 性能优化
- **test** 增加测试
- **build** 构建工具或外部依赖包的修改，比如更新依赖包的版本等
- **ci** 持续集成的配置文件或脚本的修改
- **chore** 杂项，其他不修改源代码与测试代码的修改
- **revert** 撤销某次提交

## 环境变量

[文档](https://create-react-app.dev/docs/adding-custom-environment-variables)

- **.env** 基础环境
- **.env.development** 开发环境
- **.env.production** 生产环境
- **.env.github-pages** github-pages 环境

## craco

- **craco.config.js** [craco](https://craco.js.org/docs/)配置文件

## License

[MIT](https://github.com/lb1129/l-admin-react/blob/master/LICENSE)
