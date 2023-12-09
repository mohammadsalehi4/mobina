/* eslint-disable space-infix-ops */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
export function BSCTransaction (array, symbole, decimal) {

    console.log(array)

    const hash = array.main_transaction.transactionHash
    const blockNumber = array.main_transaction.blockNumber
    const timestamp = array.main_transaction.timestamp
    const from = array.main_transaction.from.address
    const to = array.main_transaction.to.address
    const value = Number(array.main_transaction.value) / decimal
    const valueInDollar = Number(array.main_transaction.value_dollor)
    const fee = (Number(array.main_transaction.effectiveGasPrice) * Number(array.main_transaction.gasUsed)) / decimal
    const logs = []

    const GetFromLabel = array.main_transaction.from.labels
    let FromLabel = false
    if (GetFromLabel.length !== 0) {
        FromLabel = GetFromLabel[0].label
    }

    const GetToLabel = array.main_transaction.to.labels
    let ToLabel = false
    if (GetToLabel.length !== 0) {
        ToLabel = GetToLabel[0].label
    }

    const GetMainLabel = array.tag_labels.labels
    let MainLabel = false
    if (GetMainLabel.length !== 0) {
        MainLabel = GetMainLabel[0].label
    }

    for (let i = 0; i < array.bep_20_transfers.length; i++) {
        logs.push({
            symbole: array.bep_20_transfers[i].token_symbol,
            value: Number(array.bep_20_transfers[i].value) / Math.pow(10, Number(array.bep_20_transfers[i].token_decimal)),
            from: array.bep_20_transfers[i].from, 
            to: array.bep_20_transfers[i].to
        })
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
            MainLabel
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
            MainLabel
        }
    )
}