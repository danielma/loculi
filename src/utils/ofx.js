import OFX from 'banking/lib/ofx'
import R from 'ramda'

function findTransactions(ofx) {
  return R.path(['body', 'OFX', 'BANKMSGSRSV1', 0, 'STMTTRNRS', 0, 'STMTRS', 0, 'BANKTRANLIST', 0, 'STMTTRN'], ofx) || []
}

export function parse(ofxStr) {
  return new Promise((resolve) => OFX.parse(ofxStr, resolve))
}

export function importOFX(ofxStr) {
  parse(ofxStr).then((ofx) => {
    console.log(ofx)
    console.log(findTransactions(ofx).map((t) => t))
  })
}

export default exports
