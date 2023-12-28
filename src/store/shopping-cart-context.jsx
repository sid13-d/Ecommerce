import { createContext, useState, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
    items: [],
    // totalAmount: 0,
    addItem: () => {},
    updateItem: () => {}
    // removeItem: (id) => {},
    });

function shoppingCartReducer(state, action) {
    if(action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
          );
          const existingCartItem = updatedItems[existingCartItemIndex];
      
          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
          } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
              id: action.payload,
              name: product.title,
              price: product.price,
              quantity: 1,
            });
          }
      
          return {
            items: updatedItems,
          };
    }

    if(action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex(
          (cartItem) => cartItem.id === action.payload.id
        );
        const existingCartItem = updatedItems[existingCartItemIndex];
    
        if (action.payload.amount === -1 && existingCartItem.quantity === 1) {
          updatedItems.splice(existingCartItemIndex, 1);
        } else {
          const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + action.payload.amount,
          };
    
          updatedItems[existingCartItemIndex] = updatedItem;
        }
    
        return {
          items: updatedItems,
        };
    }
}

export default function CartContextProvider({children}) {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer,{
        items: [],
      });

    const [shoppingCart, setShoppingCart] = useState({
        items: [],
      });
    
      function handleAddItemToCart(id) {
        shoppingCartDispatch(
            {
                type: 'ADD_ITEM',
                payload: id
            }
        );
        
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            payload: {
                id: productId,
                amount: amount,
            }
        })
        
      }
    
      const ctxValue = {
        items: shoppingCartState.items,
        addItem: handleAddItemToCart,
        updateItem: handleUpdateCartItemQuantity,
      }

      return (
        <CartContext.Provider value={ctxValue}>
          {children}
        </CartContext.Provider>
      );
}