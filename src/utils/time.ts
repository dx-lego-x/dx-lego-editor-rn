export function formatDate(date: Date, connector = '-'){   //定义日期格式化函数
  const year = date.getFullYear()    //获取年份
  const month = date.getMonth() + 1  //获取月份，从0开始计数，所以要加1
  const day = date.getDate()         //获取日期
  const monthStr = month < 10 ? '0' + month : month   //如果月份小于10，前面补0
  const dayStr = day < 10 ? '0' + day : day           //如果日期小于10，前面补0
  return year + connector + monthStr + connector + dayStr   //拼接成yyyymmdd形式字符串
}
