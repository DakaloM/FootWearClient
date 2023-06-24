import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice ({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },

    reducers: {
        resertCart: (state) => {
            state.quantity = 0;
            state.products = [];
            state.total = 0;
        },
        addProduct: (state, action) => {
            state.quantity += action.payload.quantity;
            state.products = [...state.products, action.payload]
            state.total += action.payload.price * action.payload.quantity;
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload._id);
            state.quantity -= action.payload.quantity;
            state.total -= action.payload.price * action.payload.quantity;
        },
        increaseCount: (state, action) => {
            state.products = state.products.map((product) => {
                if(product._id === action.payload._id) {
                    product.quantity++;
                    
                }
                
                return product;
            });
            state.quantity++;
            state.total += action.payload.price;

        },
        decreaseCount: (state, action) => {
            state.products = state.products.map((product) => {
                if(product._id === action.payload._id) {
                    
                    product.quantity--;
                    
                }
                return product;
            })
            state.quantity--;
            state.total -= action.payload.price;
        }
    }
})

export const {addProduct, removeProduct, increaseCount, decreaseCount, resertCart} = cartSlice.actions;
export default cartSlice.reducer