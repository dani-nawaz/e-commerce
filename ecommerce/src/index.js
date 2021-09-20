import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './bootstrap.min.css'
import App from './App'
import { CartProvider } from './context/cart_context'
import { ProductsProvider } from './context/product_context'
import { UserProvider } from './context/user_context'
import { OrderProvider } from './context/order_context'
import { OrderPayProvider } from './context/orderPayContext'
import { MyOrderProvider } from './context/myOrderContext'
import { UserListProvider } from './context/userListContext'
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ProductsProvider>
        <CartProvider>
          <OrderProvider>
            <OrderPayProvider>
              <MyOrderProvider>
                <UserListProvider>
                  <App />
                </UserListProvider>
              </MyOrderProvider>
            </OrderPayProvider>
          </OrderProvider>
        </CartProvider>
      </ProductsProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
