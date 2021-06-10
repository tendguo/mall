<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item, index) in titles " :key="item.id" @click="itemClick(index)">
      <span :class="{active: index === curindex}">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default: {
        
      }
    }
  },
  data() {
    return {
      curindex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.curindex = index
      this.$emit('tabClick', index)


    }
  }
}
</script>

<style scoped>
  .tab-control{
    display: flex;
    
  }

  .tab-control-item{
    flex: 1;
    text-align: center;
    height: 35px;
    margin-top: 10px;
   
   
  }
  .tab-control-item span{

    
    padding: 3px;
    
    /* height: 30px; */
  }
  .active{
    color: var(--color-high-text);
    border-bottom: 2px solid var(--color-tint);
  }

</style>