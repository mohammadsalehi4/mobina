/* eslint-disable no-mixed-operators */
/* eslint-disable prefer-const */
/* eslint-disable array-bracket-newline */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-duplicate-imports
import React, { useRef, useEffect } from "react"
import { DataSet, Network } from 'vis'
import { useSelector, useDispatch } from "react-redux"

let Page = [];
const PageNumber = 200
for (let i = 0; i < (PageNumber * 2) - 1; i++) {
  let row = [];
  for (let j = 0; j < (PageNumber * 2) - 1; j++) {
    row.push(0);
  }
  Page.push(row);
}

const SetPage = (x, y) => {
  Page[x + PageNumber][y + PageNumber] = 1
}

const CheckPage = (x, y) => {
  if (Page[x + PageNumber][y + PageNumber] === 0) {
    return true
  } else {
    return false
  }
}

const PupPage = (x, y) => {
  Page[x + PageNumber][y + PageNumber] = 0
}

let NodeData = []

const TrData = []

const GraphDraw = () => {
  const networkRef = useRef(null)
  const dispatch = useDispatch()
  const States = useSelector(state => state)

  useEffect(() => {
    NodeData = []

    //add main address transactions
    let Mainoutputs = []
    let MainInputs = []
    for (let i = 0; i < States.GraphData.inputs.length; i++) {
      try {
        for (let j = 0; j < States.GraphData.inputs[i].inputs.length; i++) {
          MainInputs.push({
            address:States.GraphData.inputs[i].inputs[j].address,
            date:'2011/07/07',
            time:'22:29',
            amount:States.GraphData.inputs[i].inputs[j].amount
          })
        }
      } catch (error) {}
    }
    for (let i = 0; i < States.GraphData.outputs.length; i++) {
      try {
        for (let j = 0; j < States.GraphData.outputs[i].outputs.length; i++) {
          Mainoutputs.push({
            address:States.GraphData.outputs[i].outputs[j].address,
            date:'2011/07/07',
            time:'22:29',
            amount:States.GraphData.outputs[i].outputs[j].amount
          })
        }
      } catch (error) {}
    }

    NodeData.push({
      address:States.GraphData.address,
      x:0,
      y:0,
      id:5000,
      image:'ETH',
      in:MainInputs,
      out:Mainoutputs
    })

    let Num = 0
    for (let i = 0; i < States.GraphData.inputs.length; i++) {
      try {
        for (let j = 0; j < States.GraphData.inputs[i].inputs.length; i++) {
          if (!NodeData.some(obj => obj.address === States.GraphData.inputs[i].inputs[j].address)) {
            NodeData.push({
              address:States.GraphData.inputs[i].inputs[j].address,
              x:2,
              y:-Num,
              id:Num + 1,
              image:'ETH',
              in:[
                {
                  address:States.GraphData.inputs[0].inputs[0].address,
                  date:'2011/07/07',
                  time:'22:29',
                  amount:States.GraphData.inputs[0].inputs[0].amount
                }
              ],
              out:[
                {
                  address:States.GraphData.outputs[0].outputs[0].address,
                  date:'2011/07/07',
                  time:'22:29',
                  amount:States.GraphData.outputs[0].outputs[0].amount
                }
              ]
            })
            Num++
          }
        }
      } catch (error) {}
    }

    let Num2 = 0
    for (let i = 0; i < States.GraphData.outputs.length; i++) {
      try {
        for (let j = 0; j < States.GraphData.outputs[i].outputs.length; i++) {
          if (!NodeData.some(obj => obj.address === States.GraphData.outputs[i].outputs[j].address)) {
            NodeData.push({
              address:States.GraphData.outputs[i].outputs[j].address,
              x:-2,
              y:-Num2,
              id:(Num + 1),
              image:'ETH',
              in:[
                {
                  address:States.GraphData.inputs[0].inputs[0].address,
                  date:'2011/07/07',
                  time:'22:29',
                  amount:States.GraphData.inputs[0].inputs[0].amount
                }
              ],
              out:[
                {
                  address:States.GraphData.outputs[0].outputs[0].address,
                  date:'2011/07/07',
                  time:'22:29',
                  amount:States.GraphData.outputs[0].outputs[0].amount
                }
              ]
            })
            Num2++
            Num++
          }
        }
      } catch (error) {}
    }

    let Num3 = 0
    for (let i = 0; i < States.GraphData.inputs.length; i++) {
      try {
        for (let j = 0; j < States.GraphData.inputs[i].inputs.length; i++) {
          TrData.push({
            address:States.GraphData.inputs[i].hash,
            date:'2011/06/21',
            time:'22:28',
            fee:0,
            Amount:22222,
            x:1,
            y:Num3,
            id:Num3 + 1,
            in:[
                {
                    address:States.GraphData.inputs[i].inputs[j].address,
                    id:(NodeData[NodeData.findIndex(obj => obj.address === States.GraphData.inputs[i].inputs[j].address)]).id,
                    amount:States.GraphData.inputs[i].inputs[j].amount,
                    name:'ETH'
                }
            ],
            out:[
                {
                    address:States.GraphData.address,
                    id:(NodeData[NodeData.findIndex(obj => obj.address === States.GraphData.address)]).id,
                    amount:States.GraphData.inputs[i].inputs[j].amount,
                    name:'ETH'
                }
            ]
          })
          Num3++
        }
      } catch (error) {}
    }

    let Num4 = 0
    for (let i = 0; i < States.GraphData.outputs.length; i++) {
      try {
        for (let j = 0; j < States.GraphData.outputs[i].outputs.length; i++) {
          TrData.push({
            address:States.GraphData.outputs[i].hash,
            date:'2011/06/21',
            time:'22:28',
            fee:0,
            Amount:22222,
            x:-1,
            y:Num4,
            id:(Num4 + 1) + Num3,
            in:[
                {
                  address:States.GraphData.address,
                  id:(NodeData[NodeData.findIndex(obj => obj.address === States.GraphData.address)]).id,
                  amount:States.GraphData.outputs[i].outputs[j].amount,
                  name:'ETH'
                }
            ],
            out:[
                {
                  address:States.GraphData.outputs[i].outputs[j].address,
                  id:(NodeData[NodeData.findIndex(obj => obj.address === States.GraphData.outputs[i].outputs[j].address)]).id,
                  amount:States.GraphData.outputs[i].outputs[j].amount,
                  name:'ETH'
                }
            ]
          })
          Num4++
        }
      } catch (error) {}
    }
    console.log(TrData)
  }, [])

  useEffect(() => {

    const nodes = new DataSet(
      Array.from({ length: NodeData.length }, (_, index) => ({
        id: NodeData[index].id,
        group: "main",
        image:`/images/Location.png`,
        label: `...${(NodeData[index].address).substring(0, 7)}`,
        x: (NodeData[index].x) * 200 * (TrData.length / 2),
        y: (((NodeData[index].y) * 200) + 800) 
      }))
    );

    for (let i = 0; i < TrData.length; i++) {
      if (TrData[i].in.length > 0 && TrData[i].out.length) {
        const newNode = {
          id: -TrData[i].id, 
          group: "mid",
          x: (TrData[i].x) * 200 * (TrData.length / 2),
          y: (800 - (TrData[i].y) * 200)
        };
        nodes.add(newNode); // اضافه کردن گره جدید به آرایه اصلی
      }
    }

    const edges = new DataSet([])


    for (let i = 0; i < TrData.length; i++) {
      if (TrData[i].in.length > 0 && TrData[i].out.length > 0) {
        for (let j = 0; j < TrData[i].in.length; j++) {
          const newEdge = {
            from: TrData[i].in[j].id,
            to: -TrData[i].id,
            label:`\u200E${String(TrData[i].in[j].amount.toFixed(2))} ${TrData[i].in[j].name}`
          }
          edges.add(newEdge)
        }
        for (let j = 0; j < TrData[i].out.length; j++) {
          const newEdge = {
            from: -TrData[i].id,
            to: TrData[i].out[j].id,
            label:`\u200E${String(TrData[i].out[j].amount.toFixed(2))} ${TrData[i].out[j].name}`
          }
          edges.add(newEdge)
        }
      }
    }

    const data = {
      nodes,
      edges
    }

  const options = {
    layout: {
      hierarchical: false
    },
    physics: false,

    edges: {
        color: "#000000",
        width:1.2,
        border: {
        color: "String",
        width: "Number",
        style: "String"
        },
        smooth: {
          type: 'cubicBezier',
          forceDirection:'horizontal',
          roundness: 0.4
        },
        strokeWidth: 2,
        arrows: {
        to: {
            enabled: true
        }
        },
        font: { size: 14, align: "middle", family: "Vazir", align: 'horizontal', background:"white"},
        color: "#2f4f4f",
        fixed: true
    },
    nodes:{
        borderWidth:1,
        color: {
            border: "white",
            background:"white"
          },
        size:15,
        font:{
            
        }
    },
    interaction: {
        selectable: true,
        hover: false,
        hoverConnectedEdges: false,
        dragNodes:true
    },
    groups: {
        //گره های واسط
        mid:{
          shape:'dot',
          size:6,
          font: { size: 13, family:"Arial", color:'#2f4f4f'  },
          color:{
              border: '#2f4f4f',
              background:'#2f4f4f',
              highlight: {
                background: '#2f4f4f',
                border: '#2f4f4f'
              }
          },
          borderWidth: 0,
          borderColor:"#2f4f4f"
        },
        //گره اصلی
        main:{
            shape:'icon',
            icon: {
              face: 'FontAwesome',
              code: '\uf007',  // This is a user icon as an example
              size: 50,
              color: 'black'
          },
          font: { size: 13, family:"Arial", color:'#2f4f4f', align: 'left'},
          color:{
              border: '#2f4f4f'
          },
          borderWidth: 2,
          align: 'horizontal',
          // image:"/images/location.png",
          borderColor:"#2f4f4f",            
          shape:'circularImage'
        },
        //فرستنده ها
        sender:{
            shape:'dot',
          font: { size: 13, family:"Arial", color:'#2f4f4f'  },
          color:{
              border: '#2f4f4f'
          },
          borderWidth: 3,
          align: 'horizontal',
          image:"/images/greenLocation.png",
          borderColor:"#2f4f4f",            
          shape:'circularImage'
        },
        //گیرنده ها
        reciver:{
            shape:'dot',
          font: { size: 13, family:"Arial", color:'#2f4f4f'  },
          color:{
              border: '#2f4f4f'
          },
          borderWidth: 3,
          align: 'horizontal',
          image:"/images/redLocation.png",
          borderColor:"#2f4f4f",            
          shape:'circularImage'
        }
      }
    }

    const network = new Network(networkRef.current, data, options)

    network.on("click", function(params) {
        const nodeId = params.nodes[0];
        if (nodeId) {
          const clickedNode = nodes.get(nodeId);
          if (nodeId === 5000) {
            dispatch({type:"SETshowWalletData", value:true})
            dispatch({type:"SETSHOWTRANSACTIONDATA", value:false})
            dispatch({type:"SETWDetail", value:NodeData[0]})
          } else if (clickedNode.id > 0) {
            dispatch({type:"SETshowWalletData", value:true})
            dispatch({type:"SETSHOWTRANSACTIONDATA", value:false})
            dispatch({type:"SETWDetail", value:NodeData[nodeId]})
          } else {
            dispatch({type:"SETSHOWTRANSACTIONDATA", value:true})
            dispatch({type:"SETshowWalletData", value:false})
            dispatch({type:"SETWDetail", value:TrData[(-nodeId) - 1]})
          }
        }
    });

  }, [])

  return <div ref={networkRef} style={{height:"700px", width:"100%" }}></div>
}

export default GraphDraw