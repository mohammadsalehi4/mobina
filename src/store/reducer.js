const initialState = {
    //All
    LoadingEffect:false,

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
    LoadMore:false,
    paginationData:[],

    //researcher-transaction
    TransactionDetailCurrencyMode:0,

    //mining
    miningMode:0,
    miningData:[],

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
    GraphData:[],
    Scale:1,
    positionX:400,
    positionY:800,
    showValues:true,
    showTime:false,
    showDollar:false,
    itemNumbers:0,
    NodesPosition:[],
    SavedPositions:[],
    StartFilterAmount:0,
    EndFilterAmount:0,
    StartFilterTime:0,
    EndFilterTime:0,
    All_Input_Output:0,
    Network:'',
    edgesColors:[],
    graphNetworkName:'',
    graphAddColor:false,
    ColorType:'red',
    UpdateColorType:false,
    deleteColor:false,
    mouseMode:false,
    downloadGraph:false,

    //admin panel
    CustomLoading: false,
    beLoad: false,
    AssetPage:false,

    //tax
    taxAmount:0,
    taxId:0,
    taxData:0,
    taxLoading:false,
    taxState:false,

    //loadingAdminPanel
    rollsLoading:1,
    rollsBeload:false,
    reportsBeload:false,
    PriceBeload:false,
    TaxBeload:false,
    EntityBeload:false,
    AssetsBeload:false,

    //loading profile
    ProfileLabel:false,
    ProfileTag:false,
    ProfileGraph:false,

    //network set
    networkName:'',

    //miner
    userMinerId:null,
    userMinerEmail:null,
    userMinerinterface_fname:null,
    userMinerinterface_lname:null,
    userMinerinterface_phone_number:null,
    minerAddresses:[],

    //pagination
    AddressPagination:1,
    TransactionInputPagination:1,
    TransactionOutputPagination:1,
    UTXOTransaction:1
}

