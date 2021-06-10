<template>
  <div id="detail">
    <detail-navbar class="detail-nav"></detail-navbar>
    <b-scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-info :goods="goods"></detail-info>
      <detail-shop :shop="shop"></detail-shop>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
    </b-scroll>
  </div>
</template>

<script>
import DetailNavbar from './childComps/DetailNavbar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailInfo from "./childComps/DetailInfo.vue";
import DetailShop from './childComps/DetailShop.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/GoodsParam.vue'

import BScroll from 'components/common/bscroll/BScroll'

import { getDetail, Goods, Shop, GoodsParam} from "network/detail.js";


export default {
  name: 'Detail',
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},

      paramInfo: {}
    }
  },
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailInfo,
    DetailShop,
    BScroll,
    DetailGoodsInfo,
    DetailParamInfo
    
    
  },
  created() {
    // 获取商品id
    this.id = this.$route.params.iid
    // 请求数据
    
    getDetail(this.id).then(res => {
     
      const data = res.result;

      this.topImages = data.itemInfo.topImages

      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 请求店铺信息
      this.shop = new Shop(data.shopInfo)
      // 请求图片信息
      this.detailInfo = data.detailInfo

      // 请求商品信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>