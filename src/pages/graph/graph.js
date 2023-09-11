/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-duplicate-imports
import React, { useRef, useEffect } from "react"
import { DataSet, Network } from 'vis'
import { useSelector, useDispatch } from "react-redux"

  const NodeData = [
    {
      address:'1Fw7wvVPhv5eioWQZ2if2zRUcHNdNBfu9r',
      in:[
        {
          address:'5407317937e50337c72187b13d14eca1e2f77e439436c616e64d128dcd4dc721',
          date:'2011/07/07',
          time:'22:29',
          amount:0.09359433
        },
        {
          address:'2e3754f8023638ff870b72c38b525440a8c2720949e7731ac5ae3da424e719c6',
          date:'2011/06/23',
          time:'21:47',
          amount:0.19
        },
        {
          address:'e5e932dceedac7b26b398e1ce469f6fab4fe9b3c8418bf3bb5f3ef60f693b541',
          date:'2011/06/23',
          time:'15:02',
          amount:2.61
        },
        {
          address:'ee82f20a848791585dc38c73fa35d751311e993e83f19f6fc5031e58a65130ad',
          date:'2011/06/21',
          time:'15:14',
          amount:0.03
        }
      ],
      out:[
        {
          address:'7139435a5e59418d6264a4ef6daffbfa393125779265bf7fe9420efb16954e8a',
          date:'2011/06/21',
          time:'22:28',
          amount:0.03
        }
      ]
    },
    {
      address:'1HZMRL2VVfm8SXmLWPqhNgeXLQXSmhaSpS',
      in:[
        {
          address:'c31ad3519df2ac71aa8aadcb2ebe113d0f4e85e2c029b6d5fb0d59a23b361e2e',
          date:'2011/07/05',
          time:'22:52',
          amount:196.52642408
        }
      ],
      out:[]
    },
    {
      address:'18mFudCQ9AhYqyqYgPghT55RTUf7DzhfEt',
      in:[
        {
          address:'934aa03e00d6d7bd17e5b707056f064d35b411ae931df4088e25ae0bba364261',
          date:'2011/06/23',
          time:'15:02',
          amount:184.46528234
        }
      ],
      out:[
        {
          address:'e5e932dceedac7b26b398e1ce469f6fab4fe9b3c8418bf3bb5f3ef60f693b541',
          date:'2011/06/23',
          time:'15:02',
          amount:184.46528234
        }
      ]
    },
    {
      address:'15V5iVsoetMoHSJmCHTVPujGpWg7eRSbXi',
      in:[
        {
          address:'934aa03e00d6d7bd17e5b707056f064d35b411ae931df4088e25ae0bba364261',
          date:'2011/07/05',
          time:'22:14',
          amount:196.66515573
        }
      ],
      out:[
        {
          address:'5407317937e50337c72187b13d14eca1e2f77e439436c616e64d128dcd4dc721',
          date:'2011/07/05',
          time:'22:29',
          amount:196.66515573
        }
      ]
    },
    {
      address:'1KGSxeWtQW14drFvRGZqFiG42HbfxhuHXk',
      in:[
        {
          address:'5407317937e50337c72187b13d14eca1e2f77e439436c616e64d128dcd4dc721',
          date:'2011/07/05',
          time:'22:29',
          amount:196.5715614
        }
      ],
      out:[
        {
          address:'c31ad3519df2ac71aa8aadcb2ebe113d0f4e85e2c029b6d5fb0d59a23b361e2e',
          date:'2011/07/05',
          time:'22:52',
          amount:196.5715614
        }
      ]
    },
    {
      address:'1NXw4u7KvoPuH7mkStBcZ6HkHhHNB11odQ',
      in:[
        {
          address:'7139435a5e59418d6264a4ef6daffbfa393125779265bf7fe9420efb16954e8a',
          date:'2011/06/21',
          time:'22:28',
          amount:0.01
        }
      ],
      out:[]
    },
    {
      address:'16zy2qPQUm9ARnjnT7FhjXeoSc1eVCqngQ',
      in:[
        {
          address:'7139435a5e59418d6264a4ef6daffbfa393125779265bf7fe9420efb16954e8a',
          date:'2011/06/21',
          time:'22:28',
          amount:10.03
        }
      ],
      out:[
        {
          address:'3239e872b63d652840543db01ef33506ab971a5a66fdb9bbf8cf4ff2e60b1fa2',
          date:'2011/06/25',
          time:'12:53',
          amount:10.03
        }
      ]
    },
    {
      address:'1Gw192ctkfJX8cKQvQeNWgPQVziaRs3ZFj',
      in:[
        {
          address:'fe574a7f959a90c8b0651250ab5591458a55c3d0c40a5b99d44ca49b4f5f43e4',
          date:'2011/06/07',
          time:'07:15',
          amount:10.01
        }
      ],
      out:[
        {
          address:'7139435a5e59418d6264a4ef6daffbfa393125779265bf7fe9420efb16954e8a',
          date:'2011/06/21',
          time:'22:28',
          amount:10.01
        }
      ]
    },
    {
      address:'1PvfRAA9nJjfEvhkQvXX1X6EHuoQKDNB4o',
      in:[
        {
          address:'6e5b3982fabcb328c410c90fc5f3f86b0cfec88636d062dde219cf2170de134d',
          date:'2011/06/21',
          time:'15:14',
          amount:43.11
        }
      ],
      out:[
        {
          address:'ee82f20a848791585dc38c73fa35d751311e993e83f19f6fc5031e58a65130ad',
          date:'2011/06/21',
          time:'15:14',
          amount:43.11
        }
      ]
    },
    {
      address:'1NNp241FrpbrbGC1ZmqZjsWEKFn4BFNYKh',
      in:[
        {
          address:'09935615bae8e2433e3566894a15ee63bb815b6c73b02b257ec53db5e33db464',
          date:'2011/06/23',
          time:'21:37',
          amount:662.90580385
        }
      ],
      out:[
        {
          address:'2e3754f8023638ff870b72c38b525440a8c2720949e7731ac5ae3da424e719c6',
          date:'2011/06/23',
          time:'21:47',
          amount:662.90580385
        }
      ]
    },
    {
      address:'17RNpugEa5vXvbSJuExoVnyqHeJNHZmF8w',
      in:[
        {
          address:'acb2e587c2b30ad56e287170eeafd1a2d1818fb921e9caac77d3729ab781699a',
          date:'2011/06/07',
          time:'06:50',
          amount:3.74
        }
      ],
      out:[
        {
          address:'fe574a7f959a90c8b0651250ab5591458a55c3d0c40a5b99d44ca49b4f5f43e4',
          date:'2011/06/07',
          time:'07:15',
          amount:3.74
        }
      ]
    }
  ]

  const TrData = [
    {
      address:"5407317937e50337c72187b13d14eca1e2f77e439436c616e64d128dcd4dc721",
      date:'2011/06/05',
      time:'10:29',
      fee:0,
      Amount:196.66515573,
      in:[
          {
              address:"15V5iVsoetMoHSJmCHTVPujGpWg7eRSbXi",
              amount:196.66515573
          }
      ],
      out:[
          {
              address:"1KGSxeWtQW14drFvRGZqFiG42HbfxhuHXk",
              amount:196.5715614
          },
          {
              address:"1Fw7wvVPhv5eioWQZ2if2zRUcHNdNBfu9r",
              amount:0.09359433
          }
      ]
    },
    {
      address:"7139435a5e59418d6264a4ef6daffbfa393125779265bf7fe9420efb16954e8a",
      date:'2011/06/21',
      time:'22:28',
      fee:0,
      Amount:10.04,
      in:[
          {
            address:"1Gw192ctkfJX8cKQvQeNWgPQVziaRs3ZFj",
            amount:10.01
          },
          {
            address:"1Fw7wvVPhv5eioWQZ2if2zRUcHNdNBfu9r",
            amount:0.03
          }
      ],
      out:[
          {
              address:"16zy2qPQUm9ARnjnT7FhjXeoSc1eVCqngQ",
              amount:10.03
          },
          {
              address:"1NXw4u7KvoPuH7mkStBcZ6HkHhHNB11odQ",
              amount:0.01
          }
      ]
    },
    {
      address:"c31ad3519df2ac71aa8aadcb2ebe113d0f4e85e2c029b6d5fb0d59a23b361e2e",
      date:'2011/07/05',
      time:'22:52',
      fee:0,
      Amount:196.5715614,
      in:[
          {
            address:"1KGSxeWtQW14drFvRGZqFiG42HbfxhuHXk",
            amount:196.5715614
          }
      ],
      out:[
          {
              address:"1HZMRL2VVfm8SXmLWPqhNgeXLQXSmhaSpS",
              amount:196.52642408
          },
          {
              address:"1CzEbcjQjyKPsH6UyXbKnFj74VhNUxEKAo",
              amount:0.04513732
          }
      ]
    },
    {
      address:"e5e932dceedac7b26b398e1ce469f6fab4fe9b3c8418bf3bb5f3ef60f693b541",
      date:'2011/06/23',
      time:'15:02',
      fee:0,
      Amount:184.46528234,
      in:[
          {
            address:"18mFudCQ9AhYqyqYgPghT55RTUf7DzhfEt",
            amount:184.46528234
          }
      ],
      out:[
          {
              address:"1HZMRL2VVfm8SXmLWPqhNgeXLQXSmhaSpS",
              amount:181.85528234
          },
          {
              address:"1CzEbcjQjyKPsH6UyXbKnFj74VhNUxEKAo",
              amount:2.61
          }
      ]
    },
    {
      address:"ee82f20a848791585dc38c73fa35d751311e993e83f19f6fc5031e58a65130ad",
      date:'2011/06/21',
      time:'15:14',
      fee:0,
      Amount:43.11,
      in:[
          {
            address:"1PvfRAA9nJjfEvhkQvXX1X6EHuoQKDNB4o",
            amount:43.11
          }
      ],
      out:[
          {
              address:"1HY3CWRcMdvmeKzuy66GMT4SmGdVFM5Swk",
              amount:43.08
          },
          {
              address:"1Fw7wvVPhv5eioWQZ2if2zRUcHNdNBfu9r",
              amount:0.03
          }
      ]
    },
    {
      address:"2e3754f8023638ff870b72c38b525440a8c2720949e7731ac5ae3da424e719c6",
      date:'2011/06/23',
      time:'21:47',
      fee:0,
      Amount:662.90580385,
      in:[
          {
            address:"1NNp241FrpbrbGC1ZmqZjsWEKFn4BFNYKh",
            amount:662.90580385
          }
      ],
      out:[
          {
              address:"1LZSUE4EAbhhBHGL18SVeoGq8Y8WhwCR7W",
              amount:662.71580385
          },
          {
              address:"1Fw7wvVPhv5eioWQZ2if2zRUcHNdNBfu9r",
              amount:0.19
          }
      ]
    },
    {
      address:"fe574a7f959a90c8b0651250ab5591458a55c3d0c40a5b99d44ca49b4f5f43e4",
      date:'2011/06/07',
      time:'07:15',
      fee:0.01,
      Amount:10.03,
      in:[
          {
            address:"17RNpugEa5vXvbSJuExoVnyqHeJNHZmF8w",
            amount:3.74
          },
          {
            address:"17kTYAYFsuEtaY9oeHfqnpbdvv1we2aoa9",
            amount:3.4
          },
          {
            address:"12wj5dcXLN9VY1qYkosJhz8debJvSvR51k",
            amount:1.45
          },
          {
            address:"17mHy8pFHVe8GysXziPkf6jABUeeoHu7hn",
            amount:1.43
          }
      ],
      out:[
          {
              address:"1Gw192ctkfJX8cKQvQeNWgPQVziaRs3ZFj",
              amount:10.01
          },
          {
              address:"1EQn7xJJ2UxwEasc2J7Pmb6NMV865V7WbT",
              amount:0.01
          }
      ]
    }
  ]

