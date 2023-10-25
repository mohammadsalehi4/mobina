/* eslint-disable no-mixed-operators */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
export function UTXOAddress (array, address, symbole, decimal) {

    const inputs = []
    const outputs = []

    let isError = false
    let ErrorText = ''

    try {
        for (let i = 0; i < array.length; i++) {
            let inputValue = 0
            let outputValue = 0
            for (let j = 0; j < array[i].inputs.length; j++) {
                if (array[i].inputs[j].coin.address.address.toUpperCase() === address.toUpperCase()) {
                    outputValue = outputValue + Number(array[i].inputs[j].coin.value)
                }
            }
    
            for (let j = 0; j < array[i].outputs.length; j++) {
                if (array[i].outputs[j].address.address.toUpperCase() === address.toUpperCase()) {
                    inputValue = inputValue + Number(array[i].outputs[j].value)
                }
            }
            if (outputValue >= inputValue) {
            //output
                const innerOutputs = []
                for (let j = 0; j < array[i].outputs.length; j++) {
                    let check = false
                    for (let x = 0; x < innerOutputs.length; x++) {
                        console.log(innerOutputs)
                        if (innerOutputs[x].address.toUpperCase() === (array[i].outputs[j].address.address).toUpperCase()) {
                            check = true
                        }
                    }
                    if (!check) {
                        innerOutputs.push(
                            {
                                address:array[i].outputs[j].address.address,
                                value:Number(array[i].outputs[j].value) / decimal,
                                symbole,
                                ValueInDollar:Number(array[i].outputs[j].ValueInDollar)
                            }
                        )
                    } else {
                        for (let k = 0; k < innerOutputs.length; k++) {
                            if (innerOutputs[k].address.toUpperCase() === array[i].outputs[j].address) {
                                innerOutputs[k].value = innerOutputs[k].value + Number(array[i].outputs[j].value) / decimal
                                innerOutputs[k].ValueInDollar = innerOutputs[k].ValueInDollar + Number(array[i].outputs[j].ValueInDollar)
                            }
                        }
                    }
                }
                if (innerOutputs.length >= 2) {
                    if (innerOutputs[0].address.toUpperCase() === address.toUpperCase()) {
                        const a = innerOutputs[0]
                        innerOutputs[0] = innerOutputs[1]
                        innerOutputs[1] = a
                    }
                }
                outputs.push(
                    {
                        blockNumber: array[i].blockNumber,
                        hash: array[i].hash,
                        fee: array[i].fee,
                        value: outputValue / decimal,
                        timestamp: array[i].time,
                        reciver:innerOutputs
                    }
                )
            } else {
            //input
                let innerInputs = []
                for (let j = 0; j < array[i].inputs.length; j++) {
                    let check = false
                    for (let x = 0; x < innerInputs.length; x++) {
                        if (innerInputs[x].address.toUpperCase() === array[i].inputs[j].coin.address.address.toUpperCase()) {
                            check = true
                        }
                    }
                    if (!check) {
                        innerInputs.push(
                            {
                                address:array[i].inputs[j].coin.address.address,
                                value:Number(array[i].inputs[j].coin.value) / decimal,
                                symbole,
                                ValueInDollar:Number(array[i].inputs[j].coin.ValueInDollar)
                            }
                        )
                    } else {
                        for (let k = 0; k < innerInputs.length; k++) {
                            if (innerInputs[k].address.toUpperCase() === array[i].inputs[j].coin.address.address) {
                                innerInputs[k].value = innerInputs[k].value + Number(array[i].inputs[j].coin.value) / decimal
                                innerInputs[k].ValueInDollar = innerInputs[k].ValueInDollar + Number(array[i].inputs[j].coin.ValueInDollar)
                            }
                        }
                    }
                }
                if (innerInputs.length >= 2) {
                    if (innerInputs[0].address.toUpperCase() === address.toUpperCase()) {
                        const a = innerInputs[0]
                        innerInputs[0] = innerInputs[1]
                        innerInputs[1] = a
                    }
                }
                inputs.push(
                    {
                        blockNumber: array[i].blockNumber,
                        hash: array[i].hash,
                        fee: array[i].fee,
                        value: inputValue / decimal,
                        timestamp: array[i].time,
                        sender:innerInputs
                    }
                )
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
                error: ErrorText
            }
        )
    } else {
        return (
            {
                isError,
                address,
                symbole,
                inputs,
                outputs
            }
        )
    }
}