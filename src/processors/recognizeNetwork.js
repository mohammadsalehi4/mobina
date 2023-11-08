export function RecognizeNetwork (id) {
    if (typeof (id) === 'number') {
        if (id === 1) {
            return ('بیت کوین')
        } else if (id === 2) {
            return ('بیت کوین کش')
        } else if (id === 3) {
            return ('لایت کوین')
        } else if (id === 4) {
            return ('اتریوم')
        } else if (id === 5) {
            return ('بایننس اسمارت چین')
        } else { return (false) }
    } else if (typeof (id) === 'string') {
        if (id === 'بیت کوین') {
            return (1)
        } else if (id === 'بیت کوین کش') {
            return (2)
        } else if (id === 'لایت کوین') {
            return (3)
        } else if (id === 'اتریوم') {
            return (4)
        } else if (id === 'بایننس اسمارت چین') {
            return (5)
        } else { return (false) }
    } else {
        return (false)
    }
}
