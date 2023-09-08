import dayjs from "dayjs"

export const getDate = (date: string, format = "DD.MM.YYYY") => {
    return dayjs(date).format(format)
}
