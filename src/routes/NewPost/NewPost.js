import React, { PureComponent } from 'react';
import { Segment, Form, Header } from 'semantic-ui-react';

import http from '../../utils/http';

class NewPost extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      titleErr: false,
      contentErr: false,
      loading: false,
    };
  }

  handleInput = (e, { name, value }) => {
    this.setState({
      [name]: value,
      [name + 'Err']: !value,
    });
  };

  handleSubmit = e => {
    const { title, content } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    http
      .post('/article/make', {
        title,
        content,
      })
      .then(res => {
        const { data, success } = res.data;
        this.setState({
          loading: false,
        });
        if (success) {
          history.push(`/post/${data.article_id}`);
        }
      });
  };

  render() {
    const { title, content, titleErr, contentErr, loading } = this.state;
    return (
      <Segment basic>
        <Header as="h2" textAlign="center" content="新建文章" />
        <Form loading={loading}>
          <Form.Input
            placeholder="请输入标题"
            label="文章标题"
            name="title"
            value={title}
            onChange={this.handleInput}
            error={titleErr}
            required
          />
          <Form.TextArea
            label="文章内容"
            name="content"
            value={content}
            onChange={this.handleInput}
            placeholder="请使用markdown输入内容"
            error={contentErr}
            rows="12"
            required
          />
          <Form.Button
            fluid
            color="green"
            content="新建文章"
            onClick={this.handleSubmit}
          />
        </Form>
      </Segment>
    );
  }
}

export default NewPost;
