import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  
  reducers: {
    addProduct: (state, action) => {
      const { id, title, img, quantity, size, price } = action.payload;
      const existingProduct = state.products.find((p) => p.id === id && p.size.toString() === size.toString());
   
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.products.push({
          id,
          name: title,
          img,
          quantity,
          size: size,
          price,
        });
      }
    
      state.quantity += quantity;
      state.total += price;
    },

    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },

    incrementQuantity: (state, action) => {
      const { productId, size } = action.payload;
      const product = state.products.find((p) => p.id === productId && p.size === size);
      if (product) {
        product.quantity += 1;
        state.quantity += 1;
        state.total += product.price;
      }
    },
    
    decrementQuantity: (state, action) => {
      const { productId, size } = action.payload;
      const product = state.products.find((p) => p.id === productId && p.size === size);
      if (product && product.quantity > 0) {
        product.quantity -= 1;
        state.quantity -= 1;
        state.total -= product.price;
      }
    },

    removeProduct: (state, action) => {
      const { productId, size } = action.payload;
      const productIndex = state.products.findIndex((p) => p.id === productId && p.size === size);
    
      if (productIndex !== -1) {
        const removedProduct = state.products[productIndex];
        state.quantity -= removedProduct.quantity;
        state.total -= removedProduct.price * removedProduct.quantity;
        state.products.splice(productIndex, 1);
      }
    },
    
  },
});

export const { addProduct, clearCart, incrementQuantity, decrementQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;