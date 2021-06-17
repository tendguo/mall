<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :ischecked="isSelectAll" @click.native="clickButton"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ￥{{totalPrice}}</span>
    <span class="buy-product">去计算({{cartCount}})</span>

    
  </div>
  
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'CartButtomBar',

  
  components: {
    CheckButton
  },
  activated() {

  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList.filter(item => item.checked).reduce((preprice, item) => {
        return preprice + item.realPrice * item.count
      }, 0)
    },
    cartCount() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if(this.cartList.length === 0) return false
    
      const name = this.cartList.find(item => !item.checked) 
      return !name
      
    }
  },
  methods: {
    clickButton() {
    //   if(this.isSelectAll) {
    //     this.cartList.forEach(item => item.checked = false)
    //   } else {
    //     this.cartList.forEach(item => item.checked = true)
    //   }
      const checked = this.isSelectAll
      this.cartList.forEach(item => item.checked = !checked)
    }
  }

}
</script>
<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
