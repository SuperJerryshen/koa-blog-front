import React, { Component } from 'react';
import {
  Image,
  Transition,
  Label,
  Dimmer,
  Loader,
  Segment,
  Progress,
} from 'semantic-ui-react';
import * as qiniu from 'qiniu-js';

import http from '../../utils/http';
import { env } from '../../utils';
import message from '../../components/Message';

// const imgPrefix = env.dev
//   ? 'http://p5s086uhv.bkt.clouddn.com'
//   : 'http://p5d9dcwn2.bkt.clouddn.com';
const imgPrefix = 'http://p5d9dcwn2.bkt.clouddn.com';

class PicUploader extends Component {
  state = {
    tagVisible: true,
    uploading: false,
    percent: 0,
  };

  handlePicUpload = file => {
    const that = this;
    const { onChange, name } = this.props;
    http.get('/utils/qiniu.token').then(res => {
      const { data, success } = res.data;
      if (!success) {
        message.error(data.message);
      } else {
        qiniu
          .upload(file, `${new Date().valueOf()}/${file.name}`, data.token, {
            useCdnDomain: true,
            region: qiniu.region.z0,
          })
          .subscribe({
            next(res) {
              that.setState({
                percent: parseInt(res.total.percent),
              });
            },
            error(res) {
              message.error(res.message);
            },
            complete(res) {
              onChange(null, {
                name,
                value: `${imgPrefix}/${res.key}-square`,
              });
              that.setState({
                uploading: false,
                percent: 0,
              });
              that.input.value = '';
              message.success('上传头像成功');
            },
          });
      }
    });
  };

  handlePicClick = () => {
    this.input.click();
  };

  handlePicPreview = e => {
    const { onChange, name } = this.props;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      onChange(null, {
        name,
        value: reader.result,
      });
    });
    reader.readAsDataURL(e.target.files[0]);
    this.setState({
      tagVisible: false,
      uploading: true,
    });
    this.handlePicUpload(e.target.files[0]);
  };

  render() {
    const { avatar } = this.props;
    const { tagVisible, uploading, percent } = this.state;
    return (
      <div>
        <input
          name="avatar"
          accept="image/*"
          type="file"
          style={{ display: 'none' }}
          ref={node => (this.input = node)}
          onChange={this.handlePicPreview}
        />
        <Dimmer.Dimmable
          blurring
          dimmed={uploading}
          style={{
            width: 150,
          }}
        >
          <Dimmer active={uploading}>
            <Loader content="上传中" />
          </Dimmer>

          <Image
            size="small"
            onClick={this.handlePicClick}
            rounded
            src={avatar}
            style={{
              width: 150,
              height: 150,
            }}
          />
        </Dimmer.Dimmable>
        <Transition visible={uploading} animation="scale" duration={300}>
          <Progress percent={percent} size="small" indicating>
            {percent} %
          </Progress>
        </Transition>
        <Transition visible={tagVisible} animation="scale" duration={500}>
          <Label basic pointing>
            默认头像，点击上传
          </Label>
        </Transition>
      </div>
    );
  }
}

export default PicUploader;
