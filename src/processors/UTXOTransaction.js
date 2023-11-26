/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
export function UTXOTransaction (array, symbole, decimal) {

    const blockNumber = array.blockNumber
    const fee = array.fee
    const hash = array.hash
    const time = array.time

    const inputs = []
    const outputs = []

    let isError = false
    let ErrorText = ''

    const GetMainLabel = array.label_tag.labels
    let MainLabel = false
    if (GetMainLabel.length !== 0) {
        MainLabel = GetMainLabel[0].label
    }
    
    try {
        
        for (let i = 0; i < array.inputs.length; i++) {
            let check = false
            for (let x = 0; x < inputs.length; x++) {
                if (inputs[x].address.toUpperCase() === array.inputs[i].coin.address.address.toUpperCase()) {
                    check = true
                }
            }
            if (!check) {
                
                const GetLabel = array.inputs[i].coin.address.labels
                let Label = false
                if (GetLabel.length !== 0) {
                    Label = array.inputs[i].coin.address.labels[0].label
                }
                
                inputs.push({
                    address: array.inputs[i].coin.address.address,
                    value: Number(array.inputs[i].coin.value) / decimal,
                    valueInDollar: array.inputs[i].coin.ValueInDollar,
                    Label
                })
            } else {
                for (let j = 0; j < inputs.length; j++) {
                    if (inputs[j].address.toUpperCase() === array.inputs[i].coin.address.address.toUpperCase()) {
                        inputs[j].value = inputs[j].value + (Number(array.inputs[i].coin.value) / decimal)
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
                                
                const GetLabel = array.outputs[i].address.labels
                let Label = false
                if (GetLabel.length !== 0) {
                    Label = array.outputs[i].address.labels[0].label
                }
                
                outputs.push({
                    address: array.outputs[i].address.address,
                    value: array.outputs[i].value / decimal,
                    valueInDollar: array.outputs[i].ValueInDollar,
                    Label
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
                symbole,
                MainLabel
            }
        )
    }
}