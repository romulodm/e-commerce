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
      const productToAdd = action.payload;
      const existingProduct = state.products.find((p) => p.id === productToAdd.id);
      
      //if alread exists one product with the "size", increment the quantity
      if (existingProduct && existingProduct.size === productToAdd.size) {
        existingProduct.quantity += action.payload.quantity;
        state.quantity += action.payload.quantity;
        state.total += productToAdd.Price;
      } else {
        productToAdd.quantity = 1;
        state.quantity += action.payload.quantity;
        state.products.push(productToAdd);
        state.total += productToAdd.Price;
      }
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
        state.total += product.Price;
      }
    },
    
    decrementQuantity: (state, action) => {
      const { productId, size } = action.payload;
      const product = state.products.find((p) => p.id === productId && p.size === size);
      if (product && product.quantity > 0) {
        product.quantity -= 1;
        state.quantity -= 1;
        state.total -= product.Price;
      }
    },

    removeProduct: (state, action) => {
      const { productId } = action.payload;
      const productIndex = state.products.findIndex((p) => p.id === productId);

      if (productIndex !== -1) {
        const removedProduct = state.products[productIndex];
        state.quantity -= removedProduct.quantity;
        state.total -= removedProduct.Price * removedProduct.quantity;
        state.products.splice(productIndex, 1);
      }
    },
    
},
});

export const { addProduct, clearCart, incrementQuantity, decrementQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;