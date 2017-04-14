export default {
  pad (value, num) {
    value = value + ''
    for (let i = num - value.length; i > 0; i--) {
      value = '0' + value
    }
    return value
  }
}
