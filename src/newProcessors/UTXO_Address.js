/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
export function UTXO_Address (address, data, symbole, decimal) {

    console.log(data)
    
    let isError = false
    let ErrorText = ''

    //labels
    let mainLabel = false
    const mainGetLabel = data.labels_tags.labels
    if (mainGetLabel.length !== 0) {
        mainLabel = data.labels_tags.labels[0]
    }

    //tags
    let maintag = false
    const mainGettag = data.labels_tags.tags
    if (mainGettag.length !== 0) {
        maintag = data.labels_tags.tags
    }

    //Entity
    const mainEntity = data.entity

    const outputs = []
    const inputs = []

    try {
        for (let i = 0; i < data.result.length; i++) {
            //inputs
            if (data.result[i].addresstype === 'Received') {

                const Getlabel = data.result[i].labels_tags.labels
                let label = false
                if (Getlabel.length !== 0) {
                    label = Getlabel[0].label
                }

                const GetTag = data.result[i].labels_tags.tags
                let tag = false
                if (GetTag.length !== 0) {
                    tag = GetTag[0].tag
                }

                inputs.push(
                    {
                        blockNumber: data.result[i].blockNumber,
                        hash: data.result[i].hash,
                        fee: Number(data.result[i].fee),
                        value: Math.abs(data.result[i].amountTransferred),
                        timestamp: data.result[i].time,
                        ValueInDollar: data.result[i].ValueInDollor
                    }
                )

            //outputs
            } else if (data.result[i].addresstype === 'Sent') {

                const Getlabel = data.result[i].labels_tags.labels
                let label = false
                if (Getlabel.length !== 0) {
                    label = Getlabel[0].label
                }

                const GetTag = data.result[i].labels_tags.tags
                let tag = false
                if (GetTag.length !== 0) {
                    tag = GetTag[0].tag
                }

                outputs.push(
                    {
                        blockNumber: data.result[i].blockNumber,
                        hash: data.result[i].hash,
                        fee: Number(data.result[i].fee),
                        value: Math.abs(data.result[i].amountTransferred),
                        timestamp: data.result[i].time,
                        ValueInDollar: data.result[i].ValueInDollor
                    }
                )

            }
        }
    } catch (error) {
        isError = true
        ErrorText = error
    }

    console.log('ssss')
    console.log(
        {
            isError,
            address,
            symbole,
            inputs,
            outputs,
            label:mainLabel,
            tag:maintag,
            entity:mainEntity
        }
    )

    return (
        {
            isError,
            address,
            symbole,
            inputs,
            outputs,
            label:mainLabel,
            tag:maintag,
            entity:mainEntity
        }
    )
}