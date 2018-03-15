import React, { PureComponent } from 'react';
import {
  Segment,
  Header,
  Container,
  Divider,
  Feed,
  Image,
  Icon,
  Button,
} from 'semantic-ui-react';
import { Page } from '../../components';
import http from '../../utils/http';
import store from '../../utils/store';
import { USER_ID } from '../../utils/const';

class PostDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      author: null,
    };
  }

  handleEditClick = () => {
    const { history } = this.props;
    const { data } = this.state;
    history.push(`/edit/${data._id}`);
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
    const { data } = this.state;
    if (!data) {
      return null;
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
              paddingRight: 70,
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
          <div>{content}</div>
        </Segment>
      </Page>
    );
  }
}

export default PostDetail;
