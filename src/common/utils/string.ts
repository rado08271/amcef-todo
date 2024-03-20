
export const normalizeSearchString = (value: string) => {
    return value.toLowerCase().trim().replace(" ", "")
}