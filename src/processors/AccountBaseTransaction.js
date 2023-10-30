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

    for (let i = 0; i < array.logs.length; i++) {
        logs.push({
            symbole: array.logs[i].address.symbol,
            value: Number(array.logs[i].amount) / Math.pow(10, array.logs[i].address.decimal),
            from: array.logs[i].from, 
            to: array.logs[i].to
        })
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
            logs
        }
    )
}