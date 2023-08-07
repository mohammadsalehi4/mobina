/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-duplicate-imports
import React, { useRef, useEffect } from "react"
import { DataSet, Network } from 'vis'
import { useSelector, useDispatch } from "react-redux"
  const WalletData = {
    address:"bc1qt96tjcgx4evjhklg2g7829lp2wxwvuv8r4dljz",
    in:[
        {
            address:"wqdugwygqweuifgwuaysbgauskdbguksdfguaskdgfuakjsdfa",
            date:"2021/01/12",
            time:"14:25",
            amount:0.001785
        },
        {
            address:"sdafuisdgfuasydgbfusadybfcjsfadbausdgfsakjdgfjasdfkj",
            date:"2022/11/17",
            time:"18:45",
            amount:2.98
        }
    ],
    out:[
        {
            address:"sdufgsadujfgsajkdgfasudygfasjkdfbajksdgfjsdhjbsjgdf",
            date:"2021/01/16",
            time:"17:23",
            amount:0.26
        },
        {
            address:"SAKDNasuduiASDGASUGDFAUSDGFSDJGjhsgdfkjdsgjfksgadkjf",
            date:"2022/09/12",
            time:"19:35",
            amount:1.19
        },
        {
            address:"sdfsdabfjkasdgfsgadfjkasdgfjsbsadkjgfsbfaskjdfbsjdfds",
            date:"2023/06/22",
            time:"09:23",
            amount:1.11
        }
    ]
}
const GraphDraw = () => {
  const networkRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const nodes = new DataSet([
      { 
        id: 1,
        group: "main",
        label: "...bc1qt96",
        x: 0,
        y: 800
      },
      { 
        id: 2,
        group: "sender",
        label: "...bc1qt96",
        x: 300,
        y: 700 
      },
      { 
        id: 3,
        group: "sender",
        label: "...bc1qt96",
        x: 300,
        y: 800 
      },
      { 
        id: 4,
        group: "reciver",
        label: "...bc1qt96",
        x: 0,
        y: 700
      },
      { 
        id: 5,
        group: "reciver",
        label: "...bc1qt96",
        x: -300,
        y: 700
      },
      { 
        id: 6,
        group: "reciver",
        label: "...bc1qt96",
        x: -300,
        y: 800
      },
      { 
        id: -1,
        group: "mid",
        label: "...aaa",
        x: 150,
        y: 800
      },
      { 
        id: -2,
        group: "mid",
        label: "...aaa",
        x: -150,
        y: 800
      }
    ])

    // events: {
    //   select: ({ nodes }) => {
    //     for (let i = 0; i < state.graph.nodes.length; i++) {
    //       if (state.graph.nodes[i].id === nodes[0]) {
    //         if (state.graph.nodes[i].group === 'main') {
    //           dispatch({type:"SETshowWalletData", value:true})
    //           dispatch({type:"SETWDetail", value:WalletData})
    //         }
    //         if (state.graph.nodes[i].group === 'senderMain') {
    //           dispatch({type:"SETshowWalletData", value:true})
    //           dispatch({type:"SETWDetail", value:WalletData})
    //         }
    //         if (state.graph.nodes[i].group === 'reciverMain') {
    //           dispatch({type:"SETshowWalletData", value:true})
    //           dispatch({type:"SETWDetail", value:WalletData})
    //         }
    //         if (state.graph.nodes[i].group === 'middle') {
    //           dispatch({type:"SETSHOWTRANSACTIONDATA", value:true})
    //           dispatch({type:"SETWDetail", value:WalletData})
    //         }
    //       }
    //     }
    //   }


    const edges = new DataSet([
      { from: 2, to: -1 },
      { from: 3, to: -1 },
      { from: -1, to: 1 },
      { from: -1, to: 4 },
      { from: 1, to: -2 },
      { from: -2, to: 5 },
      { from: -2, to: 6 }
    ])

    const data = {
      nodes,
      edges
    }

  const options = {
    layout: {
      hierarchical: false
    },


    edges: {
        color: "#000000",
        width:1.2,
        border: {
        color: "String",
        width: "Number",
        style: "String"
        },
        smooth: {
            type: "cubicBezier",
            roundness: 0.4
        },
        font: { align: "horizontal", size:10 },
        strokeWidth: 2,
        arrows: {
        to: {
            enabled: true
        }
        },
        font: { size: 14, align: "middle", family: "Vazir", align: 'horizontal', background:"white"},
        color: "#2f4f4f",
        shadow: true,
        fixed: true
    },
    nodes:{
        fixed:true,
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
        hoverConnectedEdges: false
    },
    groups: {
        //گره های واسط
        mid:{
          shape:'dot',
          size:6,
          font: { size: 3, family:"Arial", color:'#2f4f4f'  },
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
            shape:'dot',
          font: { size: 13, family:"Arial", color:'#2f4f4f' },
          color:{
              border: '#2f4f4f'
          },
          borderWidth: 3,
          align: 'horizontal',
          image:"/images/location.png",
          borderColor:"#2f4f4f",            
          fixed:true,
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
          fixed:true,
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
          fixed:true,
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
                dispatch({type:"SETshowWalletData", value:true})
                dispatch({type:"SETWDetail", value:WalletData})
            }
            if (clickedNode.group === 'sender') {
                dispatch({type:"SETshowWalletData", value:true})
                dispatch({type:"SETWDetail", value:WalletData})
            }
            if (clickedNode.group === 'reciver') {
                dispatch({type:"SETshowWalletData", value:true})
                dispatch({type:"SETWDetail", value:WalletData})
            }
            if (clickedNode.group === 'mid') {
                dispatch({type:"SETSHOWTRANSACTIONDATA", value:true})
                dispatch({type:"SETWDetail", value:WalletData})
            }
        }
    });
  }, [])

  return <div ref={networkRef} style={{height:"700px", width:"100%" }}></div>
}

export default GraphDraw

