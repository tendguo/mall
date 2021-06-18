import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types"

export const actions = {
  addCart(context, payload){
    // let oldProducts = null
    // for(let item of state.cartList) {
    //   if(item.iid == payload.iid) {
    //     oldProducts = item
    //   }
    // }
    return new Promise((resolve,reject) => {
      let oldProducts = context.state.cartList.find(item => item.iid === payload.iid)

      if(oldProducts) {
        // oldProducts.count += 1
        context.commit(ADD_COUNTER, oldProducts)
        resolve("添加购物车成功")

      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve("添加购物车成功")
      }
    })
  }
}