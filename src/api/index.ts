// import http from "@/libs/axios.ts";
import config from "@/config/index.ts";
import Taro from "@tarojs/taro"

export function getWeather(lonlant:string = config.lonlant) {
  return new Promise((resolve, reject) => {
    Taro.request({
      // url: `https://api.caiyunapp.com/v2/${config.token}/${lonlant}/realtime.json`, //仅为示例，并非真实的接口地址
      url : `https://api.caiyunapp.com/v2.5/Y2FpeXVuX25vdGlmeQ==/${lonlant}/forecast?dailysteps=15&alert=true&_=1599376146301`,
      success:  (res)=> {
        resolve(res.data)
      },
      fail:(err) =>{
        reject(err);
      }
    })
  });
}

export function chooseLocation() {
  return new Promise((resolve, reject) => {
    Taro.showLoading({
      title: '加载中',
    })
    Taro.chooseLocation({
      success:  (res)=> {
        console.log(res);
        if(res && res.longitude && res.latitude) {
          Taro.showToast({
            title: '更新成功',
            icon: 'success',
            duration: 2000
          })
          resolve(res);
        }else {
          Taro.showToast({
            title: '获取失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
      complete:(res) =>{
        Taro.hideLoading();
      },
    })
  });
}


export function getLocation  () {
  return new Promise((resolve, reject) => {
    Taro.getLocation({
      type: 'wgs84',
      success:  (res) => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        const lonlant  = latitude && longitude ? `${longitude},${latitude}` : config.lonlant;
        resolve({lonlant})
      },
      fail: () => {
        reject({lonlant:config.lonlant});
      }
    })
  })

}

export function getLocationName(location: string) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url : `https://restapi.amap.com/v3/geocode/regeo?key=127caacaa204cc855a9bcdbc8ca06a49&location=${location}&_=1599376146303`,
      success:  (res)=> {
        resolve(res.data)
      },
      fail:(err) =>{
        reject(err);
      }
    })
  });
}

