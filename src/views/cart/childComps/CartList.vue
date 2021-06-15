<template>
  <div class="cart-list">
    <b-scroll class="content" ref="scroll">
      <cart-list-item v-for="item in cartList" :key="item.id" :itemInfo="item"> {{item}}</cart-list-item>
      
    </b-scroll>
  </div>
</template>

<script>
import BScroll from 'components/common/bscroll/BScroll'
import CartListItem from './CartListItem.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'CartList',
  components: {
    CartListItem,
    BScroll
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()//防止页面滚动不了，通过刷新，来获取新的scrollHeight的值
    // console.log('刷新完成')
  }
}
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>