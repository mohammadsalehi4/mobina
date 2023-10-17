/* eslint-disable no-mixed-operators */
/* eslint-disable prefer-const */
/* eslint-disable array-bracket-newline */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-duplicate-imports

import React, { useRef, useEffect, useState } from "react"
import { DataSet, Network } from 'vis'
import { useSelector, useDispatch } from "react-redux"

//Page Coordinates
let Page = [];
const PageNumber = 500
for (let i = 0; i < (PageNumber * 2) - 1; i++) {
  let row = [];
  for (let j = 0; j < (PageNumber * 2) - 1; j++) {
    row.push(0);
  }
  Page.push(row);
}
const SetPage = (x, y) => {
  Page[y][x + PageNumber] = 1
}
const CheckPage = (x, y) => {
  if (Page[y][x + PageNumber] === 0) {
    return true
  } else {
    return false
  }
}
const DeletePage = (x, y) => {
  Page[x + PageNumber][y + PageNumber] = 0
}
const resetPage = () => {
  for (let i = 0; i < (PageNumber * 2) - 1; i++) {
    for (let j = 0; j < (PageNumber * 2) - 1; j++) {
     Page[i][j] = 0
    }
  }
}

const LongestColomn = () => {
  let Longest = 0
  let CNumber = 0
  for (let i = 0; i < (PageNumber * 2) - 1; i++) {
    if (Page[0][i] === 1) {
      for (let j = 0; j < (PageNumber * 2) - 1; j++) {
        if (Page[j][i] === 1) {
          Longest++
        }
      }
      if (CNumber < Longest) {
        CNumber = Longest
      }
      Longest = 0
    }
  } 
  return CNumber
}

