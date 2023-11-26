/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
export function AccountBaseAddress (data, address, symbole, decimal) {
    const inputs = []
    const outputs = []

    const logs = {
        inputs: [],
        outputs: []
    }

    let isError = false
    let ErrorText = ''
    const array = data.result

    const mainGetLabel = data.labels_tags.labels
    let mainLabel = false
    if (mainGetLabel.length !== 0) {
        mainLabel = data.labels_tags.labels[0].label
    }

    try {
        for (let i = 0; i < array.length; i++) {
            if (array[i].from.address.toUpperCase() === address.toUpperCase()) {
                const GetLabel = array[i].to.labels
                let Label = false
                if (GetLabel.length !== 0) {
                    Label = array[i].to.labels[0].label
                }
                outputs.push(
                    {
                        address: array[i].to.address,
                        symbole:'ETH',
                        value: Number(array[i].value) / decimal,
                        ValueInDollar: Number(array[i].valueInDollar),
                        hash:array[i].hash,
                        blockNumber:array[i].blockNumber,
                        timestamp:array[i].timestamp,
                        fee: Number(array[i].gasUsed) * Number(array[i].gasPrice) / decimal,
                        Label
                    }
                )
            } else if (array[i].to.address.toUpperCase() === address.toUpperCase()) {
                const GetLabel = array[i].from.labels
                let Label = false
                if (GetLabel.length !== 0) {
                    Label = array[i].from.labels[0].label
                }
                inputs.push(
                    {
                        address: array[i].from.address,
                        symbole:'ETH',
                        value: Number(array[i].value) / decimal,
                        ValueInDollar: Number(array[i].valueInDollar),
                        hash:array[i].hash,
                        blockNumber:array[i].blockNumber,
                        timestamp:array[i].timestamp,
                        fee: Number(array[i].gasUsed) * Number(array[i].gasPrice) / decimal,
                        Label
                    }
                )
            }
            for (let j = 0; j < array[i].logs.length; j++) {
                try {
                    if (array[i].logs[j].from.toUpperCase() === address.toUpperCase()) {
                        let Label = false
                        // const GetLabel = array[i].logs[j].to.labels
                        // if (GetLabel.length !== 0) {
                        //     Label = array[i].logs[j].to.labels.label
                        // }
                        logs.outputs.push(
                            {
                                address: array[i].logs[j].to,
                                symbole:array[i].logs[j].address.symbol,
                                value: Number(array[i].logs[j].amount) / Math.pow(10, Number(array[i].logs[j].address.decimal)),
                                ValueInDollar: 0,
                                hash:array[i].hash,
                                blockNumber:array[i].blockNumber,
                                timestamp:array[i].timestamp,
                                fee: Number(array[i].gasUsed) * Number(array[i].gasPrice) / decimal,
                                Label
                            }
                        )
                    } 
                    if (array[i].logs[j].to.toUpperCase() === address.toUpperCase()) {
                        let Label = false
                        // const GetLabel = array[i].logs[j].from.labels
                        // if (GetLabel.length !== 0) {
                        //     Label = array[i].logs[j].from.labels.label
                        // }
                        logs.inputs.push(
                            {
                                address: array[i].logs[j].from,
                                symbole:array[i].logs[j].address.symbol,
                                value: Number(array[i].logs[j].amount) / Math.pow(10, Number(array[i].logs[j].address.decimal)),
                                ValueInDollar: 0,
                                hash:array[i].hash,
                                blockNumber:array[i].blockNumber,
                                timestamp:array[i].timestamp,
                                fee: Number(array[i].gasUsed) * Number(array[i].gasPrice) / decimal,
                                Label
                            }
                        )
                    }
                } catch (error) {}
            }
        }
    } catch (error) {
        isError = true
        ErrorText = error
    }

    if (isError) {
        return (
            {
                isError,
                ErrorText
            }
        )
    } else {
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