import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types"

export const actions = {
  addCart(context, payload){
    // let oldProducts = null
    // for(let item of state.cartList) {
    //   if(item.iid == payload.iid) {
    //     oldProducts = item
    //   }
    // }
    let oldProducts = context.state.cartList.find(item => item.iid === payload.iid)

    if(oldProducts) {
      // oldProducts.count += 1
      context.commit(ADD_COUNTER, oldProducts)

    } else {
      payload.count = 1
      // state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}