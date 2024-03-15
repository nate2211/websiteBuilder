import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        carts: [],

    },
    reducers: {
        add: (state, action) => {
            const cart = action.payload;
            const existingcartIndex = state.carts.findIndex(cart => cart.cart === cart.cart);

            if (existingcartIndex !== -1) {
                // If cart with the same name exists, update the quantity of the first matching cart object
                state.carts[existingcartIndex].Quantity += parseInt(cart.Quantity);
            } else {
                // Otherwise, add the new cart item to the state
                state.carts.push(action.payload);
            }
        },
        edit: (state, action) => {
            const updatedcart = action.payload;
            const index = state.carts.findIndex(cart => cart.cart === updatedcart.cart);
            if (index !== -1) {
                state.carts[index] = updatedcart;
            }
        },
        remove: (state, action) => {
            const cartToRemove = action.payload;
            state.carts = state.carts.filter(cart => cart.cart !== cartToRemove.cart);
        },
    },
})

export const {add, edit, remove} = cartSlice.actions

export default cartSlice.reducer