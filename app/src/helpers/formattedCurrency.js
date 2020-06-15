export default function formattedCurrency(value) {
  if (!value) return `R$ 0.00`
  return `R$ ${parseFloat(value).toFixed(2)}`
}
