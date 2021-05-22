export default function formatDate(date: Date): string {
  const formatedDate = new Date(date)

  const day = formatedDate.getDay()
  const month = formatedDate.getMonth()
  const year = formatedDate.getFullYear()

  return day + '/' + month + '/' + year
}
