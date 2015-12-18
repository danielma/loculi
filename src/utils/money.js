export function centsToString(cents) {
  if (isNaN(cents)) { return '$0.00' }

  const absCents = Math.abs(cents)
  const isPositive = cents >= 0
  const prefix = `$`

  if (absCents < 10) { return `${prefix}0.0${absCents}` }
  if (absCents < 100) { return `${prefix}0.${absCents}` }

  const str = cents.toString()
  const lastTwoDigits = str.substring(str.length - 2, str.length)
  const otherDigits = str.substring(0, str.length - 2)

  return `${prefix}${otherDigits}.${lastTwoDigits}`
}
