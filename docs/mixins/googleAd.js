export default {
  mounted () {
    if (process.env.NODE_ENV !== 'production') {
      return
    }
    setTimeout(() => {
      window.adsbygoogle = window.adsbygoogle ? window.adsbygoogle : []
      const num = this.$el.querySelectorAll('.adsbygoogle').length
      // console.log(`found ${num} ad slot.`)
      for (let i = 0; i < num; ++i) {
        window.adsbygoogle.push({})
      }
    }, 500)
  }
}
