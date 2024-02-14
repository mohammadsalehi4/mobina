/* eslint-disable no-use-before-define */
/* eslint-disable multiline-ternary */
/* eslint-disable object-shorthand */
/* eslint-disable no-mixed-operators */
/* eslint-disable prefer-const */
/* eslint-disable array-bracket-newline */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-duplicate-imports
import html2canvas from 'html2canvas';
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
  const [SavedPositions, SetSavedPositions] = useState(States.SavedPositions)
  const [Color, SetColor] = useState('red')
  const [EdgeSelected, SetEdgeSelected] = useState([])
  const [ColorBeReload, SetColorBeReload] = useState(States.graphAddColor)
  const [deleteColor, SetdeleteColor] = useState(States.graphAddColor)
  const [graphAddColor, SetgraphAddColor] = useState(States.graphAddColor)
  const [showDiv, SetShowDiv] = useState(true)
  const [startX, SetstartX] = useState(0)
  const [startY, SetstartY] = useState(0)
  const [MainStartX, SetMainStartX] = useState(0)
  const [MainStartY, SetMainStartY] = useState(0)
  const [moveX, SetmoveX] = useState(0)
  const [moveY, SetmoveY] = useState(0)
  const [mouseMode, SetMouseMode] = useState(true)
  const [DownloadGraph, SetDownloadGraph] = useState(States.downloadGraph)

  let k = States.edgesColors

  let selectionStart = { x: 0, y: 0 };
  let selectionEnd = { x: 0, y: 0 };

  let check = false
  let dragCheck = false

  useEffect(() => {
    dispatch({type:"BeGraphReload", value:!States.BeGraphReload})
  }, [Color, ColorBeReload, deleteColor, States.downloadGraph])

  useEffect(() => {
    SetMouseMode(States.mouseMode)
    if (States.mouseMode) {
      check = false
      SetShowDiv(false)
    } 
    dispatch({type:"BeGraphReload", value:!States.BeGraphReload})
  }, [States.mouseMode])

  //set nodes data
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
            symbole:States.GraphData[i].inputs[j].symbole,
            timestamp:States.GraphData[i].inputs[j].timeStamp,
            valueInDollar:States.GraphData[i].inputs[j].valueInDollar
          })
          if (AllNodes.find(item => item.address.toUpperCase() === States.GraphData[i].inputs[j].hash.toUpperCase()) !== undefined) {
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
          if (AllNodes.find(item => item.address.toUpperCase() === States.GraphData[i].outputs[j].hash.toUpperCase()) !== undefined) {
            DefaultX = AllNodes.find(item => item.address === States.GraphData[i].outputs[j].hash).x + 1
          }
        }

        if (DefaultX !== null) {

          let getX
          if (SavedPositions.some(item => item.id.toUpperCase() === States.GraphData[i].address.toUpperCase())) {
            getX = SavedPositions.find(item => item.id.toUpperCase() === States.GraphData[i].address.toUpperCase()).x
          } else {
            getX = DefaultX
          }

          AllNodes.push({
            id: States.GraphData[i].address,
            address:States.GraphData[i].address,
            Label:States.GraphData[i].Label,
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
            Label:States.GraphData[i].Label,
            from:myFrom,
            to:myTo,
            symbole:'ETH',
            group:'main',
            mode:'main',
            x: getX
          }
        } else {
          if (SavedPositions.some(item => item.id.toUpperCase() === States.GraphData[i].address.toUpperCase())) {
            const getX = SavedPositions.find(item => item.id.toUpperCase() === States.GraphData[i].address.toUpperCase()).x

            AllNodes.push({
              id: States.GraphData[i].address,
              address:States.GraphData[i].address,
              from:myFrom,
              Label:States.GraphData[i].Label,
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
              Label:States.GraphData[i].Label,
              to:myTo,
              symbole:'ETH',
              group:'main',
              mode:'main',
              x: getX
            }
          } else {
            console.log('not found')
            console.log(States.GraphData[i].address)
            AllNodes.push({
              id: States.GraphData[i].address,
              address:States.GraphData[i].address,
              from:myFrom,
              Label:States.GraphData[i].Label,
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
              Label:States.GraphData[i].Label,
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
          console.log('MID')
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
            
            console.log(
              {
                address:States.GraphData[i].inputs[j].hash,
                id: States.GraphData[i].inputs[j].hash,
                value:States.GraphData[i].inputs[j].value,
                mode:'in',
                symbole:States.Network,
                group:'mid',
                x: getX
              }
            )
          }
        }
        for (let j = 0; j < States.GraphData[i].outputs.length; j++) {
          console.log('MID')
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

              console.log(
                {
                  address:States.GraphData[i].outputs[j].hash,
                  id: States.GraphData[i].outputs[j].hash,
                  value:States.GraphData[i].outputs[j].value,
                  mode:'out',
                  symbole:States.Network,
                  group:'mid',
                  x: getX
                }
              )
          }
        }
      }

      dispatch({type:"itemNumbers", value:AllNodes.length})

      SetGraphData(AllNodes)
      console.log(AllNodes)
      SetSavedPositions(AllNodes)
      dispatch({type:"SavedPositions", value:AllNodes})
    }
  }, [States.GraphData, States.BeGraphReload])

  useEffect(() => {
    check = showDiv
  }, [showDiv])

  useEffect(() => {
    dispatch({type:"BeGraphReload", value:!States.BeGraphReload})
  }, [States.graphAddColor])

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
            let showLabel = false
            if (GraphData[i].Label) {
              showLabel = GraphData[i].Label
            } else {
              showLabel = `...${(GraphData[i].address).substring(0, 7)}`
            }
            newNode = {
              id: GraphData[i].id,
              x: GraphData[i].x * Distance,
              y: 800 - (100 * y),
              group: GraphData[i].group,
              address:GraphData[i].address,
              image:'images/location.png',
              label: showLabel
            }
          } else if (GraphData[i].group === 'mid') {
            newNode = {
              id: GraphData[i].id,
              x: GraphData[i].x * Distance,
              y: 800 - (100 * y),
              group: GraphData[i].group,
              address:GraphData[i].address,
              image:'images/location.png',
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

    //استایل نود ها و یال ها
    const MouseModeOptions = {
      layout: {
        hierarchical: false
      },
      physics: false,

      edges: {
          
          width:2,
          border: {
          
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
          
          color: {
            color: '#344461'
          },
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
              family:'Vazir'
          }
      },
      interaction: {
          selectable: true,
          hover: false,
          hoverConnectedEdges: false,
          dragNodes:false
      },
      interaction: {
        dragNodes: false,  // جلوگیری از جابجایی گره‌ها با موس
        dragView: false    // جلوگیری از پان کردن گراف با موس
      },
      groups: {
          //گره های واسط
          mid:{
            shape:'dot',
            size:6,
            font: { size: 13, family:"Arial", color:'#344461'  },
            color:{
                border: '#344461',
                background:'#344461',
                highlight: {
                  background: '#344461',
                  border: '#344461'
                }
            },
            borderWidth: 0,
            borderColor:"#344461"
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
            font: { size: 13, face:"Vazir", color:'#344461', align: 'left'},
            color:{
                border: '#344461'
            },
            borderWidth: 2,
            align: 'horizontal',
            // image:"/images/location.png",
            borderColor:"#344461",            
            shape:'circularImage'
          },
          //فرستنده ها
          sender:{
              shape:'dot',
            font: { size: 13, family:"Arial", color:'#344461'  },
            color:{
                border: '#344461'
            },
            borderWidth: 3,
            align: 'horizontal',
            image:"/images/greenLocation.png",
            borderColor:"#344461",            
            shape:'circularImage'
          },
          //گیرنده ها
          reciver:{
              shape:'dot',
            font: { size: 13, family:"Arial", color:'#344461'  },
            color:{
                border: '#344461'
            },
            borderWidth: 3,
            align: 'horizontal',
            image:"/images/redLocation.png",
            borderColor:"#344461",            
            shape:'circularImage'
          }
        }
    }
    const SingleOptions = {
      layout: {
        hierarchical: false
      },
      physics: false,

      edges: {
          color: "#000000",
          width:2,
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
          color: "#344461",
          color: {
            color: '#344461' // رنگ با HEX
          },
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
              family:'Vazir'
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
            font: { size: 13, family:"Arial", color:'#344461'  },
            color:{
                border: '#344461',
                background:'#344461',
                highlight: {
                  background: '#344461',
                  border: '#344461'
                }
            },
            borderWidth: 0,
            borderColor:"#344461"
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
            font: { size: 13, face:"Vazir", color:'#344461', align: 'left'},
            color:{
                border: '#344461'
            },
            borderWidth: 2,
            align: 'horizontal',
            // image:"/images/location.png",
            borderColor:"#344461",            
            shape:'circularImage'
          },
          //فرستنده ها
          sender:{
              shape:'dot',
            font: { size: 13, family:"Arial", color:'#344461'  },
            color:{
                border: '#344461'
            },
            borderWidth: 3,
            align: 'horizontal',
            image:"/images/greenLocation.png",
            borderColor:"#344461",            
            shape:'circularImage'
          },
          //گیرنده ها
          reciver:{
              shape:'dot',
            font: { size: 13, family:"Arial", color:'#344461'  },
            color:{
                border: '#344461'
            },
            borderWidth: 3,
            align: 'horizontal',
            image:"/images/redLocation.png",
            borderColor:"#344461",            
            shape:'circularImage'
          }
        }
    }
    let network

    //تغییر حالت موس
    if (mouseMode) {
      network = new Network(networkRef.current, data, MouseModeOptions)
    } else {
      network = new Network(networkRef.current, data, SingleOptions)
    }

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

    //save zoom and x and y of graph
    network.on("zoom", function (params) {
      dispatch({type:"Scale", value:(params.scale)})
    })

    //save new position of graph after drag
    network.on("dragEnd", function () {
      var FullPosition = network.getViewPosition();
      dispatch({type:"positionX", value:(FullPosition.x)})
      dispatch({type:"positionY", value:(FullPosition.y)})
    })

    //save new position of nodes after drag nodes
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

    //add color to edges
    edges.forEach(function (edge) {
      if (States.edgesColors.some(item => (item.from === edge.from && item.to === edge.to)) === true) {
        edges.update({
          id: edge.id,
          color: {
              color: States.edgesColors.find(item => (item.from === edge.from && item.to === edge.to)).color, // رنگ پیش‌فرض
              highlight: States.edgesColors.find(item => (item.from === edge.from && item.to === edge.to)).color, // رنگ حالت selected
              hover: States.edgesColors.find(item => (item.from === edge.from && item.to === edge.to)).color // رنگ حالت هاور (اختیاری)
          }
        });
      }
    });

  //*************************************************************************/

  //افزودن یال های سلکت شده به استیت مورد نظر
  function selectEdgesInRegion(network, edges, regionStart, regionEnd) {
    if (mouseMode) {
      const selectedEdges = [];
      const selectedEdgesData = [];
      const selectedNodes = [];
  
      edges.forEach((edge) => {
        let minX = Math.min(regionStart.x, regionEnd.x);
        let maxX = Math.max(regionStart.x, regionEnd.x);
        let minY = Math.min(regionStart.y, regionEnd.y);
        let maxY = Math.max(regionStart.y, regionEnd.y);
    
        const allNodePositions = network.getPositions();
        for (let nodeId in allNodePositions) {
          let nodePosition = allNodePositions[nodeId];
          // بررسی اینکه آیا گره داخل محدوده قرار دارد
          if (nodePosition.x >= minX && nodePosition.x <= maxX) {
            if (nodePosition.y >= minY && nodePosition.y <= maxY) {
              selectedNodes.push(nodeId)
            }
          }
        }
  
        if (selectedNodes.includes(edge.from) && selectedNodes.includes(edge.to)) {
          selectedEdges.push(edge.id)
          
          selectedEdgesData.push(
            {
              from:edge.from,
              to:edge.to,
              color:States.ColorType
            }
          )
        }
        
      });
      SetEdgeSelected(selectedEdgesData)
    }
  }

  //change color and add
  if (Color !== States.ColorType) {
    for (let i = 0; i < EdgeSelected.length; i++) {
      if (k.some(item => item.from === EdgeSelected[i].from && item.to === EdgeSelected[i].to) === false) {
        const newColor = {
          from:EdgeSelected[i].from,
          to:EdgeSelected[i].to,
          color:States.ColorType
        }
        k.push(newColor)
      } else {
        const index = k.findIndex(item => item.from === EdgeSelected[i].from && item.to === EdgeSelected[i].to)
        if (index !== -1) {
          k[index].color = States.ColorType
        }
      }
    }
    SetColor(States.ColorType)
  }

  //set last color
  if (States.graphAddColor !== ColorBeReload) {
    for (let i = 0; i < EdgeSelected.length; i++) {
      const newColor = {
        from:EdgeSelected[i].from,
        to:EdgeSelected[i].to,
        color:EdgeSelected[i].color
      }
      if (k.some(item => (item.from === EdgeSelected[i].from && item.to === EdgeSelected[i].to)) === false) {
        k.push(newColor)
      }
    }
    SetEdgeSelected([])
    dispatch({type:"edgesColors", value:k})
    SetColorBeReload(States.graphAddColor)
  }

  //اگر رنگ انتخاب شده تغییر نکرده بود، رنگ یال انتخاب شده رو تغییر بده
  if (States.graphAddColor !== graphAddColor) {
    for (let i = 0; i < EdgeSelected.length; i++) {
      if (k.some(item => (item.from === EdgeSelected[i].from && item.to === EdgeSelected[i].to)) === true) {
        const index = k.findIndex(item => (item.from === EdgeSelected[i].from && item.to === EdgeSelected[i].to))
        if (index !== -1) {
          k[index].color = States.ColorType
        }
      }
    }
    SetEdgeSelected([])
    dispatch({type:"edgesColors", value:k})
    SetColorBeReload(States.graphAddColor)
    SetgraphAddColor(States.graphAddColor)
  }

  //select single edge
  network.on("click", function (params) {
    if (true) {
      if (params.edges.length > 0) {
        const edgeId = params.edges[0]; // شناسه یال انتخاب شده
        const edgeData = edges.get(edgeId); // دریافت داده‌های یال
  
        const selectedEdgesData = [];
        selectedEdgesData.push(
          {
            from:edgeData.from,
            to:edgeData.to,
            color:States.ColorType
          }
        )
        SetEdgeSelected(selectedEdgesData)
      }
    }
  });

  //delete edges color
  if (deleteColor !== States.deleteColor) {
    for (let i = 0; i < EdgeSelected.length; i++) {
      if (k.some(item => item.from === EdgeSelected[i].from && item.to === EdgeSelected[i].to) === true) {
        const index = k.findIndex(item => (item.from ===  EdgeSelected[i].from && item.to === EdgeSelected[i].to))
        if (index !== -1) {
          k.splice(index, 1);
        }
      }
    }
    dispatch({type:"edgesColors", value:k})
    SetEdgeSelected([])
    SetdeleteColor(States.deleteColor)
  }

  //اگر روی صفحه کلیک شد، یال ها از حالت سلکت خارج شوند و شروع و پایان ناحیه انتخاب یال ها
  network.on("click", function (params) {
      if (params.nodes.length === 0 && params.edges.length === 0) {
        SetEdgeSelected([])
      }
      if (check) {
        selectionStart = network.DOMtoCanvas({ x: params.event.center.x, y: params.event.center.y - 110 })
      } else {
        selectionEnd = network.DOMtoCanvas({ x: params.event.center.x, y: params.event.center.y - 110 })
        selectEdgesInRegion(network, edges, selectionStart, selectionEnd)
      }
      check = !check
  });

  //take picture
  function takeFullGraphScreenshot() {
    const originalScale = network.getScale();
    const originalPosition = network.getViewPosition();
    network.fit();
    setTimeout(() => {
        const element = document.getElementById('myGraphDiv');
        // const options = {
        //   scale: 2, // میتوانید مقدار دیگری هم انتخاب کنید
        //   logging: false, // غیرفعال کردن لاگ html2canvas
        //   width: graphContainer.scrollWidth, // تنظیم عرض برابر با ابعاد محتوا
        //   height: graphContainer.scrollHeight 
        // };
        // html2canvas(element, options).then(canvas => {
        //     const image = canvas.toDataURL('image/png');
        //     const link = document.createElement('a');
        //     link.href = image;
        //     link.download = 'full-graph-screenshot.png';
        //     link.click();
        //     network.moveTo({
        //       position: originalPosition,
        //       scale: originalScale
        //     });
        // });
        const myGraphDiv = document.getElementById('myGraphDiv');
        html2canvas(myGraphDiv, {
          scale: 2, // میتوانید مقدار دیگری هم انتخاب کنید
          logging: false, // غیرفعال کردن لاگ html2canvas
          width: myGraphDiv.scrollWidth, // تنظیم عرض برابر با ابعاد محتوا
          height: myGraphDiv.scrollHeight // تنظیم ارتفاع برابر با ابعاد محتوا
        }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = imgData;
          link.download = 'full-graph-screenshot.png';
          link.click();
          network.moveTo({
            position: originalPosition,
            scale: originalScale
          });
          // انجام عملیات مورد نیاز با imgData
        });
        SetDownloadGraph(States.downloadGraph)
    }, 100);
  }
  if (DownloadGraph !== States.downloadGraph) {
    takeFullGraphScreenshot()
  }

  //خودمم نمیدونم چرا این باید باشه ولی باید باشه
  check = !showDiv

  //روش جدید برای انتخاب یال ها برای رنگ کردن
  function selectMyEdges(network, edges, selectedEdges) {
    if (mouseMode) {
      const selectedEdgesData = [];
      edges.forEach((edge) => {

        if (selectedEdges.some(item => item.to === edge.to && item.from === edge.from)) {
          selectedEdgesData.push(edge.id)
        }
      });
      network.selectEdges(selectedEdgesData);
    }
  }
  selectMyEdges(network, edges, EdgeSelected)
  
  }, [, GraphData, Distance, States.Scale, States.showValues, States.showTime, States.showDollar, States.BeGraphReload, States.graphAddColor, States.deleteColor, States.ColorType])
  
  const mouseMove = (event) => {
    if (showDiv) {
      if (event.clientX >= MainStartX) {
        SetmoveX(event.clientX)
      } else {
        SetmoveX(MainStartX)
        SetstartX(event.clientX)
      }

      if (event.clientY >= MainStartY) {
        SetmoveY(event.clientY)
      } else {
        SetmoveY(MainStartY)
        SetstartY(event.clientY)
      }
    }
  }
  const mouseClick = (event) => {
    if (showDiv === false) {
      SetstartX(event.clientX)
      SetstartY((event.clientY))
      SetMainStartX(event.clientX)
      SetMainStartY((event.clientY))
      SetmoveX(event.clientX)
      SetmoveY((event.clientY))
    } else {
      if (mouseMode) {
        dispatch({type:"BeGraphReload", value:!States.BeGraphReload})
      }
    }
    SetShowDiv(!showDiv)
  }

  if (!mouseMode) {
    return (
      <>
        <div id='myGraphDiv' onClick={mouseClick} onMouseMove={mouseMove} ref={networkRef} style={{height:"calc(100%)", width:"100%", transition:'0.3s', cursor:'pointer' }}></div>
      </>
    ) 
  } else {
    return (
      <>
        <div id='myGraphDiv' onClick={mouseClick} onMouseMove={mouseMove}  ref={networkRef} style={{height:"calc(100%)", minWidth:"100%", transition:'0.3s' }}></div>
        {
          showDiv ? 
          <div id="myDiv" onClick={mouseClick} onMouseMove={mouseMove} style={{position:'absolute', borderRadius:'4px', background:'#344461', opacity:'0.1', width:`${Math.abs(moveX - startX)}px`, height:`${Math.abs(moveY - (startY))}px`, top:`${startY - 120}px`, left:`${startX}px`}}></div>
          :
          null
        }
      </>
    ) 
  }

}

export default FuckingGraph
