export function formatPriceWithDiscount(
  price: number,
  discount: number,
): string {
  const discountedPrice = price - (price * discount) / 100

  const decimalPart = discountedPrice % 1
  const isDecimalZero = decimalPart === 0

  const formattedPrice = isDecimalZero
    ? Number(discountedPrice).toFixed(0)
    : Number(discountedPrice).toFixed(2)

  return formattedPrice + 'DT'
}

export function formatPrice(price: number): string {
  const formattedPrice =
    price % 1 === 0 ? Number(price).toFixed(0) : Number(price).toFixed(2)
  return formattedPrice + 'DT'
}
