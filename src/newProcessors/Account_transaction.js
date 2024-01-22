/* eslint-disable no-unused-vars */
export function Account_transaction (array, symbole, decimal) {

    console.log('array')
    console.log(array)

    const hash = array.hash
    const blockNumber = array.blockNumber
    const timestamp = array.time
    const from = array.from.address
    const to = array.to.address
    const value = Number(array.value)
    const valueInDollar = Number(array.ValueInDollor)
    const fee = Number(array.fee) 
    const logs = []
    const FromEntity = array.from.entity
    const ToEntity = array.to.entity

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

    const GetMainLabel = array.labels_tags.labels
    let MainLabel = false
    if (GetMainLabel.length !== 0) {
        MainLabel = GetMainLabel[0].label
    }

    for (let i = 0; i < array.logs.length; i++) {
        try {
            if (typeof (array.logs[i].symbol) === 'string') {
                logs.push({
                    symbole: array.logs[i].symbol,
                    value: Number(array.logs[i].tokenValue) / Math.pow(10, array.logs[i].deciaml),
                    from: array.logs[i].from.address, 
                    to: array.logs[i].to.address
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(
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
            MainLabel,
            FromEntity,
            ToEntity
        }
    )

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
            MainLabel,
            FromEntity,
            ToEntity
        }
    )
}