const reducer = (state = initialState, action) => {

    if (action.type === 'minerAddresses') {
        return {
            ...state,
            minerAddresses:action.value
        }
    }

    if (action.type === 'TransactionInputPagination') {
        return {
            ...state,
            TransactionInputPagination:action.value
        }
    }

    if (action.type === 'TransactionOutputPagination') {
        return {
            ...state,
            TransactionOutputPagination:action.value
        }
    }

    if (action.type === 'AddressPagination') {
        return {
            ...state,
            AddressPagination:action.value
        }
    }

    if (action.type === 'taxState') {
        return {
            ...state,
            taxState:action.value
        }
    }

    if (action.type === 'userMinerId') {
        return {
            ...state,
            userMinerId:action.value
        }
    }

    if (action.type === 'userMinerEmail') {
        return {
            ...state,
            userMinerEmail:action.value
        }
    }

    if (action.type === 'userMinerinterface_fname') {
        return {
            ...state,
            userMinerinterface_fname:action.value
        }
    }

    if (action.type === 'userMinerinterface_lname') {
        return {
            ...state,
            userMinerinterface_lname:action.value
        }
    }

    if (action.type === 'userMinerinterface_phone_number') {
        return {
            ...state,
            userMinerinterface_phone_number:action.value
        }
    }

    if (action.type === 'paginationData') {
        return {
            ...state,
            paginationData:action.value
        }
    }

    if (action.type === 'LoadMore') {
        return {
            ...state,
            LoadMore:action.value
        }
    }

    if (action.type === 'taxLoading') {
        return {
            ...state,
            taxLoading:action.value
        }
    }

    if (action.type === 'miningData') {
        return {
            ...state,
            miningData:action.value
        }
    }

    if (action.type === 'AssetPage') {
        return {
            ...state,
            AssetPage:action.value
        }
    }

    if (action.type === 'AssetsBeload') {
        return {
            ...state,
            AssetsBeload:action.value
        }
    }

    if (action.type === 'LoadingEffect') {
        return {
            ...state,
            LoadingEffect:action.value
        }
    }

    if (action.type === 'downloadGraph') {
        return {
            ...state,
            downloadGraph:action.value
        }
    }

    if (action.type === 'mouseMode') {
        return {
            ...state,
            mouseMode:action.value
        }
    }

    if (action.type === 'deleteColor') {
        return {
            ...state,
            deleteColor:action.value
        }
    }

    if (action.type === 'UpdateColorType') {
        return {
            ...state,
            UpdateColorType:action.value
        }
    }

    if (action.type === 'ColorType') {
        return {
            ...state,
            ColorType:action.value
        }
    }

    if (action.type === 'graphAddColor') {
        return {
            ...state,
            graphAddColor:action.value
        }
    }

    if (action.type === 'SavedPositions') {
        return {
            ...state,
            SavedPositions:action.value
        }
    }

    if (action.type === 'EntityBeload') {
        return {
            ...state,
            EntityBeload:action.value
        }
    }

    if (action.type === 'TaxBeload') {
        return {
            ...state,
            TaxBeload:action.value
        }
    }

    if (action.type === 'graphNetworkName') {
        return {
            ...state,
            graphNetworkName:action.value
        }
    }

    if (action.type === 'networkName') {
        return {
            ...state,
            networkName:action.value
        }
    }

    if (action.type === 'PriceBeload') {
        return {
            ...state,
            PriceBeload:action.value
        }
    }

    if (action.type === 'edgesColors') {
        return {
            ...state,
            edgesColors:action.value
        }
    }

    if (action.type === 'reportsBeload') {
        return {
            ...state,
            reportsBeload:action.value
        }
    }

    if (action.type === 'rollsBeload') {
        return {
            ...state,
            rollsBeload:action.value
        }
    }

    if (action.type === 'ProfileLabel') {
        return {
            ...state,
            ProfileLabel:action.value
        }
    }

    if (action.type === 'ProfileTag') {
        return {
            ...state,
            ProfileTag:action.value
        }
    }

    if (action.type === 'ProfileGraph') {
        return {
            ...state,
            ProfileGraph:action.value
        }
    }

    if (action.type === 'rollsLoading') {
        return {
            ...state,
            rollsLoading:action.value
        }
    }

    if (action.type === 'taxData') {
        return {
            ...state,
            taxData:action.value
        }
    }
        
    if (action.type === 'taxId') {
        return {
            ...state,
            taxId:action.value
        }
    }
    
    if (action.type === 'taxAmount') {
        return {
            ...state,
            taxAmount:action.value
        }
    }

    if (action.type === 'Network') {
        return {
            ...state,
            Network:action.value
        }
    }

    if (action.type === 'StartFilterTime') {
        return {
            ...state,
            StartFilterTime:action.value
        }
    }

    if (action.type === 'EndFilterTime') {
        return {
            ...state,
            EndFilterTime:action.value
        }
    }

    if (action.type === 'All_Input_Output') {
        return {
            ...state,
            All_Input_Output:action.value
        }
    }

    if (action.type === 'StartFilterAmount') {
        return {
            ...state,
            StartFilterAmount:action.value
        }
    }

    if (action.type === 'EndFilterAmount') {
        return {
            ...state,
            EndFilterAmount:action.value
        }
    }

    if (action.type === 'NodesPosition') {
        return {
            ...state,
            NodesPosition:action.value
        }
    }

    if (action.type === 'showDollar') {
        return {
            ...state,
            showDollar:action.value
        }
    }

    if (action.type === 'itemNumbers') {
        return {
            ...state,
            itemNumbers:action.value
        }
    }

    if (action.type === 'showTime') {
        return {
            ...state,
            showTime:action.value
        }
    }

    if (action.type === 'showValues') {
        return {
            ...state,
            showValues:action.value
        }
    }

    if (action.type === 'positionX') {
        return {
            ...state,
            positionX:action.value
        }
    }

    if (action.type === 'positionY') {
        return {
            ...state,
            positionY:action.value
        }
    }

    if (action.type === 'Scale') {
        return {
            ...state,
            Scale:action.value
        }
    }

    if (action.type === 'beLoad') {
        return {
            ...state,
            beLoad:action.value
        }
    }

    if (action.type === 'CustomLoading') {
        return {
            ...state,
            CustomLoading:action.value
        }
    }

    if (action.type === 'BeGraphReload') {
        return {
            ...state,
            BeGraphReload:action.value
        }
    }

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

    if (action.type === 'GraphData') {
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