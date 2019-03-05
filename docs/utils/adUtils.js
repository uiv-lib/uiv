export function pushAd (num = 1) {
  if (process.env.NODE_ENV !== 'production') {
    return
  }
  setTimeout(() => {
    window.adsbygoogle = window.adsbygoogle ? window.adsbygoogle : []
    for (let i = 0; i < num; ++i) {
      window.adsbygoogle.push({})
    }
  }, 500)
}
