/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
export function Account_Address (data, address, symbole, decimal) {

    const inputs = []
    const outputs = []


    let isError = false
    let ErrorText = ''
    const array = data.result

    let mainLabel = false

    try {
        const mainGetLabel = data.labels_tags.labels
        if (mainGetLabel.length !== 0) {
            mainLabel = data.labels_tags.labels[0].label
        }
    } catch (error) {
        
    }


    const mainEntity = data.entity

    try {
        for (let i = 0; i < array.length; i++) {
            if (array[i].from.address === address) {

                const GetLabel = array[i].to.labels
                let Label = false
                if (GetLabel.length !== 0) {
                    Label = array[i].to.labels[0].label
                }
                
                outputs.push(
                    {
                        address: array[i].to.address,
                        symbole,
                        value: Number(array[i].value),
                        ValueInDollar: Number(array[i].valueInDollar),
                        hash:array[i].hash,
                        entity:array[i].to.entity,
                        blockNumber:array[i].blockNumber,
                        timestamp:array[i].time,
                        fee: Number(array[i].fee),
                        Label
                    }
                )
            } else if (array[i].to.address === address) {
                const GetLabel = array[i].from.labels
                let Label = false
                if (GetLabel.length !== 0) {
                    Label = array[i].from.labels[0].label
                }
                inputs.push(
                    {
                        address: array[i].from.address,
                        symbole,
                        value: Number(array[i].value),
                        ValueInDollar: Number(array[i].valueInDollar),
                        hash:array[i].hash,
                        entity:array[i].from.entity,
                        blockNumber:array[i].blockNumber,
                        timestamp:array[i].time,
                        fee: Number(array[i].fee),
                        Label
                    }
                )
            }
        }
    } catch (error) {
        isError = true
        ErrorText = error
        console.log('error')
        console.log(error)
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
                Label:mainLabel,
                entity:mainEntity
            }
        )
    }
}