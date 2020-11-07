<template>
  <view :class="['address-compontent',{ 'show': visible }]">
    <view class="close-botton" @tap="close">关闭</view>
    <view class="default-title">热门城市</view>
    <view class="default-address">
      <view v-for = "(ad, index) in address"
            :class="['default-address-item', {'active':ad.active}]"
            :key="index"
            @tap = "choose(index,'hot')">{{ ad.city }}</view>
    </view>
    <view class="search-content" v-if="history.length > 0">
      <view class="default-title">搜索过的历史</view>
      <view class="default-address history-address">
        <view v-for = "(ad, index) in history" class="history-item" :key="index">
            <text :class="['default-address-item', {'active': ad.active }]"
              @tap = "choose(index,'history')">{{ ad.address }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="less">
.address-compontent {
  position: fixed;
  left: 0 ;
  right:0;
  padding: 50px 20px 80px;
  background: #fff;
  bottom: -9999px;
  box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
  transition:  bottom 0.4s;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  .close-botton {
    position: absolute;
    padding: 5px 10px;
    top:20px;
    right: 20px;
    border-radius: 10px;
    font-size: 24px;
    color: #333;
    border: 1px solid #333;
  }
  &.show {
    bottom: 0 ;
  }
  .default-title {
     font-size: 30px;
     color: #333;
     margin-bottom: 20px;
  }
  .default-address {
    display : flex;
    .default-address-item {
      border: 2px solid #333;
      border-radius: 10px;
      padding: 5px 15px;
      margin : 0 10px;
      transition: all 0.1s;
      color: #333;
      &.active {
        background: #333;
        color: #fff;
        border-color: #333
      }
    }

    &.history-address {
      display : block;
      min-height: 120px;
      padding-top: 5px;
      .history-item {
        height: 60px;

      }
    }
  }
  .search-content {
    padding: 20px 0;
  }
}
</style>
<script>
import { getLocation , getLocationName , chooseLocation } from "@/api/index.ts";
import { getHistory , setHistory } from "@/libs/location.ts";
const defaultAddress = [
  { 'city': '北京', 'type': 'city', 'lonlat': '116.397827,39.90374' },
  { 'city': '上海', 'type': 'city', 'lonlat': '121.499763,31.23958' },
  { 'city': '广州', 'type': 'city', 'lonlat': '113.32446,23.10647' },
  { 'city': '选择其他城市', 'type': 'other', 'lonlat': '' },
]
export default {
  name: 'AddressComponent',
  props: {
    visible: {
      type : Boolean,
      default: false,
    }
  },
  data() {
    return {
      address: [],
      history: [],
    }
  },
  created() {
    this.address = defaultAddress.map(( v, i ) => {
       const item = {
          city : v.city,
          lonlat: v.lonlat,
          active: false,
          type: v.type,
       }
       return item;
    });
    this.getHistory();
  },
  methods: {
    choose( index , type ) {
      this.address.map( v => v.active = false );
      this.history.map( v => v.active = false );
      if ( type === 'hot') {
        const address = this.address[ index ];
        const type = address.type;
        if ( type === 'other') {
          chooseLocation().then( res => {
            if ( res && res.longitude && res.latitude ) {
              this.emit( `${ res.longitude },${ res.latitude }`)
              this.setHistory( `${ res.longitude },${ res.latitude }`, res.name )
            }
          }).catch( err => {
            console.log(err);
          })
        } else {
          this.address[ index ][ 'active' ] = true;
          this.emit( address.lonlat, address.name );
        }
      } else if ( type === 'history' ) {
        const history = this.history[ index ];
        this.history[ index ][ 'active' ] = true;
        this.emit( history.lonlat, history.address );
      }
    },

    emit( lonlat , address ) {
      this.$emit( "choose", `${ lonlat }` );
      this.close();
    },

    setHistory( lonlat , address ) {
      this.history.map( v => v.active = false );
      if ( this.history.length >= 5) {
        this.history.slice(5);
      }
      this.history.unshift({
        address : address,
        lonlat: lonlat,
        active: true,
        type: 'add',
      })
      setHistory( this.history );
    },

    getHistory() {
      getHistory().then(lists=>{
       console.log(lists);
       if ( lists.length > 0) {
         this.history = lists;
         this.history.map(v=>v.active= false);
       }
      }).catch(err=>{
        console.log(err);
      });
    },

    close() {
      this.$emit( "update:visible", false );
    }



  }
}
</script>
