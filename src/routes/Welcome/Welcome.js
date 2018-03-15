import React from 'react';
import { Button, Grid, Header, List, Segment } from 'semantic-ui-react';

import { CustomMessage, Navbar } from 'components';

const Welcome = () => {
  return (
    <Segment>
      <Header as="h1">你的测试应用</Header>
      <Grid>
        <Grid.Column computer={6} mobile={16}>
          <p>
            欢迎来到Semantic UI React应用! It is awesome{' '}
            <span aria-label="emoji" role="img">
              😉
            </span>
          </p>

          <p>
            此模板使用现代的开发环境，来展示SUI的特性。她基于超棒的{' '}
            <a
              href="https://github.com/facebookincubator/create-react-app"
              rel="noopener noreferrer"
              target="_blank"
            >
              Create React App package
            </a>{' '}
            ，以及一些附加内容。
          </p>

          <Header as="h4">React Hot Loader</Header>
          <p>
            <a
              href="https://github.com/gaearon/react-hot-loader"
              rel="noopener noreferrer"
              target="_blank"
            >
              React Hot Loader
            </a>{' '}
            更加稳定，我们可以安全的使用，她主要提高了我们的开发速度。
          </p>

          <Header as="h4">LESS loader</Header>
          <p>
            Semantic UI基于LESS，所以启用了她强大的主题功能。我们也启用了{' '}
            <a
              href="https://github.com/css-modules/css-modules"
              rel="noopener noreferrer"
              target="_blank"
            >
              CSS modules
            </a>{' '}
            ，对于你的组件。
          </p>

          <Header as="h4">Bundle analyzer and direct imports</Header>
          <p>
            Semantic UI React非常强大, 但是大多数情况你不需要它所有的模块。实际上，不使用的模块应该通过{' '}
            <a
              href="https://webpack.js.org/guides/tree-shaking/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Tree Shaking
            </a>
            移除, 但是现在的情况不允许依赖于它。使用者直接import所需的SUIR组件, 但是我们不建议这种方法，
            因为模块的路径可能会被修改。我们添加了{' '}
            <a
              href="https://www.npmjs.com/package/babel-plugin-direct-import"
              rel="noopener noreferrer"
              target="_blank"
            >
              direct-import
            </a>{' '}
            插件，以便于自动转换为直接导入。
          </p>
          <p>
            We also added bundle analyzer, so you can always review the size of
            your bundles.
          </p>
        </Grid.Column>
        <Grid.Column computer={10} mobile={16}>
          <Header as="h3">
            主题化 <code>按钮</code>
          </Header>
          <p>
            Semantic UI React does not have own theming and fully relies on CSS
            part of Semantic UI. It is normal, Semantic UI theming is very
            powerful, it allows you fully modify the look of your app using
            theming variables.
          </p>
          <p>
            We changed the <code>primary</code> color of <code>Button</code>{' '}
            component, it is really easy
            <span aria-label="emoji" role="img">
              😁
            </span>{' '}
            Take a look to{' '}
            <code>/src/styling/theme/elements/button.variables</code>. By the
            way, the <code>theme</code> directory structure fully matches the
            component structure of Semantic UI React.
          </p>
          <Button primary>Primary 按钮</Button>
          <Button
            href="https://semantic-ui.com/usage/theming.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            了解更多
          </Button>

          <Header as="h3">Custom themed component</Header>
          <p>
            In the real world you will always need custom components, and you
            will want to get them themed like your app. An example is below:
          </p>

          <CustomMessage>Hey, it is a custom message</CustomMessage>

          <p>
            Take a look <code>/src/components/CustomMessage</code> directory.
            The are some important things:
          </p>
          <List bulleted>
            <List.Item>
              we premade <code>heading.less</code> for you, when you will
              include it in your LESS file you will able to use your existing
              SUI variables!
            </List.Item>
            <List.Item>
              we enabled{' '}
              <a
                href="https://github.com/css-modules/css-modules"
                rel="noopener noreferrer"
                target="_blank"
              >
                CSS modules
              </a>{' '}
              for your components, it means that you will need to use{' '}
              <code>:global</code> when your style will match SUI parts
            </List.Item>
          </List>

          <Header as="h3">P.S.</Header>
          <p>
            This page is fully responsive{' '}
            <span aria-label="emoji" role="img">
              😁
            </span>
          </p>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default Welcome;
