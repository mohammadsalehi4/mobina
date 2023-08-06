// /* eslint-disable space-before-blocks */
// /* eslint-disable space-infix-ops */
// /* eslint-disable no-mixed-operators */
// /* eslint-disable no-var */
// /* eslint-disable no-unused-vars */
// /* eslint-disable semi */
// /* eslint-disable no-unused-vars */
// // eslint-disable-next-line no-duplicate-imports
// // eslint-disable-next-line no-duplicate-imports

// import Graph from "react-graph-vis"
// import React from "react"
// const OwnerGraph = () => {
//   const randomNodeCount = 50

// const nodes = [...Array(randomNodeCount)].map((_, index) => {
//   if (index < 16) {
//     if (index < 8) {
//       return {
//         id: index + 1,
//         x:-320,
//         y:(20*index)-80
//       };
//     } else if (index === 8) {
//       return {
//         id: index + 1,
//         x:-320,
//         y:(20*index)-30
//       };
//     } else if (index !== 15) {
//       return {
//         id: index + 1,
//         x:-320,
//         y:(20*index)+20
//       };
//     } else {
//       return {
//         id: index + 1,
//         x:-320,
//         y:(20*index)+50
//       };
//     }

//   } else if (index < 32) {
//     if (index < 24) {
//       return {
//         id: index + 1,
//         x:0,
//         y:(index+(150)-8)-80
//       };
//     } else if (index === 24){
//       return {
//         id: index + 1,
//         x:0,
//         y:(index+(150)-8)-30
//       };
//     } else if (index !== 31) {
//       return {
//         id: index + 1,
//         x:0,
//         y:(index+(150)-8)+20
//       };
//     } else {
//       return {
//         id: index + 1,
//         x:0,
//         y:(index+(150)-8)+50
//       };
//     }

//   } else if (index < 48) {
//     if (index < 40){
//       return {
//         id: index + 1,
//         x:320,
//         y:(20*index)-640-80
//       };
//     } else if (index === 40){
//       return {
//         id: index + 1,
//         x:320,
//         y:(20*index)-640-30
//       };
//     } else if (index !== 47) {
//       return {
//         id: index + 1,
//         x:320,
//         y:(20*index)-640+20
//       };
//     } else {
//       return {
//         id: index + 1,
//         x:320,
//         y:(20*index)-640+50
//       };
//     }

//   } else {
//     if (index === 48){
//       return {
//         id: index + 1,
//         x:0,
//         y:(index+(150)-8)+62-175,
//         shape:'dot',
//         size:0
//       };
//     } else if (index === 49) {
//       return {
//         id: index + 1,
//         x:0,
//         y:(index+(150)-8)+62,
//         shape:'dot',
//         size:0
//       };
//     }
//   }
// });


// const edges = [...Array(33)].map((_, index) => {
//     return {
//       from: index,
//       to: index+16,
//       font: { align: "middle", family: "Vazir", align: 'horizontal', background:"white"},
//       strokeWidth: 5,
//       color: "rgb(0, 215, 136)",
//       fixed: true,
//       smooth: true,
//       width:2
//     };
// });

// edges.push({
//   from: 49,
//   to: 50,
//   font: { align: "middle", family: "Vazir", align: 'horizontal', background:"white"},
//   strokeWidth: 5,
//   color: "rgb(0, 215, 136)",
//   fixed: true,
//   smooth: true,
//   width:25
// })


// for (let i=0; i < 7; i++) {
//   edges[i].color='red'
// }
// for (let i=17; i < 23; i++) {
//   edges[i].color='red'
// }

// edges[6].color="orange"
// edges[7].color="orange"
// edges[8].color="orange"
// edges[22].color="orange"
// edges[23].color="orange"
// edges[24].color="orange"
// edges[16].color="rgb(210,210,210)"
// edges[32].color="rgb(210,210,210)"

// edges[9].width=100
// edges[25].width=100
// edges[16].width=60
// edges[32].width=60

// const options = {
//   layout: {
//     hierarchical: false
//   },

//   edges: {
//     color: { inherit: false, highlight: 'red', color: 'blue' },
//     width:1.2,
//     border: {
//       color: "String",
//       width: "Number",
//       style: "String"
//     },
//     smooth: {
//       type: "cubicBezier",
      
//       roundness: 0.4
//     },
//     font: { align: "horizontal", size:10 },
//     strokeWidth: 2,
//     arrows: {
//       to: {
//           enabled: false
//       }
//     }
//   },
  
//   nodes:{
//       borderWidth:1,
//       shape:'dot',
//       size:0,
//       // shape:'box',    
//       fixed:"true",
//       font: { size: 13, family:"Arial", color:'rgb(0, 215, 136)'  },
//       color:'rgb(0, 215, 136)',
//       borderWidth: 0,
//       physics: {
//         enabled: false
//       }
//   },
//   interaction: {
//     selectable: true,
//     hover: false,
//     hoverConnectedEdges: false,
//     zoomView: false,
//     dragNodes: false,
//     dragView: false

//   },
//   dynamicResize: true
// }

//   const graph = {
//     nodes,
//     edges,
//     options
//   };

  
//   return (
//     <div id="mynetwork" style={{marginTop:"35px"}}>
//       <Graph graph={graph} options={options}  style={{height:"630px", width:"100%" }}/>
//     </div>
//   )

// }

// export default OwnerGraph