/* eslint-disable no-mixed-operators */
/* eslint-disable prefer-const */
/* eslint-disable array-bracket-newline */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-duplicate-imports

//FuckingGraph1

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
  Page[x + PageNumber][y + PageNumber] = 1
}
const CheckPage = (x, y) => {
  if (Page[x + PageNumber][y + PageNumber] === 0) {
    return true
  } else {
    return false
  }
}
const DeletePage = (x, y) => {
  Page[x + PageNumber][y + PageNumber] = 0
}

const FuckingGraph = () => {
  const networkRef = useRef(null)
  const dispatch = useDispatch()
  const States = useSelector(state => state)

  
  //set Default full data
  const [GraphData, SetGraphData] = useState([])
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
      SetGraphData(AllNodes)
    }
  }, [States.GraphData])

  useEffect(() => {

    //Nodes
    const nodes = new DataSet();
    for (let i = 0; i < GraphData.length; i++) {
      var number = 0
      for (let j = 0; j < 200; j++) {
        if (CheckPage(GraphData[i].x, j)) {
          const newNode = {
            id: GraphData[i].id,
            group: GraphData[i].group,
            address:GraphData[i].address,
            image:`/images/Location.png`,
            label: `...${(GraphData[i].address).substring(0, 7)}`,
            x: GraphData[i].x * 200,
            y: 800 - (100 * j)
          }
          nodes.add(newNode)
          SetPage(GraphData[i].x, j)
          j = 201
        } else {
          number++
        }
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
            console.log(clickedNode.group)
            if (clickedNode.group === 'main') {
              dispatch({type:"SETWDetail", value:(clickedNode.address)})
              dispatch({type:"SETshowWalletData", value:true})
              dispatch({type:"SETSHOWTRANSACTIONDATA", value:false})
            } 
          }
      });

  }, [, GraphData])

  return <div ref={networkRef} style={{height:"700px", width:"100%" }}></div>
}

export default FuckingGraph