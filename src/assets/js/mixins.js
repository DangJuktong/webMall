import storage from 'assets/js/storage';
import {SEARCH_HISTORY_KEYWORD_KEY} from 'pages/search/config';

export const searchMixin = {
  // 复用方法写在methods里，方法名要写私有方法
  methods: {
    $_selectItem(keyword) {
      let keywords = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);
      if (keywords.length !== 0) {
        // splice()方法效率低不推荐使用
        // 删除记录里相同的值
        keywords = keywords.filter(val => val !== keyword);
      }
      // 将值添加到开头
      keywords.unshift(keyword);
      // 存入新的历史记录
      storage.set(SEARCH_HISTORY_KEYWORD_KEY, keywords);
      // 跳转到淘宝的页面
      // location.href = `https://s.m.taobao.com/h5?event_submit_do_new_search_auction=1&_input_charset=utf-&&topSearch=1&atype=b&searchfrom=1&action=home%3Aredirect_app_action&from=1&sst=1&n=20&buying=buyitnow&q=${keyword}`;
    }
  }
};
