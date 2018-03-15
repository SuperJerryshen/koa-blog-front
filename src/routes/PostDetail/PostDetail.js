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

class PostDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      author: null,
    };
  }

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
    const { title, content, created_time, last_update_time, author } = data;
    return (
      <Page title={title}>
        <Segment basic>
          <Header as="h2" content={title} />
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
