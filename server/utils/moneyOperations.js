export const addMoney = (a, b) => {
  const cents = toCents(a) + toCents(b)
  const dollars = toDollars(cents)
  return dollars
}

export const subtractMoney = (a, b) => {
  const cents = toCents(a) - toCents(b)
  const dollars = toDollars(cents)
  return dollars
}

const toCents = (num) => {
  const cents = Math.round(num * 100)
  return cents
}

const toDollars = (num) => {
  const dollars = (num / 100)
  return dollars
}
