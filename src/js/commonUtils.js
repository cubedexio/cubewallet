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

}


export default common
