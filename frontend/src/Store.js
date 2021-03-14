import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  ProductCreateReducer,
  ProductDeleteReducer,
  ProductDetailsReducer,
  ProductReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userDeleteReducer,
  userDetailReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userupdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  createOrderReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderMyListReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productList: ProductReducer,
  productDetails: ProductDetailsReducer,
  productDelete: ProductDeleteReducer,
  productCreate: ProductCreateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userupdateProfileReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer, // Bugs After Changing Current Admin User The Menu Still Right There
  userDelete: userDeleteReducer,
  createOrder: createOrderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMyList: orderMyListReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const paymentMEthodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "";

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMEthodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage }, // It Will Affect @profile after u open admin menu for edit user
};
const middleWare = [thunk];
const Store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default Store;
