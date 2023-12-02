import {configureStore} from '@reduxjs/toolkit'
import moneySlice from './money/moneySlice'

export const store = configureStore({
    reducer: moneySlice,
})