const FuckingGraph = () => {
  const networkRef = useRef(null)
  const dispatch = useDispatch()
  const States = useSelector(state => state)

  
  //set Default full data
  const [GraphData, SetGraphData] = useState([])
  const [Distance, SetDistance] = useState(300)

  useEffect(() => {
    if (States.GraphData.length > 0) {
      let AllNodes = []
      for (let i = 0; i < States.GraphData.length; i++) {
        const myFrom = []
        const myTo = []
        let DefaultX = null
        let myData = {}
        for (let j = 0; j < States.GraphData[i].inputs.length; j++) {
          myFrom.push({
            address:States.GraphData[i].inputs[j].hash,
            value:States.GraphData[i].inputs[j].value,
            symbole:States.GraphData[i].inputs[j].symbole
          })
          if (AllNodes.find(item => item.address === States.GraphData[i].inputs[j].hash) !== undefined) {
            DefaultX = AllNodes.find(item => item.address === States.GraphData[i].inputs[j].hash).x - 1
          }
        }
        for (let j = 0; j < States.GraphData[i].outputs.length; j++) {
          myTo.push({
            address:States.GraphData[i].outputs[j].hash,
            value:States.GraphData[i].outputs[j].value,
            symbole:States.GraphData[i].outputs[j].symbole
          })
          if (AllNodes.find(item => item.address === States.GraphData[i].outputs[j].hash) !== undefined) {
            DefaultX = AllNodes.find(item => item.address === States.GraphData[i].outputs[j].hash).x + 1
          }
        }

        if (DefaultX !== null) {
          AllNodes.push({
            id: (AllNodes.length + 1),
            address:States.GraphData[i].address,
            from:myFrom,
            to:myTo,
            symbole:'ETH',
            group:'main',
            mode:'main',
            x: DefaultX
          }) 
          myData = {
            id: (AllNodes.length + 1),
            address:States.GraphData[i].address,
            from:myFrom,
            to:myTo,
            symbole:'ETH',
            group:'main',
            mode:'main',
            x: DefaultX
          }
        } else {
          AllNodes.push({
            id: (AllNodes.length + 1),
            address:States.GraphData[i].address,
            from:myFrom,
            to:myTo,
            symbole:'ETH',
            group:'main',
            mode:'main',
            x: i * 2
          }) 
          myData = {
            id: (AllNodes.length + 1),
            address:States.GraphData[i].address,
            from:myFrom,
            to:myTo,
            symbole:'ETH',
            group:'main',
            mode:'main',
            x: i * 2
          }
        }

        //mokhtasat X
        for (let j = 0; j < States.GraphData[i].inputs.length; j++) {
          if (AllNodes.find(item => item.address === States.GraphData[i].inputs[j].hash) === undefined) {
            AllNodes.push({
              address:States.GraphData[i].inputs[j].hash,
              id: (AllNodes.length + 1),
              value:States.GraphData[i].inputs[j].value,
              mode:'in',
              symbole:'ETH',
              group:'mid',
              x: myData.x + 1
            })
          }
        }
        for (let j = 0; j < States.GraphData[i].outputs.length; j++) {
          if (AllNodes.find(item => item.address === States.GraphData[i].outputs[j].hash) === undefined) {
            AllNodes.push({
              address:States.GraphData[i].outputs[j].hash,
              id: (AllNodes.length + 1),
              value:States.GraphData[i].outputs[j].value,
              mode:'out',
              symbole:'ETH',
              group:'mid',
              x: myData.x - 1
            })
          }
        }
      }

      //eslah mokhtasat
      for (let i = 0; i < AllNodes.length; i++) {
        if (AllNodes[i].group === 'mid') {
          let check = false
          let checkNumber = 0
          if (AllNodes[i].mode === 'out') {
            for (let j = 0; j < AllNodes.length; j++) {
              if (AllNodes[j].group === 'main') {
                for (let k = 0; k < AllNodes[j].from.length; k++) {
                  if ((AllNodes[j].from[k].address) === AllNodes[i].address) {
                    checkNumber++
                    if (AllNodes[j].x < AllNodes[i].x) {
                      check = true
                    }
                  }
                }
                for (let k = 0; k < AllNodes[j].to.length; k++) {
                  if ((AllNodes[j].to[k].address) === AllNodes[i].address) {
                    checkNumber++
                  }
                }
              }
            }
            if (!check && checkNumber >= 2) {
              AllNodes[i].x = AllNodes[i].x + 2
            }
          } else {
            for (let j = 0; j < AllNodes.length; j++) {
              if (AllNodes[j].group === 'main') {
                for (let k = 0; k < AllNodes[j].to.length; k++) {
                  if ((AllNodes[j].to[k].address) === AllNodes[i].address) {
                    checkNumber++
                    if (AllNodes[j].x > AllNodes[i].x) {
                      check = true
                    }
                  }
                }
                for (let k = 0; k < AllNodes[j].from.length; k++) {
                  if ((AllNodes[j].from[k].address) === AllNodes[i].address) {
                    checkNumber++
                  }
                }
              }
            }
            if (!check && checkNumber >= 2) {
              AllNodes[i].x = AllNodes[i].x - 2
            }
          }
        }
      }

      SetGraphData(AllNodes)
    }
  }, [States.GraphData, States.MotherFucker])

  useEffect(() => {
    //Nodes
    const nodes = new DataSet();
    resetPage()
    for (let i = 0; i < GraphData.length; i++) {
      let check = true
      let y = 0
      while (check) {
        if (CheckPage(GraphData[i].x, y)) {
          const newNode = {
            id: GraphData[i].id,
            x: GraphData[i].x * Distance,
            y: 800 - (100 * y),
            group: GraphData[i].group,
            address:GraphData[i].address,
            image:`/public/images/Location.png`,
            label: `...${(GraphData[i].address).substring(0, 7)}`
          }
          SetPage(GraphData[i].x, y)
          nodes.add(newNode)
          check = false
        }
        y++
      }
    }

    //edges
    const edges = new DataSet([])
    for (let i = 0; i < GraphData.length; i++) {
      if (GraphData[i].mode === 'main') {
        for (let j = 0; j < GraphData[i].from.length; j++) {
          const newEdge = {
            from:GraphData.find(item => item.address === GraphData[i].from[j].address).id,
            to:GraphData[i].id,
            label:`\u200E${String(GraphData[i].from[j].value)} ${GraphData[i].from[j].symbole}`
          }
          edges.add(newEdge)
        }
        for (let j = 0; j < GraphData[i].to.length; j++) {
          const newEdge = {
            from:GraphData[i].id,
            to:GraphData.find(item => item.address === GraphData[i].to[j].address).id,
            label:`\u200E${String(GraphData[i].to[j].value)} ${GraphData[i].to[j].symbole}`
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
          if (clickedNode.group === 'main') {
            dispatch({type:"SETWDetail", value:(clickedNode.address)})
            dispatch({type:"SETshowWalletData", value:true})
            dispatch({type:"SETSHOWTRANSACTIONDATA", value:false})
          } else if (clickedNode.group === 'mid') {
            dispatch({type:"SETWDetail", value:(clickedNode.address)})
            dispatch({type:"SETshowWalletData", value:false})
            dispatch({type:"SETSHOWTRANSACTIONDATA", value:true})
          } 
        }
    })

    network.moveTo(States.Zoom);

    network.on("zoom", function (params) {
      let position = States.Zoom
      console.log(params) 
      position.scale = params.scale
      dispatch({type:"Zoom",
        value:position
      })
    })

    network.on("dragEnd", function (params) {
      let position = States.Zoom
      position.position.x = params.pointer.canvas.x
      position.position.y = params.pointer.canvas.y
      dispatch({type:"Zoom",
        value:position
      })
    })

    SetDistance(300 + (100 * Math.abs(LongestColomn() / 4)))

    console.log(LongestColomn())

  }, [, GraphData, Distance, States.Zoom])

  return <div ref={networkRef} style={{height:"calc(100% - 40px)", width:"100%" }}></div>
}

export default FuckingGraph