/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
export function AccountBaseAddress (array, address, symbole, decimal) {
    const inputs = []
    const outputs = []

    const logs = {
        inputs: [],
        outputs: []
    }

    let isError = false
    let ErrorText = ''
    console.log(array.length)
    console.log(array)
    try {
        for (let i = 0; i < array.length; i++) {
            if (array[i].from.address.toUpperCase() === address.toUpperCase()) {
                outputs.push(
                    {
                        address: array[i].to.address,
                        symbole:'ETH',
                        value: Number(array[i].value) / decimal,
                        ValueInDollar: Number(array[i].valueInDollar),
                        hash:array[i].hash,
                        blockNumber:array[i].blockNumber,
                        timestamp:array[i].timestamp
                    }
                )
            } else if (array[i].to.address.toUpperCase() === address.toUpperCase()) {
                inputs.push(
                    {
                        address: array[i].from.address,
                        symbole:'ETH',
                        value: Number(array[i].value) / decimal,
                        ValueInDollar: Number(array[i].valueInDollar),
                        hash:array[i].hash,
                        blockNumber:array[i].blockNumber,
                        timestamp:array[i].timestamp
                    }
                )
            }
            for (let j = 0; j < array[i].logs.length; j++) {
                try {
                    if (array[i].logs[j].from.toUpperCase() === address.toUpperCase()) {
                        logs.outputs.push(
                            {
                                address: array[i].logs[j].to,
                                symbole:array[i].logs[j].address.symbol,
                                value: Number(array[i].logs[j].amount) / Math.pow(10, Number(array[i].logs[j].address.decimal)),
                                ValueInDollar: 0,
                                hash:array[i].hash,
                                blockNumber:array[i].blockNumber,
                                timestamp:array[i].timestamp
                            }
                        )
                    } 
                    if (array[i].logs[j].to.toUpperCase() === address.toUpperCase()) {
                        logs.inputs.push(
                            {
                                address: array[i].logs[j].from,
                                symbole:array[i].logs[j].address.symbol,
                                value: Number(array[i].logs[j].amount) / Math.pow(10, Number(array[i].logs[j].address.decimal)),
                                ValueInDollar: 0,
                                hash:array[i].hash,
                                blockNumber:array[i].blockNumber,
                                timestamp:array[i].timestamp
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
                logs
            }
        )
    }
}