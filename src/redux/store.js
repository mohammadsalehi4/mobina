// ** Redux Imports
import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'

// eslint-disable-next-line no-unused-vars
const initialState = {
  showNavbar:false,
  showMobileMenu:false,
  witchPage:1,
  showTransactionData:false,
  isAdmin:true,
  notifNumber:0,
  showAdminAccessBox:false,
  TransactionDetailCurrencyMode:0
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  }
})

export { store }
