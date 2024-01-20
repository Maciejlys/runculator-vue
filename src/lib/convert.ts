export const convert = (minutes: number, seconds: number) => {
  const converted = minutes + seconds / 60
  return (60 / converted).toFixed(2)
}
