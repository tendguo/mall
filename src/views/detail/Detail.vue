<template>
  <div id="detail">
    
    <detail-navbar class="detail-nav" @itemClick="itemClick" ref="nav"></detail-navbar>
    <b-scroll class="content" ref="scroll" @getposition="_listenScrollTheme" :probeType="3">
      
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-info :goods="goods"></detail-info>
      <detail-shop :shop="shop"></detail-shop>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment ref="comment" :commentInfo="commentInfo"></detail-comment>
      <good-list ref="recommend" :goods="recommend"></good-list>
      
    </b-scroll>
    <!-- <div class="message">
      <div>{{message}}</div>
    </div> -->
    <back-top @click.native="backClick" v-show="isShowBack"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <!-- <toast :message="message" :isShow="isshow"></toast> -->
  </div>
</template>

<script>
import DetailNavbar from './childComps/DetailNavbar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailInfo from "./childComps/DetailInfo.vue";
import DetailShop from './childComps/DetailShop.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/GoodsParam.vue'
import DetailComment from './childComps/DetailComment.vue'
import DetailBottomBar from './childComps/DetailBottomBav.vue'
// import Toast from 'components/common/toast/Toast'

import GoodList from 'components/content/goodlist/GoodList'
import BScroll from 'components/common/bscroll/BScroll'

import { getDetail, Goods, Shop, GoodsParam, getCommend} from "network/detail.js";
import {imgListener, backTopmixin} from "common/mixin.js"
import {debounce} from "common/utils.js"


export default {
  name: 'Detail',
  data() {
    return {
      id: null,
      message: '加入购物车成功',
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      commentInfo: {},

      paramInfo: {},
      recommend: [],
      movePositions: [],
      getPosition: null,
      count: 45,
      currentIndex: null,
      // message: '',
      // isshow: null
      
    }
  },
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailInfo,
    DetailShop,
    BScroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailComment,
    GoodList,
    DetailBottomBar,
    // Toast
    
    
    
  },
  mixins: [imgListener, backTopmixin],
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
      // 请求评论信息
       if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
      }
    })
    getCommend().then((res, err) => {
      if(err) return
      const data = res.data

      this.recommend = data.list
      // console.log(this.recommend)
    })
    this.getPosition = debounce(() => {
      this.movePositions.push(0)
      this.movePositions.push(this.$refs.params.$el.offsetTop-this.count )
      this.movePositions.push(this.$refs.comment.$el.offsetTop -this.count)
      this.movePositions.push(this.$refs.recommend.$el.offsetTop -this.count)
      this.movePositions.push(Number.MAX_VALUE)
      // console.log(this.movePositions)
    }, 100)

  },

  
  destroyed() {
    this.$bus.$off('imageLoadFinish', this.itemImgListener)
  },

 
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()

      this.getPosition()
    },
    itemClick(index) {
      this.$refs.scroll.scrTop(0, (-this.movePositions[index]), 100)
    },
    _listenScrollTheme(position) {
        let length = this.movePositions.length;
        let positionY = -position.y
        // console.log(positionY)
        for (let i = 0; i < length-1; i++) {
          
          /**
           * 判断的方案:
           *  方案一:
           *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
           *    优点: 不需要引入其他的内容, 通过逻辑解决
           *    缺点: 判断条件过长, 并且不容易理解
           *  方案二:
           *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
           *    优点: 简洁明了, 便于理解
           *    缺点: 需要引入一个较大的int数字
           * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
           * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
           */
          if (this.currentIndex !== i && (positionY >= this.movePositions[i] && positionY < this.movePositions[i+1])) {
            
              this.currentIndex = i;
              // console.log(this.currentIndex)
              this.$refs.nav.curindex = this.currentIndex
             
            }
           
        }
        this.listenerBackTop(position)
    },
    addToCart() {
      const product = {}

      product.iid = this.id;
      product.imgURL = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc;
      product.realPrice = this.goods.realPrice;
      // console.log(product)
      
      this.$store.dispatch('addCart', product).then(res => {
      //   this.isshow = true
      //   this.message = res
        // console.log(res)
      //   setInterval(() => {
      //     return this.isshow = false
      //   }, 2000)
        this.$toast.show(res, 2000)
        // console.log(this.$toast)
      })
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
    height: calc(100% - 44px - 58px);
  }
  /* .message{
    position: relative;
    width: 120px;
    height: 30px;
    background-color: black;

    z-index: 9999;
  } */
</style>