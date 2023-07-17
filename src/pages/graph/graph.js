/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-duplicate-imports
// import React, { useRef, useEffect } from "react"
// import { DataSet, Network } from 'vis'
// const GraphDraw = () => {
//   const networkRef = useRef(null)

//   useEffect(() => {
//     const nodes = new DataSet([
//       { id: 1, label: 'Node 1' },
//       { id: 2, label: 'Node 2' },
//       { id: 3, label: 'Node 3' },
//       { id: 4, label: 'Node 4' },
//       { id: 5, label: 'Node 5' }
//     ])

//     const edges = new DataSet([
//       { from: 1, to: 2 },
//       { from: 1, to: 3 },
//       { from: 2, to: 4 },
//       { from: 2, to: 5 }
//     ])

//     const data = {
//       nodes,
//       edges
//     }

//     const options = {}

//     const network = new Network(networkRef.current, data, options)
//   }, [])

// return <div ref={networkRef} style={{ height: '400px' }}></div>


// }

// export default GraphDraw

import Graph from "react-graph-vis"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
// eslint-disable-next-line no-duplicate-imports
import { useSelector } from "react-redux"
const GraphDraw = (props) => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()
  const WalletData = {
    address:"sdufgsdjfgjsadgfjasdgjfksdgkjfsdgfjksad",
    in:[
        {
            address:"wqdugwygqweuifgwuaysbgauskdbguksdfguaskdgfuakjsdfa",
            date:"2021/01/12",
            time:"14:25",
            amount:0.23
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

  const [state] = useState({

    counter: 5,
    _graph: {
      nodes: [
        {
          id: 1,
          group: "main",
          label: props.address,
          x: 0,
          y: 800
        },
        {
          id: -2,
          group: "senderMain",
          label: props.address,
          x: 300,
          y: 800
        },
        {
          id: -3,
          group: "senderMain",
          label: props.address,
          x: 300,
          y: 720
        },
        {
          id: 2,
          group: "middle",
          x: -150,
          y: 801,
          fixed: true
        },
        {
          id: -1,
          group: "middle",
          x: 150,
          y: 799,
          fixed: true
        },
        {
          id: 3,
          label: props.address,
          group: "reciverMain",
          x: -300,
          y: 802
        },
        {
          id: 4,
          label: props.address,
          group: "reciverMain",
          x: -300,
          y: 720
        },
        {
          id: 5,
          label: props.address,
          group: "reciverMain",
          x: 0,
          y: 720
        }
      ],
      edges: [
        {
          from: 1,
          to: 2,
          label: "2520$",
          font: { size: 14, align: "middle", family: "Vazir", align: 'horizontal', background:"white"},
          color: { color: '#000000', highlight: '#00ff00' },
          strokeWidth: 2,
          color: "#2f4f4f",
          shadow: true,
          fixed: true,
          smooth: true
        },
        {
          from: 2,
          to: 3,
          label: "1520$",
          font: { size: 14, align: "middle", background: "white", family: "Vazir", align: 'horizontal' },
          color: { color: '#000000', highlight: '#00ff00' },
          strokeWidth: 2,
          color: "#2f4f4f",
          shadow: true,
          fixed: true,
          smooth: true
        },
        {
          from: 2,
          to: 4,
          label: "1000$",
          font: { size: 14, align: "middle", background: "white", family: "Vazir", align: 'horizontal' },
          color: { color: '#000000', highlight: '#00ff00' },
          strokeWidth: 2,
          color: "#2f4f4f",
          shadow: true,
          fixed: true,
          smooth: true
        },
        {
          from: -1,
          to: 1,
          label: "1000$",
          font: { size: 14, align: "middle", background: "white", family: "Vazir", align: 'horizontal' },
          color: { color: '#000000', highlight: '#00ff00' },
          strokeWidth: 2,
          color: "#2f4f4f",
          shadow: true,
          fixed: true,
          smooth: true
        },
        {
          from: -2,
          to: -1,
          label: "300$",
          font: { size: 14, align: "middle", background: "white", family: "Vazir", align: 'horizontal' },
          color: { color: '#000000', highlight: '#00ff00' },
          strokeWidth: 2,
          color: "#2f4f4f",
          shadow: true,
          fixed: true,
          smooth: true
        },

        {
          from: -3,
          to: -1,
          label: "700$",
          font: { size: 14, align: "middle", background: "white", family: "Vazir", align: 'horizontal', borderWidth: 2, borderColor:"black" },
          color: { color: '#000000', highlight: '#00ff00' },
          strokeWidth: 2,
          color: "#2f4f4f",
          shadow: true,
          fixed: true,
          smooth: true
        },
        {
          from: -1,
          to: 5,
          label: "700$",
          font: {padding: 11, strokeWidth: 2, size: 14, align: "middle", background: "white", family: "Vazir", align: 'horizontal' },
          color: { color: '#000000', highlight: '#00ff00' },
          strokeWidth: 2,
          color: "#2f4f4f",
          shadow: true,
          fixed: true,
          smooth: true
        }
      ]
    },
    get graph() {
      return this._graph
    },
    set graph(value) {
      this._graph = value
    },
    events: {
      select: ({ nodes }) => {
        for (let i = 0; i < state.graph.nodes.length; i++) {
          if (state.graph.nodes[i].id === nodes[0]) {
            if (state.graph.nodes[i].group === 'main') {
              dispatch({type:"SETshowWalletData", value:true})
              dispatch({type:"SETWDetail", value:WalletData})
            }
            if (state.graph.nodes[i].group === 'senderMain') {
              dispatch({type:"SETshowWalletData", value:true})
              dispatch({type:"SETWDetail", value:WalletData})
            }
            if (state.graph.nodes[i].group === 'reciverMain') {
              dispatch({type:"SETshowWalletData", value:true})
              dispatch({type:"SETWDetail", value:WalletData})
            }
            if (state.graph.nodes[i].group === 'middle') {
              dispatch({type:"SETSHOWTRANSACTIONDATA", value:true})
              dispatch({type:"SETWDetail", value:WalletData})
            }
          }
        }
      }

    }
  })

  
  const options = {
    layout: {
      hierarchical: false
    },

    edges: {
      color: "#000000",
      width:1.2,
      label:{
        font:{


        }
      },
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
      }
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
      hoverConnectedEdges: false
    },
    groups: {
        //گره های واسط
        middle:{
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
        senderMain:{
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
        reciverMain:{
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
        },
        eStyle:{

        }
      }
  }

  const { graph, events } = state
  console.log(document.getElementById("mynetwork"))
  
  return (
    <div id="mynetwork">
      <Graph id="hello" graph={graph} options={options} events={events} style={{height:"700px", width:"100%" }}/>
    </div>
  )

}

export default GraphDraw