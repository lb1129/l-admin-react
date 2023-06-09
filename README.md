<p align="center">
  <a href="https://github.com/facebook/react">
    <img src="https://img.shields.io/badge/react-18.2.0-brightgreen.svg" alt="react">
  </a>
  <a href="https://github.com/ant-design/ant-design">
    <img src="https://img.shields.io/badge/antd-5.5.2-brightgreen.svg" alt="antd">
  </a>
  <a href="https://github.com/lb1129/XX-CRM-React/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
</p>

## 介绍

XX-CRM-React 是一个后台前端解决方案，它基于 [react](https://github.com/facebook/react) 和 [antd-design](https://github.com/ant-design/ant-design) 实现。它使用了最新的前端技术栈，采用 cssinjs 编写样式，支持在线主题色切换，支持在线多语言切换，支持动态路由，动态菜单，菜单权限控制，操作权限控制

## 在线示例

[预览](https://lb1129.github.io/XX-CRM-React/)

## 开始使用

```sh
# 克隆项目
git clone https://github.com/lb1129/XX-CRM-React.git

# 进入项目目录
cd XX-CRM-React

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
npm run prettier

# 代码检查并自动修复
npm run lint

# 运行测试用例
npm run test
```

## 权限控制流程

[文档](https://github.com/lb1129/XX-CRM-React/edit/master/PermissionFlow.md)

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

- **.env** 配置通用环境变量
- **.env.development** 配置开发环境环境变量
- **.env.production** 配置生产环境环境变量

## craco

- **craco.config.js** [craco](https://craco.js.org/docs/)配置文件

## License

[MIT](https://github.com/lb1129/XX-CRM-React/blob/master/LICENSE)
