/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
export function Account_Token_Address (data, address, symbole, decimal) {

    let isError = false
    let ErrorText = ''
    const array = data.result

    const logs = {
        inputs: [],
        outputs: []
    }

    let mainLabel = false
    try {
        const mainGetLabel = data.labels_tags.labels
        if (mainGetLabel.length !== 0) {
            mainLabel = data.labels_tags.labels[0].label
        }
    } catch (error) {
        
    }

    const mainEntity = data.entity

    for (let i = 0; i < array.length; i++) {
            if (array[i].from.address === address) {
                let Label = false
                const GetLabel = array[i].to.labels
                if (GetLabel.length !== 0) {
                    Label = array[i].to.labels.label
                }
                logs.outputs.push(
                    {
                        address: array[i].to.address,
                        symbole:array[i].symbol,
                        value: Number(array[i].tokenValue),
                        ValueInDollar: Number(array[i].ValueInDollor),
                        hash:array[i].hash,
                        entity:null,
                        blockNumber:0,
                        timestamp:array[i].time,
                        fee: 0,
                        Label
                    }
                )
            } else if (array[i].to.address === address) {
                let Label = false
                const GetLabel = array[i].from.labels
                if (GetLabel.length !== 0) {
                    Label = array[i].from.labels.label
                }
                logs.inputs.push(
                    {
                        address: array[i].from.address,
                        symbole:array[i].symbol,
                        value: Number(array[i].tokenValue),
                        ValueInDollar: Number(array[i].ValueInDollor),
                        hash:array[i].hash,
                        entity:null,
                        blockNumber:0,
                        timestamp:array[i].time,
                        fee: 0,
                        Label
                    }
                )
            }
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
                logs,
                Label:mainLabel,
                entity:mainEntity
            }
        )
    }
}