const fs = require('fs')
const DIST_PATH = './docs/'
// write CNAME
fs.writeFileSync(DIST_PATH + 'CNAME', 'uiv.wxsm.space')
