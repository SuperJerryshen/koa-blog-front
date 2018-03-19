import React, { Component } from 'react';
import {
  Segment,
  Grid,
  Item,
  Loader,
  Icon,
  Label,
  Image,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import { Page } from '../../components';
import http from '../../utils/http';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
    };
  }

  componentWillMount() {
    http.get('/article').then(res => {
      const { data } = res.data;
      this.setState({
        data,
        loading: false,
      });
    });
  }

  render() {
    return (
      <Page title="经纬天地">
        <Segment loading={this.state.loading} basic>
          <Grid>
            <Grid.Column computer={16} mobile={16}>
              <Item.Group divided>
                {map(this.state.data, (item, index) => (
                  <Item key={index}>
                    <Item.Content>
                      <Item.Header as={Link} to={`/post/${item._id}`}>
                        {item.title}
                      </Item.Header>
                      <Item.Meta>
                        {new Date(item.created_time).toLocaleDateString()}
                      </Item.Meta>
                      <Item.Description
                        style={{
                          position: 'relative',
                        }}
                      >
                        <Label>
                          <Icon name="like" /> {item.stared_users.length}
                        </Label>
                        <Label>
                          <Icon name="eye" /> {item.viewed_times}
                        </Label>
                        <Label>
                          <Icon name="comment" /> {item.comment.length}
                        </Label>
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                          }}
                        >
                          <Label image size="medium">
                            <img src={item.author.avatar} />
                            <span
                              style={{
                                maxWidth: 90,
                                overflow: 'hidden',
                                display: 'inline-block',
                              }}
                            >
                              {item.author.nickname}
                            </span>
                          </Label>
                        </div>
                      </Item.Description>
                      <Item.Extra>{item.create_time}</Item.Extra>
                    </Item.Content>
                  </Item>
                ))}
              </Item.Group>
            </Grid.Column>
          </Grid>
        </Segment>
      </Page>
    );
  }
}

export default Home;
