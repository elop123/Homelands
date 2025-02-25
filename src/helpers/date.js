export const MonthAndYear = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString( "da-DK",{ month: "long", year: "numeric" })
}
  