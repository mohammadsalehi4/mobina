/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
export function UTXOTransaction (array, symbole, decimal) {
    console.log('array')
    console.log(array)
    const blockNumber = array.blockNumber
    const fee = array.fee
    const hash = array.hash
    const time = array.time

    const inputs = []
    const outputs = []

    let isError = false
    let ErrorText = ''
    
    try {
        
        for (let i = 0; i < array.inputs.length; i++) {
            let check = false
            for (let x = 0; x < inputs.length; x++) {
                if (inputs[x].address.toUpperCase() === array.inputs[i].coin.address.address.toUpperCase()) {
                    check = true
                }
            }
            if (!check) {
                inputs.push({
                    address: array.inputs[i].coin.address.address,
                    value: array.inputs[i].coin.value / decimal,
                    valueInDollar: array.inputs[i].coin.ValueInDollar
                })
            } else {
                for (let j = 0; j < inputs.length; j++) {
                    if (inputs[j].address.toUpperCase() === array.inputs[i].coin.address.address.toUpperCase()) {
                        inputs[j].value = inputs[j].value + (array.inputs[i].coin.value / decimal)
                        inputs[j].valueInDollar = inputs[j].valueInDollar + (array.inputs[i].coin.ValueInDollar)
                    }
                }
            }
        }
    
        for (let i = 0; i < array.outputs.length; i++) {
            let check = false
            for (let x = 0; x < outputs.length; x++) {
                if (outputs[x].address.toUpperCase() === array.outputs[i].address.address.toUpperCase()) {
                    check = true
                }
            }
            if (!check) {
                outputs.push({
                    address: array.outputs[i].address.address,
                    value: array.outputs[i].value / decimal,
                    valueInDollar: array.outputs[i].ValueInDollar
                })
            } else {
                for (let j = 0; j < outputs.length; j++) {
                    if (outputs[j].address.toUpperCase() === array.outputs[i].address.address) {
                        outputs[j].value = outputs[j].value + (array.outputs[i].value / decimal)
                        outputs[j].valueInDollar = outputs[j].valueInDollar + (array.outputs[i].ValueInDollar)
                    }
                }
            }
        }

    } catch (error) {
        isError = true,
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
                blockNumber,
                fee,
                hash,
                time,
                inputs,
                outputs,
                symbole
            }
        )
    }
}