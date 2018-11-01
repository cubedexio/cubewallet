let common = {
  /**
   * 获取余额字符串中的数字
   * @param str string
   * @return number
  **/
  getNumByBalance(str){
    if(!str){
      console.log('参数不能为空!');
      return;
    }
    this.num = str.split(' ')[0];
    return this.num;
  },

  /**
   * 移动设备顶部状态适配
   * @param header string
  **/
  fixStatusBarByHeader(header){
    // console.log($api)
    // console.log($api.isElement($api.byId(header)))
    if(!header) return;
    let h = $api.byId(header);
    if(!h) return;
    $api.fixStatusBar(h);
  },

  /**
   * 移动设备底部导航栏适配
   * @param nav string
  **/
  fixTabBarByNav(nav){
    if(!nav) return;
    let n = $api.byId(nav);
    if(!n) return;
    $api.fixTabBar(n);
  }
}


export default common
