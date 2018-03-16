import React, { PureComponent } from 'react';
import marked from 'marked';
import hl from 'highlight.js';
import {
  Segment,
  Header,
  Container,
  Divider,
  Feed,
  Image,
  Icon,
  Button,
  Modal,
  Loader,
} from 'semantic-ui-react';

import { Page } from '../../components';
import { http, store } from '../../utils';
import { USER_ID } from '../../utils/const';

class PostDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      author: null,
      open: false,
    };
  }

  handleEditClick = () => {
    const { history } = this.props;
    const { data } = this.state;
    history.push(`/edit/${data._id}`);
  };

  handleModalOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      open: false,
    });
  };

  handlePostDelete = () => {
    const { _id } = this.state.data;
    const { history } = this.props;
    http
      .post('/article/delete', {
        article_id: _id,
      })
      .then(res => {
        const { success } = res.data;
        if (success) {
          history.replace('/');
        }
      });
  };

  renderEditBtn = token => {
    if (store.get(USER_ID) === token) {
      return (
        <Button
          animated
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
          }}
          onClick={this.handleEditClick}
        >
          <Button.Content visible>编辑</Button.Content>
          <Button.Content hidden>
            <Icon name="edit" />
          </Button.Content>
        </Button>
      );
    }
    return null;
  };

  renderDeleteBtn = token => {
    if (store.get(USER_ID) === token) {
      return (
        <Button inverted onClick={this.handleModalOpen} color="red">
          <Icon name="trash" /> 删除文章
        </Button>
      );
    }
    return null;
  };

  componentWillMount() {
    const { match } = this.props;
    this.setState({
      loading: true,
    });
    http.get(`/article/${match.params.id}`).then(res => {
      const { success, data } = res.data;

      this.setState({
        data,
        loading: false,
      });
    });
  }

  render() {
    const { data, open, loading } = this.state;
    if (!data) {
      return <Loader active inline="centered" />;
    }
    const {
      title,
      content,
      created_time,
      last_update_time,
      stared_user,
      viewed_times,
      comment,
      author,
    } = data;
    return (
      <Page title={title}>
        <Segment basic style={{ position: 'relative' }}>
          <Header
            as="h2"
            content={title}
            style={{
              paddingRight: store.get(USER_ID) === author._id ? 76 : 0,
            }}
          />
          {this.renderEditBtn(author._id)}
          <Feed>
            <Feed.Event>
              <Feed.Label>
                <img src={author.avatar} />
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>{author.nickname}</Feed.User> 上次编辑于
                  <Feed.Date>
                    {new Date(last_update_time).toLocaleString()}
                  </Feed.Date>
                </Feed.Summary>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name="like" />
                    {stared_user.length}
                  </Feed.Like>
                  <Icon name="eye" />
                  {viewed_times}
                  <Icon name="comment" />
                  {comment.length}
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </Feed>
          <Divider />
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{
              __html: marked(content, {
                gfm: true,
                tables: true,
                highlight(code) {
                  return hl.highlightAuto(code).value;
                },
              }),
            }}
          />
          <Divider />
          {this.renderDeleteBtn(author._id)}
          <Modal size="mini" open={open} onClose={this.handleModalClose}>
            <Modal.Header>删除文章</Modal.Header>
            <Modal.Content>
              <p>您确定要删除这篇文章吗？</p>
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={this.handleModalClose} content="否" />
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content="是"
                onClick={this.handlePostDelete}
              />
            </Modal.Actions>
          </Modal>
        </Segment>
      </Page>
    );
  }
}

export default PostDetail;
