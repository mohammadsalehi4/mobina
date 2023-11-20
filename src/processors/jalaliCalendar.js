import moment from "jalali-moment"
export function JalaliCalendar (time) {
    const date = new Date(time)
    
    const year = moment(time).locale('fa').format('YYYY')
    const month = moment(time).locale('fa').format('MM')
    const day = moment(time).locale('fa').format('DD')
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    console.log(moment(time).locale('fa').format('YYYY'))
    
    return {
        year,
        month,
        day,
        hour,
        minute,
        second
    }
}