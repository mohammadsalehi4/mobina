const initialState = {
    //header
    showNavbar:false,
    showMobileMenu:false,
    witchPage:1,
    isAdmin:true,
    notifNumber:0,
    
    //tracker
    showTransactionData:false,
    showWalletData:false,
    WDetail:{},

    //researcher-transaction
    TransactionDetailCurrencyMode:0,

    //mining
    miningMode:0,

    //modal
    basicModal:false,

    //researcher states
    starttime:0,
    endtime:0,
    startAmount:0,
    endAmount:0,
    walletSwitchColor:"",

    //Loadin-All
    isLoading:false,

    //calendar
    jalaliCalendar:true,

    //token type
    TokenType:"token",

    //Loading effect
    LoadingOn:false,
    LoadingOn2:false,

    //Graph Data
    GraphData:[
        {
            address:"kuft1",
            symbole:"eth",
            inputs:[
                {
                    hash:"inp1",
                    timeStamp:1223,
                    value:1200,
                    symbole:'ETH'
                }
            ],
            outputs:[
                {
                    hash:"out1",
                    timeStamp:3441,
                    value:2200,
                    symbole:'ETH'
                }
            ]
        },
        {
            address:"kuft2",
            symbole:"eth",
            inputs:[
                {
                    hash:"inp2",
                    timeStamp:1223,
                    value:1200,
                    symbole:'ETH'
                }
            ],
            outputs:[
                {
                    hash:"inp1",
                    timeStamp:3441,
                    value:2200,
                    symbole:'ETH'
                },
                {
                    hash:"out2",
                    timeStamp:3441,
                    value:2200,
                    symbole:'ETH'
                }
            ]
        },
        {
            address:"kuft3",
            symbole:"eth",
            inputs:[
                {
                    hash:"inp3",
                    timeStamp:1223,
                    value:1200,
                    symbole:'ETH'
                }
            ],
            outputs:[
                {
                    hash:"out3",
                    timeStamp:3441,
                    value:2200,
                    symbole:'ETH'
                },
                {
                    hash:"out5",
                    timeStamp:3441,
                    value:2200,
                    symbole:'ETH'
                }
            ]
        },
        {
            address:"kuft4",
            symbole:"eth",
            inputs:[
                {
                    hash:"out5",
                    timeStamp:1223,
                    value:1200,
                    symbole:'ETH'
                },
                {
                    hash:"out2",
                    timeStamp:1223,
                    value:1200,
                    symbole:'ETH'
                }
            ],
            outputs:[
                {
                    hash:"out4",
                    timeStamp:3441,
                    value:2200,
                    symbole:'ETH'
                }
            ]
        },
        {
            address:"kuft5",
            symbole:"eth",
            inputs:[
                {
                    hash:"out3",
                    timeStamp:1223,
                    value:1200,
                    symbole:'ETH'
                }
            ],
            outputs:[
                {
                    hash:"inp1",
                    timeStamp:3441,
                    value:2200,
                    symbole:'ETH'
                }
            ]
        },
        {
            address:"kuft6",
            symbole:"eth",
            inputs:[
                {
                    hash:"inp2",
                    timeStamp:1223,
                    value:1200,
                    symbole:'ETH'
                }
            ],
            outputs:[
                {
                    hash:"out1",
                    timeStamp:3441,
                    value:2200,
                    symbole:'ETH'
                },
                {
                    hash:"out4",
                    timeStamp:3441,
                    value:2200,
                    symbole:'ETH'
                }
            ]
        }
    ],
    CustomGraphData:[]
}

const reducer = (state = initialState, action) => {

    if (action.type === 'CUSTOMGRAPHDATA') {
        return {
            ...state,
            CustomGraphData:action.value
        }
    }

    if (action.type === 'GRAPHDATA') {
        return {
            ...state,
            GraphData:action.value
        }
    }

    if (action.type === 'LOADINGEFFECT2') {
        return {
            ...state,
            LoadingOn2:action.value
        }
    }

    if (action.type === 'LOADINGEFFECT') {
        return {
            ...state,
            LoadingOn:action.value
        }
    }

    //token or coin
    if (action.type === 'TOKENTYPE') {
        return {
            ...state,
            TokenType:action.value
        }
    }

    //jalali calendar
    if (action.type === 'JALALICALENDAR') {
        return {
            ...state,
            jalaliCalendar:action.value
        }
    }

    //loading effect
    if (action.type === 'SETISLOADING') {
        return {
            ...state,
            isLoading:action.value
        }
    }

    //researcher states
    if (action.type === 'SETSTARTTIME') {
        return {
            ...state,
            starttime:action.value
        }
    }
    if (action.type === 'SETENDTIME') {
        return {
            ...state,
            endtime:action.value
        }
    }
    if (action.type === 'SETSTARTAMOUNT') {
        return {
            ...state,
            startAmount:action.value
        }
    }
    if (action.type === 'SETENDAMOUNT') {
        return {
            ...state,
            endAmount:action.value
        }
    }


    if (action.type === "SETBASICMODAL") {
        return {
            ...state,
            basicModal:action.value
        }
    }
    if (action.type === "SHOWNAVBAR") {
        return {
            ...state,
            showNavbar:true
        }
    }
    if (action.type === "DONTSHOWNAVBAR") {
        return {
            ...state,
            showNavbar:false
        }
    }
    if (action.type === "SHOWMOBILEMENU") {
        return {
            ...state,
            showMobileMenu:action.value
        }
    }
    if (action.type === "SETWITCHPAGE") {
        return {
            ...state,
            witchPage:action.value
        }
    }
    if (action.type === "SETSHOWTRANSACTIONDATA") {
        return {
            ...state,
            showTransactionData:action.value
        }
    }
    if (action.type === "SETshowWalletData") {
        return {
            ...state,
            showWalletData:action.value
        }
    }
    if (action.type === "SETISADMIN") {
        return {
            ...state,
            isAdmin:action.value
        }
    }
    if (action.type === "SETNOTIFNUMBER") {
        return {
            ...state,
            notifNumber:action.value
        }
    }
    // if (action.type === "SHOWADMINACCESSBOX") {
    //     return {
    //         ...state,
    //         showAdminAccessBox:action.value
    //     }
    // }
    if (action.type === "TransactionDetailCurrencyMode") {
        return {
            ...state,
            TransactionDetailCurrencyMode:action.value
        }
    }
    if (action.type === "SETWDetail") {
        return {
            ...state,
            WDetail:action.value
        }
    }
    if (action.type === "SETWDetail") {
        return {
            ...state,
            WDetail:action.value
        }
    }
    if (action.type === "miningMode") {
        return {
            ...state,
            miningMode:action.value
        }
    }
    return state
}

export default reducer