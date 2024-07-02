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

export const toCents = (num) => {
  const cents = (num * 100)
  return cents
}

export const toDollars = (num) => {
  const dollars = (num / 100)
  return dollars
}
