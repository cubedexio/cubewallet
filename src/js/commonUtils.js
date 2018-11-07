let common = {
  /**
   * 获取余额字符串中的数字
   * @param str String
   * @return number
  **/
  getNumByBalance(str){
    if(!str){
      console.log('参数不能为空!');
      return;
    }
    this.num = str.split(' ')[0];
    return parseFloat(this.num).toFixed(4);
  },

  /**
   * 移动设备顶部状态适配
   * @param header String
  **/
  fixStatusBarByHeader(header){
    if(!header) return;
    let h = $api.byId(header);
    if(!h) return;
    $api.fixStatusBar(h);
  },

  /**
   * 移动设备底部导航栏适配
   * @param nav String
  **/
  fixTabBarByNav(nav){
    if(!nav) return;
    let n = $api.byId(nav);
    if(!n) return;
    $api.fixTabBar(n);
  },

  /**
   * 计算eos兑cbt比率
   * @param price Number
   * @return number
   **/
  exchangeRate(num){
    return (1 / num).toFixed(4);
  }
}


export default common
