import axios from 'axios';
import {SUCC_CODE, TIMEOUT} from './config';

const CancelToken = axios.CancelToken;
let cancel;

// 获取内容数据--ajax
export const getCategoryContent = (id) => {
  // 取消前一次请求
  cancel && cancel('取消了前一次的请求');
  cancel = null;

  return axios.get(`http://www.imooc.com/api/category/content/${id}`, {
    timeout: TIMEOUT,
    cancelToken: // CancelToken.source() 的源码
      new CancelToken(function executor(c) {
        cancel = c;
      })
  }).then(res => {
    if (res.data.code === SUCC_CODE) {
      return res.data.content;
    }

    throw new Error('没有成功获取到数据！');
  }).catch(err => {
    if (axios.isCancel(err)) {
      console.log(err);
    } else {
      // 处理错误
      console.log(err);
    }
  });
};
