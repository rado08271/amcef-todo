export const formatDate = (date: string) => {
    const ddate = new Date(date)

    const day = ddate.getUTCDate()
    const month = ddate.getUTCMonth() + 1
    const year = ddate.getUTCFullYear()

    return `${day}.${month}.${year}`
}