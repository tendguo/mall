<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" 
                  class="tab" 
                  @tabClick="tabClick"
                  ref="tabcon1"
                  v-show="isTabShow"
                  >
    </tab-control>
    <b-scroll class="content" 
              ref="scroll" 
              @getposition="getPosition" 
              :probeType="3" 
              :pullingUpLoad='true'
              @pullingUp="loadMore">
      <home-swiper :banners="banners" @imgLoad="imageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" 
                  class="tab-control" 
                  @tabClick="tabClick"
                  ref="tabcon2"
                  ></tab-control>
      <good-list :goods="goodsName"></good-list>
    </b-scroll>
    <back-top @click.native="backClick" v-show="isShowBack"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView.vue'

  import TabControl from 'components/common/tabcontrol/TabControl'

  import GoodList from 'components/content/goodlist/GoodList'

  import BScroll from 'components/common/bscroll/BScroll'
  

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {imgListener, backTopmixin} from "common/mixin.js"

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodList,
      BScroll,
      
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        tabname: 'pop',
        isShowBack: false,
        tabcontrol: 0,
        isTabShow: false,
        leaveLocation: 0,
       
      }
    },
    mixins: [imgListener, backTopmixin],
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()
      // 2、请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      
    },
    activated() {
      this.$refs.scroll.scrTop(0, this.leaveLocation, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.leaveLocation = this.$refs.scroll.getScrollPosition()
      this.$bus.$off('imageLoadFinish',this.itemImgListener)
    },
    computed: {
      goodsName() {
        return this.goods[this.tabname].list
      }
    },
    methods: {
      // 网络数据请求
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          // console.log(res)

          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPulling()
        })
      },
      // 自定义事件本地数据请求
      tabClick(index) {
        switch (index) {
          case 0: 
            this.tabname = 'pop'
            break
          case 1:
            this.tabname = 'new'
            break
          case 2: 
            this.tabname = 'sell'
            break
        
        }

        this.$refs.tabcon1.curindex = index
        this.$refs.tabcon2.curindex = index
      },
      // 返回顶部
      backClick() {
        this.$refs.scroll.scrTop(0, 0, 500)
      },
      // 监听滚动位置
      getPosition(position) {
        
        // console.log(position)
        this.listenerBackTop(position)
        this.isTabShow = (-position.y) > this.tabcontrol 
      },
      
      // 监听上拉加载更多
      loadMore() {
        this.getHomeGoods(this.tabname)
      },
      imageLoad() {
        this.tabcontrol = this.$refs.tabcon2.$el.offsetTop
        // console.log(this.tabcontrol)
      }
      
    }
  }
</script>

<style scoped>
  #home{
    position: relative;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    z-index: 9;
  }

  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab{
    position: relative;
    top: 44px;
    z-index: 9;
    background-color: #fff;
  }
  
</style>
