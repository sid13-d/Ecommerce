import { useState } from 'react';

import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import Product from './components/Product.jsx';
import CartContextProvider from './store/shopping-cart-context.jsx';

function App() {

  return (
    // we add the value prop to the provider and pass in an object with the items property
    //The default value set when creating the context is only used if a component that was not wrapped by the provider
    //component tries the access the context value. In our case, we are wrapping the entire app with the provider component,
    <CartContextProvider>
      <Header
       
      />
      <Shop> 
      {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
