## Css-in-js

在 5.0 版本的 Ant Design 中，提供了一套全新的定制主题方案。不同于 4.x 版本的 less 和 CSS 变量，有了 CSS-in-JS 的加持后，动态主题的能力也得到了加强，包括但不限于：

1. 支持动态切换主题；
2. 支持同时存在多个主题；
3. 支持针对某个/某些组件修改主题变量；
4. ...

Ant Design V5 [Token System](https://ant.design/docs/react/customize-theme-cn#theme) 构建的业务级 css-in-js 解决方案，底层基于 [emotion](https://emotion.sh/docs/introduction) 封装

**本项目中使用示例**

```tsx
import { useEmotionCss } from '@ant-design/use-emotion-css'

// 单一样式
const linkStyle = useEmotionCss(({ token }) => (
  {
    color: token.colorPrimaryText,
    '&:active': {
      color: token.colorPrimaryTextActive
    },
    '&:hover': {
      color: token.colorPrimaryTextHover
    }
  }
))
// 使用样式
<a className={linkStyle}></a>

// 样式集合
const styles = {
  header: useEmotionCss(({ token }) => ({})),
  content: useEmotionCss(({ token }) => ({})),
  footer: useEmotionCss(({ token }) => ({})),
}
// 使用样式
<div>
  <div className={styles.header}></div>
  <div className={styles.content}></div>
  <div className={styles.footer}></div>
</div>
```

## 样式校验

基于[stylelint](https://stylelint.io/)进行样式校验，支持校验 `.css` `.less`，结合[vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)插件在[vscode](https://code.visualstudio.com/)中实时对样式错误或警告进行提示

下述命令行可对所有样式文件（忽略的排除在外）进行校验并对错误及警告尝试修复

```sh
npm run stylelint
```

## 脚本校验

基于[eslint](https://eslint.org/)进行代码校验，结合[vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)插件在[vscode](https://code.visualstudio.com/)中实时对脚本错误或警告进行提示

下述命令行可对所有脚本（忽略的排除在外）进行校验并对错误及警告尝试修复

```sh
npm run lint
```

## 代码美化

基于[prettier](https://prettier.io/)进行代码美化，结合[prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)插件在[vscode](https://code.visualstudio.com/)中对文件进行保存时自动美化代码

下述命令行可对所有文件（忽略的排除在外）进行代码美化

```sh
npm run prettier
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

## 命名规范

- **组件文件名称** 采用 `UpperCamelCase` 命名法
- **目录名称** 采用 `kebab-case` 命名法
- **其他文件名称** 采用 `kebab-case` 命名法

## src 内目录说明

- **assets** 放置图片，样式等资源文件
- **components** 放置组件
  - **\_\_tests\_\_** 放置组件测试用例
- **hooks** 放置 hook 函数
- **i18n** 放置国际化配置项
- **router** 放置路由配置项
- **views** 放置视图页面

## 环境变量

[文档](https://create-react-app.dev/docs/adding-custom-environment-variables)

- **.env** 配置通用环境变量
- **.env.development** 配置开发环境环境变量
- **.env.production** 配置生产环境环境变量

## craco

- **craco.config.js** [craco](https://craco.js.org/docs/)配置文件

## 运行项目

```sh
npm start
```

## 运行测试用例

请参阅有关[running tests](https://facebook.github.io/create-react-app/docs/running-tests)的部分了解更多信息

```sh
npm test
```

## 打包项目

在 `build` 目录产生打包输出

```sh
npm run build
```

## 部署

请参阅有关[deployment](https://facebook.github.io/create-react-app/docs/deployment)的部分了解更多信息
