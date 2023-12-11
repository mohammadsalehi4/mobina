/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
export function BSCAddress (data, address, symbole, decimal) {
    console.log(data)

    const inputs = []
    const outputs = []

    const logs = {
        inputs: [],
        outputs: []
    }

    let isError = false
    let ErrorText = ''
    const array = data.transactions
    const tokens = data.token_transfers

    const mainGetLabel = data.tag_labels.labels
    let mainLabel = false
    if (mainGetLabel.length !== 0) {
        mainLabel = data.tag_labels.labels[0].label
    }

    try {
        for (let i = 0; i < array.length; i++) {
            if ((array[i].main_transaction.from.address === address) && (array[i].main_transaction.to.address !== null)) {

                const GetLabel = array[i].main_transaction.to.labels
                let Label = false
                if (GetLabel.length !== 0) {
                    Label = array[i].main_transaction.to.labels[0].label
                }

                let VID = Number(array[i].main_transaction.valueInDollar)
                if ((typeof (VID) !== 'number') || VID === NaN) {
                    VID = 0
                }
                outputs.push(
                    {
                        address: array[i].main_transaction.to.address,
                        symbole:'BSC',
                        value: Number(array[i].main_transaction.value) / decimal,
                        ValueInDollar: VID,
                        hash:array[i].main_transaction.transactionHash,
                        blockNumber:array[i].main_transaction.blockNumber,
                        timestamp:array[i].main_transaction.timestamp,
                        fee: Number(array[i].main_transaction.gasUsed) * Number(array[i].main_transaction.effectiveGasPrice) / decimal,
                        Label
                    }
                )
            } else if ((array[i].main_transaction.to.address === address) && (array[i].main_transaction.from.address !== null)) {
                const GetLabel = array[i].main_transaction.from.labels
                let Label = false
                if (GetLabel.length !== 0) {
                    Label = array[i].main_transaction.from.labels[0].label
                }

                let VID = Number(array[i].main_transaction.valueInDollar)
                if ((typeof (VID) !== 'number') || VID === NaN) {
                    VID = 0
                }

                inputs.push(
                    {
                        address: array[i].main_transaction.from.address,
                        symbole:'BSC',
                        value: Number(array[i].main_transaction.value) / decimal,
                        ValueInDollar: VID,
                        hash:array[i].main_transaction.transactionHash,
                        blockNumber:array[i].main_transaction.blockNumber,
                        timestamp:array[i].main_transaction.timestamp,
                        fee: Number(array[i].main_transaction.gasUsed) * Number(array[i].main_transaction.effectiveGasPrice) / decimal,
                        Label
                    }
                )
            }
        } 
        for (let i = 0; i < tokens.length; i++) {
            try {
                if (tokens[i].from === address) {
                    let Label = false
                    logs.outputs.push(
                        {
                            address: tokens[i].to,
                            symbole:tokens[i].tokenSymbol,
                            value: Number(tokens[i].value) / Math.pow(10, Number(tokens[i].tokenDecimal)),
                            ValueInDollar: 0,
                            hash:tokens[i].hash,
                            blockNumber:tokens[i].blockNumber,
                            timestamp:tokens[i].timeStamp,
                            fee: Number(tokens[i].gasUsed) * Number(tokens[i].gasPrice) / Math.pow(10, Number(tokens[i].tokenDecimal)),
                            Label
                        }
                    )
                } else if (tokens[i].to === address) {
                    let Label = false

                    logs.inputs.push(
                        {
                            address: tokens[i].from,
                            symbole:tokens[i].tokenSymbol,
                            value: Number(tokens[i].value) / Math.pow(10, Number(tokens[i].tokenDecimal)),
                            ValueInDollar: 0,
                            hash:tokens[i].hash,
                            blockNumber:tokens[i].blockNumber,
                            timestamp:tokens[i].timeStamp,
                            fee: Number(tokens[i].gasUsed) * Number(tokens[i].gasPrice) / Math.pow(10, Number(tokens[i].tokenDecimal)),
                            Label
                        }
                    )
                }
            } catch (error) {}
        }
        console.log(outputs)
    } catch (error) {
        isError = true
        ErrorText = error
    }

    if (isError) {
        console.log(ErrorText)
        return (
            {
                isError,
                ErrorText
            }
        )
    } else {
        console.log(
            {
                isError,
                address,
                symbole,
                inputs,
                outputs,
                logs,
                Label:mainLabel
            }
        )
        return (
            {
                isError,
                address,
                symbole,
                inputs,
                outputs,
                logs,
                Label:mainLabel
            }
        )
    }
}