/* eslint-disable no-mixed-operators */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
export function UTXOAddress (data, address, symbole, decimal) {

    const inputs = []
    const outputs = []
    let isError = false
    let ErrorText = ''
    const mainGetLabel = data.labels_tags.labels
    let mainLabel = false
    if (mainGetLabel.length !== 0) {
        mainLabel = data.labels_tags.labels[0].label
    }
    const array = data.result
    try {
        for (let i = 0; i < array.length; i++) {
            let inputValue = 0
            let inputDollarValue = 0
            let outputValue = 0
            let outputDollarValue = 0
            for (let j = 0; j < array[i].inputs.length; j++) {
                if (array[i].inputs[j].coin.address.address.toUpperCase() === address.toUpperCase()) {
                    outputValue = outputValue + Number(array[i].inputs[j].coin.value)
                    outputDollarValue = outputDollarValue + Number(array[i].inputs[j].coin.ValueInDollar)
                }
            }
    
            for (let j = 0; j < array[i].outputs.length; j++) {
                if (array[i].outputs[j].address.address.toUpperCase() === address.toUpperCase()) {
                    inputValue = inputValue + Number(array[i].outputs[j].value)
                    inputDollarValue = inputDollarValue + Number(array[i].outputs[j].ValueInDollar)
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
                        const Getlabel = array[i].outputs[j].address.labels
                        let label = false
                        if (Getlabel.length !== 0) {
                            label = Getlabel[0].label
                        }

                        let VID = Number(array[i].outputs[j].ValueInDollar)
                        if (typeof (VID) !== 'number') {
                            VID = 0
                        }

                        innerOutputs.push(
                            {
                                address:array[i].outputs[j].address.address,
                                value:Number(array[i].outputs[j].value) / decimal,
                                symbole,
                                ValueInDollar:VID,
                                label
                            }
                        )
                    } else {
                        for (let k = 0; k < innerOutputs.length; k++) {

                            let VID = Number(array[i].outputs[j].ValueInDollar)
                            if (typeof (VID) !== 'number') {
                                VID = 0
                            }

                            if (innerOutputs[k].address.toUpperCase() === array[i].outputs[j].address) {
                                innerOutputs[k].value = innerOutputs[k].value + Number(array[i].outputs[j].value) / decimal
                                innerOutputs[k].ValueInDollar = innerOutputs[k].ValueInDollar + VID
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
                if (typeof (outputDollarValue) !== 'number') {
                    outputDollarValue = 0
                }
                outputs.push(
                    {
                        blockNumber: array[i].blockNumber,
                        hash: array[i].hash,
                        fee: Number(array[i].fee) / decimal,
                        value: outputValue / decimal,
                        timestamp: array[i].time,
                        ValueInDollar: outputDollarValue,
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
                        const Getlabel = array[i].inputs[j].coin.address.labels
                        let label = false
                        if (Getlabel.length !== 0) {
                            label = Getlabel[0].label
                        }

                        let VID = Number(array[i].inputs[j].coin.ValueInDollar)
                        if (typeof (VID) !== 'number') {
                            VID = 0
                        }

                        innerInputs.push(
                            {
                                address:array[i].inputs[j].coin.address.address,
                                value:Number(array[i].inputs[j].coin.value) / decimal,
                                symbole,
                                ValueInDollar:VID,
                                label
                            }
                        )
                    } else {
                        for (let k = 0; k < innerInputs.length; k++) {
                            
                            let VID = Number(array[i].inputs[j].coin.ValueInDollar)
                            if (typeof (VID) !== 'number') {
                                VID = 0
                            }

                            if (innerInputs[k].address.toUpperCase() === array[i].inputs[j].coin.address.address) {
                                innerInputs[k].value = innerInputs[k].value + Number(array[i].inputs[j].coin.value) / decimal
                                innerInputs[k].ValueInDollar = innerInputs[k].ValueInDollar + VID
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
                if (typeof (inputDollarValue) !== 'number') {
                    inputDollarValue = 0
                }
                inputs.push(
                    {
                        blockNumber: array[i].blockNumber,
                        hash: array[i].hash,
                        fee: Number(array[i].fee) / decimal,
                        value: inputValue / decimal,
                        ValueInDollar: inputDollarValue,
                        timestamp: array[i].time,
                        sender:innerInputs
                    }
                )
            }
        }
    } catch (error) {
        isError = true
        ErrorText = error
        console.log(ErrorText)
    }
    
    if (isError) {
        return (
            {
                isError,
                error: ErrorText
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
                label:mainLabel
            }
        )
        return (
            {
                isError,
                address,
                symbole,
                inputs,
                outputs,
                label:mainLabel
            }
        )
    }
}