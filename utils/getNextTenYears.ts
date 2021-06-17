export const getNextTenYears = () => {
  let currentYear = new Date().getFullYear()
  let years = [currentYear]
  for (let i = 1; i < 10; i++) {
    years.push(currentYear + i)
  }

  return years
}