import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/data.json";

export const moneySlice = createSlice({
    name: 'money',
    initialState: {
        money: 100000000000,
        items: data.products,
        basket: [],
        total: 0,
    },
    reducers: {
        buy: (state, action) => {
            const product = action.payload;
            const existingProduct = state.basket.find(item => item.id === product.id);

            if (existingProduct && existingProduct.productPrice < state.money) {
                existingProduct.count += 1;
                state.items[product.id - 1].count += 1;
            }
            else if (!existingProduct && product.productPrice <= state.money) {
                state.basket = [...state.basket, { ...product, count: 1 }];
                state.items[product.id - 1].count = +1;
            }
            const addedProductCost = Number(product.productPrice);
            if (addedProductCost <= state.money) {
                state.total += addedProductCost;
                state.money -= addedProductCost;
            }
        },
        sell: (state, action) => {
            const product = action.payload;
            const existingProduct = state.basket.find(item => item.id === product.id);
// SEPET 0 OLUNCA SATTIKLARIM GERİ GELMİYOR. FİXLE
            if (existingProduct) {
                existingProduct.count -= 1;
                state.items[product.id - 1].count -= 1;

                if (existingProduct.count === 0) {
                    state.basket = state.basket.filter(item => item.id !== product.id);
                }
                const addedProductCost = Number(product.productPrice);
                console.log(addedProductCost);
                    state.total -= addedProductCost;
                    state.money += addedProductCost;
                
            }
        },
    },
})

export const { buy, sell } = moneySlice.actions;
export default moneySlice.reducer;