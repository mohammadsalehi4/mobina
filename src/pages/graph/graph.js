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
import { digitsEnToFa } from 'persian-tools'

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

const getMyTime = (index) => {
    
  const date = new Date(index * 1000)
  let month
  let day
  let hour
  let minute

  if (String(Number(date.getMonth()) + 1).length === 1) {
    month = `0${date.getMonth() + 1}`
  } else {
    month = date.getMonth() + 1
  }

  if (String(date.getDate()).length === 1) {
    day = `0${date.getDate()}`
  } else {
    day = date.getDate()
  }

  if (String(date.getHours()).length === 1) {
    hour = `0${date.getHours()}`
  } else {
    hour = date.getHours()
  }

  if (String(date.getMinutes()).length === 1) {
    minute = `0${date.getMinutes()}`
  } else {
    minute = date.getMinutes()
  }

  return ({
    year:date.getFullYear(),
    month,
    day,
    hour,
    minute
  })
}

const FuckingGraph = (props) => {
  const networkRef = useRef(null)
  const dispatch = useDispatch()
  const States = useSelector(state => state)
  
  //set Default full data
  const [GraphData, SetGraphData] = useState([])
  const [Distance, SetDistance] = useState(300)
  const [NewPositions, SetNewPositions] = useState(States.NodesPosition)

  const [SavedPositions, SetSavedPositions] = useState([])
  
  useEffect(() => {

    //set nodes data
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
            symbole:States.GraphData[i].inputs[j].symbole,
            timestamp:States.GraphData[i].inputs[j].timeStamp,
            valueInDollar:States.GraphData[i].inputs[j].valueInDollar
          })
          if (AllNodes.find(item => item.address === States.GraphData[i].inputs[j].hash) !== undefined) {
            DefaultX = AllNodes.find(item => item.address === States.GraphData[i].inputs[j].hash).x - 1
          }
        }
        for (let j = 0; j < States.GraphData[i].outputs.length; j++) {
          myTo.push({
            address:States.GraphData[i].outputs[j].hash,
            value:States.GraphData[i].outputs[j].value,
            symbole:States.GraphData[i].outputs[j].symbole,
            timestamp:States.GraphData[i].outputs[j].timeStamp,
            valueInDollar:States.GraphData[i].outputs[j].valueInDollar
          })
          if (AllNodes.find(item => item.address === States.GraphData[i].outputs[j].hash) !== undefined) {
            DefaultX = AllNodes.find(item => item.address === States.GraphData[i].outputs[j].hash).x + 1
          }
        }

        if (DefaultX !== null) {
          AllNodes.push({
            id: States.GraphData[i].address,
            address:States.GraphData[i].address,
            from:myFrom,
            to:myTo,
            symbole:'ETH',
            group:'main',
            mode:'main',
            x: DefaultX
          }) 
          myData = {
            id: States.GraphData[i].address,
            address:States.GraphData[i].address,
            from:myFrom,
            to:myTo,
            symbole:'ETH',
            group:'main',
            mode:'main',
            x: DefaultX
          }
        } else {
          if (SavedPositions.some(item => item.id.toUpperCase() === States.GraphData[i].address.toUpperCase())) {
            const getX = SavedPositions.find(item => item.id.toUpperCase() === States.GraphData[i].address.toUpperCase()).x
            AllNodes.push({
              id: States.GraphData[i].address,
              address:States.GraphData[i].address,
              from:myFrom,
              to:myTo,
              symbole:'ETH',
              group:'main',
              mode:'main',
              x: getX
            }) 
            myData = {
              id: States.GraphData[i].address,
              address:States.GraphData[i].address,
              from:myFrom,
              to:myTo,
              symbole:'ETH',
              group:'main',
              mode:'main',
              x: getX
            }
          } else {
            AllNodes.push({
              id: States.GraphData[i].address,
              address:States.GraphData[i].address,
              from:myFrom,
              to:myTo,
              symbole:'ETH',
              group:'main',
              mode:'main',
              x: i * 2
            }) 
            myData = {
              id: States.GraphData[i].address,
              address:States.GraphData[i].address,
              from:myFrom,
              to:myTo,
              symbole:'ETH',
              group:'main',
              mode:'main',
              x: i * 2
            }
          }
        }

        //mokhtasat X
        for (let j = 0; j < States.GraphData[i].inputs.length; j++) {
          if (AllNodes.find(item => item.address === States.GraphData[i].inputs[j].hash) === undefined) {
            let getX

            if (SavedPositions.some(item => item.id.toUpperCase() === States.GraphData[i].inputs[j].hash.toUpperCase())) {
              getX = SavedPositions.find(item => item.id.toUpperCase() === States.GraphData[i].inputs[j].hash.toUpperCase()).x
            } else {
              getX = myData.x + 1
            }

            AllNodes.push({
              address:States.GraphData[i].inputs[j].hash,
              id: States.GraphData[i].inputs[j].hash,
              value:States.GraphData[i].inputs[j].value,
              mode:'in',
              symbole:States.Network,
              group:'mid',
              x: getX
            })
          }
        }
        for (let j = 0; j < States.GraphData[i].outputs.length; j++) {
          if (AllNodes.find(item => item.address === States.GraphData[i].outputs[j].hash) === undefined) {
              let getX

              if (SavedPositions.some(item => item.id.toUpperCase() === States.GraphData[i].outputs[j].hash.toUpperCase())) {
                getX = SavedPositions.find(item => item.id.toUpperCase() === States.GraphData[i].outputs[j].hash.toUpperCase()).x
              } else {
                getX = myData.x - 1
              }

              AllNodes.push({
                address:States.GraphData[i].outputs[j].hash,
                id: States.GraphData[i].outputs[j].hash,
                value:States.GraphData[i].outputs[j].value,
                mode:'out',
                symbole:States.Network,
                group:'mid',
                x: getX
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

      dispatch({type:"itemNumbers", value:AllNodes.length})

      SetGraphData(AllNodes)
      SetSavedPositions(AllNodes)
    }
  }, [States.GraphData, States.BeGraphReload])

  useEffect(() => {
    //Nodes
    const nodes = new DataSet();
    resetPage()
    for (let i = 0; i < GraphData.length; i++) {
      let check = true
      let y = 0
      while (check) {
        if (CheckPage(GraphData[i].x, y)) {
          let newNode
          if (GraphData[i].group === 'main') {
            newNode = {
              id: GraphData[i].id,
              x: GraphData[i].x * Distance,
              y: 800 - (100 * y),
              group: GraphData[i].group,
              address:GraphData[i].address,
              image:`/public/images/Location.png`,
              label: `...${(GraphData[i].address).substring(0, 7)}`
            }
          } else if (GraphData[i].group === 'mid') {
            newNode = {
              id: GraphData[i].id,
              x: GraphData[i].x * Distance,
              y: 800 - (100 * y),
              group: GraphData[i].group,
              address:GraphData[i].address,
              image:`/public/images/Location.png`,
              label: GraphData[i].symbole
            }
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
    //show or not Details
    for (let i = 0; i < GraphData.length; i++) {
      if (States.showValues) {
        if (States.showTime) {
          if (States.showDollar) {
            //dollar time value
            if (GraphData[i].mode === 'main') {
              for (let j = 0; j < GraphData[i].from.length; j++) {
                const newEdge = {
                  from:GraphData.find(item => item.address === GraphData[i].from[j].address).id,
                  to:GraphData[i].id,
                  label:`\u200E${String((GraphData[i].from[j].valueInDollar).toFixed(5))} USD \n \u200E${(getMyTime(GraphData[i].from[j].timestamp).year)}/${(getMyTime(GraphData[i].from[j].timestamp).month)}/${(getMyTime(GraphData[i].from[j].timestamp).day)} - ${(getMyTime(GraphData[i].from[j].timestamp).hour)}:${(getMyTime(GraphData[i].from[j].timestamp).minute)}`
                }
                edges.add(newEdge)
              }
              for (let j = 0; j < GraphData[i].to.length; j++) {
                const newEdge = {
                  from:GraphData[i].id,
                  to:GraphData.find(item => item.address === GraphData[i].to[j].address).id,
                  label:`\u200E${String((GraphData[i].to[j].valueInDollar).toFixed(5))} USD \n \u200E${(getMyTime(GraphData[i].to[j].timestamp).year)}/${(getMyTime(GraphData[i].to[j].timestamp).month)}/${(getMyTime(GraphData[i].to[j].timestamp).day)} - ${(getMyTime(GraphData[i].to[j].timestamp).hour)}:${(getMyTime(GraphData[i].to[j].timestamp).minute)}`
                }
                edges.add(newEdge)
              }
            }
          } else {
            //time value
            if (GraphData[i].mode === 'main') {
              for (let j = 0; j < GraphData[i].from.length; j++) {
                const newEdge = {
                  from:GraphData.find(item => item.address === GraphData[i].from[j].address).id,
                  to:GraphData[i].id,
                  label:`\u200E${String(GraphData[i].from[j].value)} ${GraphData[i].from[j].symbole} \n \u200E${(getMyTime(GraphData[i].from[j].timestamp).year)}/${(getMyTime(GraphData[i].from[j].timestamp).month)}/${(getMyTime(GraphData[i].from[j].timestamp).day)} - ${(getMyTime(GraphData[i].from[j].timestamp).hour)}:${(getMyTime(GraphData[i].from[j].timestamp).minute)}`
                }
                edges.add(newEdge)
              }
              for (let j = 0; j < GraphData[i].to.length; j++) {
                const newEdge = {
                  from:GraphData[i].id,
                  to:GraphData.find(item => item.address === GraphData[i].to[j].address).id,
                  label:`\u200E${String(GraphData[i].to[j].value)} ${GraphData[i].to[j].symbole} \n \u200E${(getMyTime(GraphData[i].to[j].timestamp).year)}/${(getMyTime(GraphData[i].to[j].timestamp).month)}/${(getMyTime(GraphData[i].to[j].timestamp).day)} - ${(getMyTime(GraphData[i].to[j].timestamp).hour)}:${(getMyTime(GraphData[i].to[j].timestamp).minute)}`
                }
                edges.add(newEdge)
              }
            }
          }
        } else {
          if (States.showDollar) {
            //dollar value            
            if (GraphData[i].mode === 'main') {
              for (let j = 0; j < GraphData[i].from.length; j++) {
                const newEdge = {
                  from:GraphData.find(item => item.address === GraphData[i].from[j].address).id,
                  to:GraphData[i].id,
                  label:`\u200E${String((GraphData[i].from[j].valueInDollar).toFixed(5))} USD`
                }
                edges.add(newEdge)
              }
              for (let j = 0; j < GraphData[i].to.length; j++) {
                const newEdge = {
                  from:GraphData[i].id,
                  to:GraphData.find(item => item.address === GraphData[i].to[j].address).id,
                  label:`\u200E${String((GraphData[i].to[j].valueInDollar).toFixed(5))} USD`
                }
                edges.add(newEdge)
              }
            }
          } else {
            //value
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
        }
      } else {
        //nothing
        if (GraphData[i].mode === 'main') {
          for (let j = 0; j < GraphData[i].from.length; j++) {
            const newEdge = {
              from:GraphData.find(item => item.address === GraphData[i].from[j].address).id,
              to:GraphData[i].id
            }
            edges.add(newEdge)
          }
          for (let j = 0; j < GraphData[i].to.length; j++) {
            const newEdge = {
              from:GraphData[i].id,
              to:GraphData.find(item => item.address === GraphData[i].to[j].address).id
            }
            edges.add(newEdge)
          }
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

    network.on("click", function(params) {
      if (params.nodes.length === 0 && params.edges.length === 0) {
        dispatch({type:"SETshowWalletData", value:false})
        dispatch({type:"SETSHOWTRANSACTIONDATA", value:false})
      }
    });

    network.moveTo({scale:(States.Scale), position:{x:States.positionX, y:States.positionY}});
    
    for (let i = 0; i < States.NodesPosition.length; i++) {
      network.moveNode(States.NodesPosition[i].id, States.NodesPosition[i].x, States.NodesPosition[i].y);
    }

    network.on("zoom", function (params) {
      dispatch({type:"Scale", value:(params.scale)})
    })

    //save new position after drag nodes
    network.on("dragEnd", function () {
      var FullPosition = network.getViewPosition();
      dispatch({type:"positionX", value:(FullPosition.x)})
      dispatch({type:"positionY", value:(FullPosition.y)})
    })

    //save new position after drag nodes
    network.on("dragEnd", function (params) {
      var MyNodeId = params.nodes[0];
      if (MyNodeId) {
        // گرفتن مختصات جدید گره
        var newPosition = network.getPositions(MyNodeId);
        if (NewPositions.some(item => item.id === MyNodeId)) {
          NewPositions.find(item => item.id === MyNodeId).x = newPosition[MyNodeId].x
          NewPositions.find(item => item.id === MyNodeId).y = newPosition[MyNodeId].y
          dispatch({type:"NodesPosition", value:NewPositions})
          dispatch({type:"BeGraphReload", value:!States.BeGraphReload})
        } else {
          const AddNewPosition = NewPositions
          AddNewPosition.push(
            {
              id : MyNodeId,
              x : newPosition[MyNodeId].x,
              y : newPosition[MyNodeId].y
            }
          )
          SetNewPositions(AddNewPosition)
          dispatch({type:"NodesPosition", value:NewPositions})
        }
      }
    });

    console.log()

  }, [, GraphData, Distance, States.Scale, States.showValues, States.showTime, States.showDollar, States.BeGraphReload])

  return <div ref={networkRef} style={{height:"calc(100%)", width:"100%", transition:'0.3s' }}></div>
}

export default FuckingGraph
