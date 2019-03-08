let scriptLoaded = false

function appendScript () {
  if (scriptLoaded) {
    return
  }
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  document.head.appendChild(script)
  scriptLoaded = true
}

export default {
  mounted () {
    if (process.env.NODE_ENV !== 'production' || window.location.hostname === 'localhost') {
      return
    }
    appendScript()
    window.adsbygoogle = window.adsbygoogle ? window.adsbygoogle : []
    const num = this.$el.querySelectorAll('.adsbygoogle').length
    // console.log(`found ${num} ad slot.`)
    for (let i = 0; i < num; ++i) {
      window.adsbygoogle.push({})
    }
  }
}
