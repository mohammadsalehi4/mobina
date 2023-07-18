const initialState = {
    //eleman haye header
    showNavbar:false,
    showMobileMenu:false,
    witchPage:1,
    isAdmin:true,
    notifNumber:0,
    showAdminAccessBox:false,
    
    //safhe graph ha
    showTransactionData:false,
    showWalletData:false,
    WDetail:{},

    //noe arz dar switch
    TransactionDetailCurrencyMode:0,

    //mining
    miningMode:0,

    //modal
    basicModal:false
}

const reducer = (state = initialState, action) => {
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
    if (action.type === "SHOWADMINACCESSBOX") {
        return {
            ...state,
            showAdminAccessBox:action.value
        }
    }
    if (action.type === "SETTransactionDetailCurrencyMode") {
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