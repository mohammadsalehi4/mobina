"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  //All
  LoadingEffect: false,
  //header
  showNavbar: false,
  showMobileMenu: false,
  witchPage: 1,
  isAdmin: true,
  notifNumber: 0,
  //tracker
  showTransactionData: false,
  showWalletData: false,
  WDetail: {},
  //researcher-transaction
  TransactionDetailCurrencyMode: 0,
  //mining
  miningMode: 0,
  miningData: [],
  //modal
  basicModal: false,
  //researcher states
  starttime: 0,
  endtime: 0,
  startAmount: 0,
  endAmount: 0,
  walletSwitchColor: "",
  //Loadin-All
  isLoading: false,
  //calendar
  jalaliCalendar: true,
  //token type
  TokenType: "token",
  //Loading effect
  LoadingOn: false,
  LoadingOn2: false,
  //Graph Data
  GraphData: [],
  Scale: 1,
  positionX: 400,
  positionY: 800,
  showValues: true,
  showTime: false,
  showDollar: false,
  itemNumbers: 0,
  NodesPosition: [],
  SavedPositions: [],
  StartFilterAmount: 0,
  EndFilterAmount: 0,
  StartFilterTime: 0,
  EndFilterTime: 0,
  All_Input_Output: 0,
  Network: '',
  edgesColors: [],
  graphNetworkName: '',
  graphAddColor: false,
  ColorType: 'red',
  UpdateColorType: false,
  deleteColor: false,
  mouseMode: false,
  downloadGraph: false,
  //admin panel
  CustomLoading: false,
  beLoad: false,
  AssetPage: false,
  //tax
  taxAmount: 0,
  taxId: 0,
  taxData: 0,
  //loadingAdminPanel
  rollsLoading: 1,
  rollsBeload: false,
  reportsBeload: false,
  PriceBeload: false,
  TaxBeload: false,
  EntityBeload: false,
  AssetsBeload: false,
  //loading profile
  ProfileLabel: false,
  ProfileTag: false,
  ProfileGraph: false,
  //network set
  networkName: ''
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === 'miningData') {
    return _objectSpread({}, state, {
      miningData: action.value
    });
  }

  if (action.type === 'AssetPage') {
    return _objectSpread({}, state, {
      AssetPage: action.value
    });
  }

  if (action.type === 'AssetsBeload') {
    return _objectSpread({}, state, {
      AssetsBeload: action.value
    });
  }

  if (action.type === 'LoadingEffect') {
    return _objectSpread({}, state, {
      LoadingEffect: action.value
    });
  }

  if (action.type === 'downloadGraph') {
    return _objectSpread({}, state, {
      downloadGraph: action.value
    });
  }

  if (action.type === 'mouseMode') {
    return _objectSpread({}, state, {
      mouseMode: action.value
    });
  }

  if (action.type === 'deleteColor') {
    return _objectSpread({}, state, {
      deleteColor: action.value
    });
  }

  if (action.type === 'UpdateColorType') {
    return _objectSpread({}, state, {
      UpdateColorType: action.value
    });
  }

  if (action.type === 'ColorType') {
    return _objectSpread({}, state, {
      ColorType: action.value
    });
  }

  if (action.type === 'graphAddColor') {
    return _objectSpread({}, state, {
      graphAddColor: action.value
    });
  }

  if (action.type === 'SavedPositions') {
    return _objectSpread({}, state, {
      SavedPositions: action.value
    });
  }

  if (action.type === 'EntityBeload') {
    return _objectSpread({}, state, {
      EntityBeload: action.value
    });
  }

  if (action.type === 'TaxBeload') {
    return _objectSpread({}, state, {
      TaxBeload: action.value
    });
  }

  if (action.type === 'graphNetworkName') {
    return _objectSpread({}, state, {
      graphNetworkName: action.value
    });
  }

  if (action.type === 'networkName') {
    return _objectSpread({}, state, {
      networkName: action.value
    });
  }

  if (action.type === 'PriceBeload') {
    return _objectSpread({}, state, {
      PriceBeload: action.value
    });
  }

  if (action.type === 'edgesColors') {
    return _objectSpread({}, state, {
      edgesColors: action.value
    });
  }

  if (action.type === 'reportsBeload') {
    return _objectSpread({}, state, {
      reportsBeload: action.value
    });
  }

  if (action.type === 'rollsBeload') {
    return _objectSpread({}, state, {
      rollsBeload: action.value
    });
  }

  if (action.type === 'ProfileLabel') {
    return _objectSpread({}, state, {
      ProfileLabel: action.value
    });
  }

  if (action.type === 'ProfileTag') {
    return _objectSpread({}, state, {
      ProfileTag: action.value
    });
  }

  if (action.type === 'ProfileGraph') {
    return _objectSpread({}, state, {
      ProfileGraph: action.value
    });
  }

  if (action.type === 'rollsLoading') {
    return _objectSpread({}, state, {
      rollsLoading: action.value
    });
  }

  if (action.type === 'taxData') {
    return _objectSpread({}, state, {
      taxData: action.value
    });
  }

  if (action.type === 'taxId') {
    return _objectSpread({}, state, {
      taxId: action.value
    });
  }

  if (action.type === 'taxAmount') {
    return _objectSpread({}, state, {
      taxAmount: action.value
    });
  }

  if (action.type === 'Network') {
    return _objectSpread({}, state, {
      Network: action.value
    });
  }

  if (action.type === 'StartFilterTime') {
    return _objectSpread({}, state, {
      StartFilterTime: action.value
    });
  }

  if (action.type === 'EndFilterTime') {
    return _objectSpread({}, state, {
      EndFilterTime: action.value
    });
  }

  if (action.type === 'All_Input_Output') {
    return _objectSpread({}, state, {
      All_Input_Output: action.value
    });
  }

  if (action.type === 'StartFilterAmount') {
    return _objectSpread({}, state, {
      StartFilterAmount: action.value
    });
  }

  if (action.type === 'EndFilterAmount') {
    return _objectSpread({}, state, {
      EndFilterAmount: action.value
    });
  }

  if (action.type === 'NodesPosition') {
    return _objectSpread({}, state, {
      NodesPosition: action.value
    });
  }

  if (action.type === 'showDollar') {
    return _objectSpread({}, state, {
      showDollar: action.value
    });
  }

  if (action.type === 'itemNumbers') {
    return _objectSpread({}, state, {
      itemNumbers: action.value
    });
  }

  if (action.type === 'showTime') {
    return _objectSpread({}, state, {
      showTime: action.value
    });
  }

  if (action.type === 'showValues') {
    return _objectSpread({}, state, {
      showValues: action.value
    });
  }

  if (action.type === 'positionX') {
    return _objectSpread({}, state, {
      positionX: action.value
    });
  }

  if (action.type === 'positionY') {
    return _objectSpread({}, state, {
      positionY: action.value
    });
  }

  if (action.type === 'Scale') {
    return _objectSpread({}, state, {
      Scale: action.value
    });
  }

  if (action.type === 'beLoad') {
    return _objectSpread({}, state, {
      beLoad: action.value
    });
  }

  if (action.type === 'CustomLoading') {
    return _objectSpread({}, state, {
      CustomLoading: action.value
    });
  }

  if (action.type === 'BeGraphReload') {
    return _objectSpread({}, state, {
      BeGraphReload: action.value
    });
  }

  if (action.type === 'CUSTOMGRAPHDATA') {
    return _objectSpread({}, state, {
      CustomGraphData: action.value
    });
  }

  if (action.type === 'GRAPHDATA') {
    return _objectSpread({}, state, {
      GraphData: action.value
    });
  }

  if (action.type === 'GraphData') {
    return _objectSpread({}, state, {
      GraphData: action.value
    });
  }

  if (action.type === 'LOADINGEFFECT2') {
    return _objectSpread({}, state, {
      LoadingOn2: action.value
    });
  }

  if (action.type === 'LOADINGEFFECT') {
    return _objectSpread({}, state, {
      LoadingOn: action.value
    });
  } //token or coin


  if (action.type === 'TOKENTYPE') {
    return _objectSpread({}, state, {
      TokenType: action.value
    });
  } //jalali calendar


  if (action.type === 'JALALICALENDAR') {
    return _objectSpread({}, state, {
      jalaliCalendar: action.value
    });
  } //loading effect


  if (action.type === 'SETISLOADING') {
    return _objectSpread({}, state, {
      isLoading: action.value
    });
  } //researcher states


  if (action.type === 'SETSTARTTIME') {
    return _objectSpread({}, state, {
      starttime: action.value
    });
  }

  if (action.type === 'SETENDTIME') {
    return _objectSpread({}, state, {
      endtime: action.value
    });
  }

  if (action.type === 'SETSTARTAMOUNT') {
    return _objectSpread({}, state, {
      startAmount: action.value
    });
  }

  if (action.type === 'SETENDAMOUNT') {
    return _objectSpread({}, state, {
      endAmount: action.value
    });
  }

  if (action.type === "SETBASICMODAL") {
    return _objectSpread({}, state, {
      basicModal: action.value
    });
  }

  if (action.type === "SHOWNAVBAR") {
    return _objectSpread({}, state, {
      showNavbar: true
    });
  }

  if (action.type === "DONTSHOWNAVBAR") {
    return _objectSpread({}, state, {
      showNavbar: false
    });
  }

  if (action.type === "SHOWMOBILEMENU") {
    return _objectSpread({}, state, {
      showMobileMenu: action.value
    });
  }

  if (action.type === "SETWITCHPAGE") {
    return _objectSpread({}, state, {
      witchPage: action.value
    });
  }

  if (action.type === "SETSHOWTRANSACTIONDATA") {
    return _objectSpread({}, state, {
      showTransactionData: action.value
    });
  }

  if (action.type === "SETshowWalletData") {
    return _objectSpread({}, state, {
      showWalletData: action.value
    });
  }

  if (action.type === "SETISADMIN") {
    return _objectSpread({}, state, {
      isAdmin: action.value
    });
  }

  if (action.type === "SETNOTIFNUMBER") {
    return _objectSpread({}, state, {
      notifNumber: action.value
    });
  } // if (action.type === "SHOWADMINACCESSBOX") {
  //     return {
  //         ...state,
  //         showAdminAccessBox:action.value
  //     }
  // }


  if (action.type === "TransactionDetailCurrencyMode") {
    return _objectSpread({}, state, {
      TransactionDetailCurrencyMode: action.value
    });
  }

  if (action.type === "SETWDetail") {
    return _objectSpread({}, state, {
      WDetail: action.value
    });
  }

  if (action.type === "SETWDetail") {
    return _objectSpread({}, state, {
      WDetail: action.value
    });
  }

  if (action.type === "miningMode") {
    return _objectSpread({}, state, {
      miningMode: action.value
    });
  }

  return state;
};

var _default = reducer;
exports["default"] = _default;