const GraphDraw = () => {
  const networkRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const nodes = new DataSet([
      { 
        id: 5000,
        group: "main",
        label: `...${(NodeData[0].address).substring(0, 7)}`,
        x: 0,
        y: 800
      },
      { 
        id: 10,
        group: "sender",
        label: `...${(NodeData[10].address).substring(0, 7)}`,
        x: 400,
        y: 400 
      },
      { 
        id: 9,
        group: "sender",
        label: `...${(NodeData[9].address).substring(0, 7)}`,
        x: 400,
        y: 500 
      },
      { 
        id: 8,
        group: "sender",
        label: `...${(NodeData[8].address).substring(0, 7)}`,
        x: 400,
        y: 600 
      },
      { 
        id: 2,
        group: "sender",
        label: `...${(NodeData[2].address).substring(0, 7)}`,
        x: 400,
        y: 700 
      },
      { 
        id: 3,
        group: "sender",
        label: `...${(NodeData[3].address).substring(0, 7)}`,
        x: 400,
        y: 800 
      },
      { 
        id: 4,
        group: "reciver",
        label: `...${(NodeData[4].address).substring(0, 7)}`,
        x: 0,
        y: 700
      },
      { 
        id: 1,
        group: "reciver",
        label: `...${(NodeData[1].address).substring(0, 7)}`,
        x: -400,
        y: 600
      },
      { 
        id: 5,
        group: "reciver",
        label: `...${(NodeData[5].address).substring(0, 7)}`,
        x: -400,
        y: 700
      },
      { 
        id: 6,
        group: "reciver",
        label: `...${(NodeData[6].address).substring(0, 7)}`,
        x: -400,
        y: 800
      },
      { 
        id: 7,
        group: "reciver",
        label: `...${(NodeData[7].address).substring(0, 7)}`,
        x: 0,
        y: 600
      },
      { 
        id: -1,
        group: "mid",
        label: "...aaa",
        x: 200,
        y: 800
      },
      { 
        id: -2,
        group: "mid",
        label: "...aaa",
        x: -200,
        y: 800
      },
      { 
        id: -3,
        group: "mid",
        label: "...aaa",
        x: -200,
        y: 700
      },
      { 
        id: -4,
        group: "mid",
        label: "...aaa",
        x: 200,
        y: 700
      },
      { 
        id: -5,
        group: "mid",
        label: "...aaa",
        x: 200,
        y: 600
      },
      { 
        id: -6,
        group: "mid",
        label: "...aaa",
        x: 200,
        y: 500
      },
      { 
        id: -7,
        group: "mid",
        label: "...aaa",
        x: 200,
        y: 400
      }
    ])

    const edges = new DataSet([
      { from: 10, to: -7, label:'3.74' },
      { from: 9, to: -6, label:'662.906' },
      { from: 8, to: -5, label:'43.11' },
      { from: 2, to: -4, label:'184.465' },
      { from: 3, to: -1, label:'196.665' },
      { from: -6, to: 5000, label:'0.19' },
      { from: -5, to: 5000, label:'0.03' },
      { from: -4, to: 5000, label:'2.61' },
      { from: -1, to: 5000, label:'0.09359433' },
      { from: -1, to: 4, label:'196.572' },
      { from: -7, to: 7, label:'10.01'},
      { from: 5000, to: -2, label:'0.03' },
      { from: 7, to: -2, label:'0.01' },
      { from: 4, to: -3, label:'196.572' },
      { from: -3, to: 1, label:'196.526' },
      { from: -2, to: 6, label:'10.03' },
      { from: -2, to: 5, label:'0.01' }
    ])

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

