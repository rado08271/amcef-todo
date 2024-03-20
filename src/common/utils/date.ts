export const formatDate = (dateFormat: string) => {
    const date = new Date(dateFormat)

    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()

    return `${day}.${month}.${year}`
}