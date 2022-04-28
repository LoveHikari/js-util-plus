enum StrEnum {
  PHONE = 'phone',
  TEL = 'tel',
  CARD = 'card',
  PWD = 'pwd',
  POSTAL = 'postal',
  QQ = 'qq',
  EMAIL = 'email',
  MONEY = 'money',
  URL = 'URL',
  IP = 'IP',
  DATE = 'date',
  NUMBER = 'number',
  ENGLISH = 'english',
  CHINESE = 'chinese',
  LOWER = 'lower',
  UPPER = 'upper',
  HTML = 'HTML',
}

export default class StringUtil {
  /**
   * 检验
   * @param str 字符串
   * @param type 类型 phone | tel | card | postal | qq | email | URL | IP | date | number | english | chinese | lower | upper | HTML
   */
  static strCheck = (str: string, type: StrEnum): boolean => {
    switch (type) {
      // 手机号码
      case StrEnum.PHONE:
        return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
      // 座机
      case StrEnum.TEL:
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
      // 身份证
      case StrEnum.CARD:
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
      // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      case StrEnum.PWD:
        return /^[a-zA-Z]\w{5,17}$/.test(str);
      // 邮政编码
      case StrEnum.POSTAL:
        return /[1-9]\d{5}(?!\d)/.test(str);
      // QQ号
      case StrEnum.QQ:
        return /^[1-9][0-9]{4,9}$/.test(str);
      // 邮箱
      case StrEnum.EMAIL:
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
      // 金额(小数点2位)
      case StrEnum.MONEY:
        return /^\d*(?:\.\d{0,2})?$/.test(str);
      // 网址
      case 'URL':
        return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
      // IP
      case 'IP':
        return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
      // 日期时间
      case 'date':
        return (
          /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) ||
          /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
        );
      // 数字
      case 'number':
        return /^[0-9]$/.test(str);
      // 英文
      case 'english':
        return /^[a-zA-Z]+$/.test(str);
      // 中文
      case 'chinese':
        return /^[\u4E00-\u9FA5]+$/.test(str);
      // 小写
      case 'lower':
        return /^[a-z]+$/.test(str);
      // 大写
      case 'upper':
        return /^[A-Z]+$/.test(str);
      // HTML标记
      case 'HTML':
        return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
      default:
        return false;
    }
  };

  /**
   * 两个字的名字中间加空格
   * @param name 姓名
   * @return {string} 姓 名
   */
  static strTransformName(name: string): string {
    const length = name.length;
    let cname;
    if (length === 2) {
      const splitData = name.split('');
      splitData.splice(1, 0, '　');
      cname = splitData.join('');
    } else {
      cname = name;
    }
    return cname;
  }

  /**
   * 判断字符串是否为空
   * @param str 传入的字符串
   * @return {boolean} 空为true，非空为false
   */
  static isEmpty = (str: string): boolean => {
    if (str != null && str.length > 0) {
      return false;
    } else {
      return true;
    }
  };
  /**
   * 判断两个字符串子否相同
   * @param str1
   * @param str2
   * @returns {boolean} 相同为true，不同为false
   */
  static isEquals = (str1: string, str2: string): boolean => {
    return str1 === str2;
  };
  /**
   * 忽略大小写判断字符串是否相同
   * @param {string} str1 字符串1
   * @param {string} str2 字符串2
   * @returns {boolean} 相同为true，不同为false
   */
  static isEqualsIgnorecase = (str1: string, str2: string): boolean => {
    return str1.toUpperCase() === str2.toUpperCase();
  };
  /**
   * 判断是否是数字
   * @param {string} value
   * @returns {boolean} 是数字为true，不是为false
   */
  static isNum = (value: string): boolean => {
    if (value != null && value.length > 0 && isNaN(Number(value)) === false) {
      return true;
    } else {
      return false;
    }
  };
  /**
   * 判断是否是中文
   * @param {string} str
   * @returns {boolean} 是中文为true，不是为false
   */
  static isChine = (str: string): boolean => {
    const reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
    return !reg.test(str);
  };
}
