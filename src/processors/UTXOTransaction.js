/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
export function UTXOTransaction (array, TransactionHash, symbole, decimal) {

    const blockNumber = array.blockNumber
    const fee = array.fee
    const hash = array.hash
    const time = array.time
    
    const GetInputs = array.inputs
    const GetOutputs = array.outputs

    const inputs = []
    const outputs = []

    let isError = false
    let ErrorText = ''
    
    try {
        for (let i = 0; i < GetInputs.length; i++) {
            if (inputs.some(item => item.address.toUpperCase() === GetInputs[i].coin.address.address) === false) {
                inputs.push({
                    address: GetInputs[i].coin.address.address,
                    value: GetInputs[i].coin.value / decimal,
                    valueInDollar: GetInputs[i].coin.ValueInDollar
                })
            } else {
                for (let j = 0; j < inputs.length; j++) {
                    if (inputs[j].address.toUpperCase() === GetInputs[i].coin.address.address) {
                        inputs[j].value = inputs[j].value + (GetInputs[i].coin.value / decimal)
                        inputs[j].valueInDollar = inputs[j].valueInDollar + (GetInputs[i].coin.ValueInDollar)
                    }
                }
            }
        }
    
        for (let i = 0; i < GetOutputs.length; i++) {
            if (outputs.some(item => item.address.toUpperCase() === GetOutputs[i].address.address) === false) {
                outputs.push({
                    address: GetOutputs[i].address.address,
                    value: GetOutputs[i].value / decimal,
                    valueInDollar: GetOutputs[i].ValueInDollar
                })
            } else {
                for (let j = 0; j < outputs.length; j++) {
                    if (outputs[j].address.toUpperCase() === GetOutputs[i].address.address) {
                        outputs[j].value = outputs[j].value + (GetOutputs[i].value / decimal)
                        outputs[j].valueInDollar = outputs[j].valueInDollar + (GetOutputs[i].ValueInDollar)
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
                outputs
            }
        )
    }
}