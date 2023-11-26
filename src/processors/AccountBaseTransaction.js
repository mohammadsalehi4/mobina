/* eslint-disable no-unused-vars */
export function AccountBaseTransaction (array, symbole, decimal) {
    const hash = array.hash
    const blockNumber = array.blockNumber
    const timestamp = array.timestamp
    const from = array.from.address
    const to = array.to.address
    const value = Number(array.value) / decimal
    const valueInDollar = Number(array.valueInDollar)
    const fee = (Number(array.gasPrice) * Number(array.gasUsed)) / decimal
    const logs = []

    const GetFromLabel = array.from.labels
    let FromLabel = false
    if (GetFromLabel.length !== 0) {
        FromLabel = GetFromLabel[0].label
    }

    const GetToLabel = array.to.labels
    let ToLabel = false
    if (GetToLabel.length !== 0) {
        ToLabel = GetToLabel[0].label
    }

    const GetMainLabel = array.label_tag.labels
    let MainLabel = false
    if (GetMainLabel.length !== 0) {
        MainLabel = GetMainLabel[0].label
    }

    for (let i = 0; i < array.logs.length; i++) {
        try {
            if (typeof (array.logs[i].address.symbol) === 'string') {
                logs.push({
                    symbole: array.logs[i].address.symbol,
                    value: Number(array.logs[i].amount) / Math.pow(10, array.logs[i].address.decimal),
                    from: array.logs[i].from, 
                    to: array.logs[i].to
                })
            }
        } catch (error) {
            
        }
    }

    return (
        {
            hash,
            blockNumber,
            timestamp,
            from,
            to,
            symbole,
            value,
            valueInDollar,
            fee,
            logs,
            FromLabel,
            ToLabel,
            MainLabel
        }
    )
}