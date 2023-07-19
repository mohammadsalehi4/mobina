import Graph from "react-graph-vis"
import React, { useState } from "react"
import './style.css'
// eslint-disable-next-line no-duplicate-imports
const ModalGraph = (props) => {

  const [state] = useState({

    counter: 5,
    _graph: {
      nodes: [
        {
          id: 1,
          group: "senderMain",
          label: props.text1,
          x: -300,
          y: 800
        },
        {
          id: 2,
          group: "senderMain",
          label: props.text1,
          x: -300,
          y: 720
        },
        {
          id: 3,
          group: "senderMain",
          label: props.text1,
          x: -300,
          y: 640
        },
        {
          id: 4,
          group: "middle",
          x: -100,
          y: 720,
          fixed: true
        },
        {
          id: 5,
          group: "middle",
          x: -100,
          y: 800,
          fixed: true
        },
        {
          id: 6,
          group: "reciverMain",
          label: props.text2,
          x: 100,
          y: 720,
          fixed: true
        },
        {
          id: 7,
          group: "reciverMain",
          label: props.text2,
          x: 100,
          y: 800,
          fixed: true
        }
      ],
      edges: [
        {
          from: 3,
          to: 4,
          label: "1000$",
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
          to: 4,
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
          from: 4,
          to: 6,
          label: "2520$",
          font: { size: 14, align: "middle", background: "white", family: "Vazir", align: 'horizontal' },
          color: { color: '#000000', highlight: '#00ff00' },
          strokeWidth: 2,
          color: "#2f4f4f",
          shadow: true,
          fixed: true,
          smooth: true
        },
        {
          from: 1,
          to: 5,
          label: "800$",
          font: { size: 14, align: "middle", background: "white", family: "Vazir", align: 'horizontal' },
          color: { color: '#000000', highlight: '#00ff00' },
          strokeWidth: 2,
          color: "#2f4f4f",
          shadow: true,
          fixed: true,
          smooth: true
        },
        {
          from: 5,
          to: 7,
          label: "800$",
          font: { size: 14, align: "middle", background: "white", family: "Vazir", align: 'horizontal' },
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
    }
  }
  )

  
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
        zoomView: false
      },
    dynamicResize: true,
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
  
  return (
    <div id="mynetwork2">
      <Graph id="hello" graph={graph} options={options} events={events} style={{width:"100%", height:"90%"}}/>
    </div>
  )

}

export default ModalGraph