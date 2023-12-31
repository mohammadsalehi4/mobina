export function GetMillisecond (time) {
    const date = new Date(time)
    
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    if (month > 12) {
        month  = 12
    } else if (month < 1) {
        month = 1
    }

    if (day > 31) {
        day  = 31
    } else if (day < 1) {
        day = 1
    }

    return {
        year,
        month,
        day,
        hour,
        minute,
        second
    }
}