import React, { Component } from 'react';
import { Segment, Grid, Item, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
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
      <Segment loading={this.state.loading}>
        <Grid>
          <Grid.Column computer={16} mobile={16}>
            <Item.Group divided link>
              {map(this.state.data, (item, index) => (
                <Item key={index} as={Link} to={`/post/${item._id}`}>
                  <Item.Content>
                    <Item.Header>{item.title}</Item.Header>
                    <Item.Meta>{item.author.nickname}</Item.Meta>
                    <Item.Description>{item.content}</Item.Description>
                    <Item.Extra>{item.create_time}</Item.Extra>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default Home;
