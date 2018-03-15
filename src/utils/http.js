import axios from 'axios';
import { dev } from './env';
import store from './store';
import { TOKEN_KEY } from './const';

// 设置默认 host
axios.defaults.baseURL = dev
  ? 'http://localhost:8080/api'
  : 'http://me.jerryshen.cn/api';

// 设置请求验证 Authorization
const token = store.get(TOKEN_KEY);
token && (axios.defaults.headers.post['Authorization'] = token);

// POST 请求 Content-Type
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

export default axios;
