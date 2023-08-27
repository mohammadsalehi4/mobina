import React from 'react'

const TopGuide = () => {

    const selectOption = (index) => {
        document.getElementById(`kuft1`).style.background = "white"
        document.getElementById(`kuft2`).style.background = "white"
        document.getElementById(`kuft1`).style.stroke = "gray"
        document.getElementById(`kuft2`).style.stroke = "gray"

        document.getElementById(`kuft${index}`).style.background = "rgb(255, 200, 0)"
        document.getElementById(`kuft${index}`).style.stroke = "black"
        
    }

  return (
        <div id='TopGuide'>
            <svg id='kuft1' onClick={() => { selectOption(1) }} style={{ background: "rgb(255, 200, 0)", stroke: "black"}}  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pointer JD" viewBox="0 0 24 24" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M7.904 17.563a1.2 1.2 0 0 0 2.228 .308l2.09 -3.093l4.907 4.907a1.067 1.067 0 0 0 1.509 0l1.047 -1.047a1.067 1.067 0 0 0 0 -1.509l-4.907 -4.907l3.113 -2.09a1.2 1.2 0 0 0 -.309 -2.228l-13.582 -3.904l3.904 13.563z" />
            </svg>
            <svg onClick={() => { selectOption(2) }}  style={{ background: "white", stroke: "gray"}} id='kuft2' xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-hand-grab JD" viewBox="0 0 24 24" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M8 11v-3.5a1.5 1.5 0 0 1 3 0v2.5" />
                <path d="M11 9.5v-3a1.5 1.5 0 0 1 3 0v3.5" />
                <path d="M14 7.5a1.5 1.5 0 0 1 3 0v2.5" />
                <path d="M17 9.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-time" viewBox="0 0 24 24" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" />
                <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M15 3v4" />
                <path d="M7 3v4" />
                <path d="M3 11h16" />
                <path d="M18 16.496v1.504l1 1" />
            </svg>
            <svg title="انتشار" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-share" viewBox="0 0 24 24" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M8.7 10.7l6.6 -3.4" />
                <path d="M8.7 13.3l6.6 3.4" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-export" viewBox="0 0 24 24" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3" />
            </svg>
        </div>
  )
}

export default TopGuide