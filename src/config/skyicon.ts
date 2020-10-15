// const CYAPP_TOKEN = "RwBZr6sJ77eFaooF";
// 晴（白天）	CLEAR_DAY	cloudrate < 0.2
// 晴（夜间）	CLEAR_NIGHT	cloudrate < 0.2
// 多云（白天）	PARTLY_CLOUDY_DAY	0.8 >= cloudrate > 0.2
// 多云（夜间）	PARTLY_CLOUDY_NIGHT	0.8 >= cloudrate > 0.2
// 阴	CLOUDY	cloudrate > 0.8
// 轻度雾霾	LIGHT_HAZE	PM2.5 100~150
// 中度雾霾	MODERATE_HAZE	PM2.5 150~200
// 重度雾霾	HEAVY_HAZE	PM2.5 > 200
// 小雨	LIGHT_RAIN
// 中雨	MODERATE_RAIN
// 大雨	HEAVY_RAIN
// 暴雨	STORM_RAIN
// 雾	FOG	能见度低，湿度高，风速低，温度低
// 小雪	LIGHT_SNOW
// 中雪	MODERATE_SNOW
// 大雪	HEAVY_SNOW
// 暴雪	STORM_SNOW
// 浮尘	DUST	aqi > 150，pm10 > 150，湿度 < 30%，风速 < 6 m/s
// 沙尘	SAND	aqi > 150，pm10 > 150，湿度 < 30%，风速 > 6 m/s
// 大风	WIND


// sunny cloudy fog rainy rainbow starry stormy snowy
module.exports = {
  CLEAR_DAY : {
    type: 'sunny',
    value: '晴'
  },
  CLEAR_NIGHT: {
    type: 'starry',
    value: '晴'
  },
  PARTLY_CLOUDY_DAY: {
    type: 'cloudy',
    value: '多云'
  },
  PARTLY_CLOUDY_NIGHT: {
    type: 'cloudy',
    value: '多云'
  },
  CLOUDY:{
    type: 'cloudy',
    value: '多云'
  },
  LIGHT_HAZE: {
    type: 'fog',
    value: '轻度雾霾'
  },
  MODERATE_HAZE: {
    type: 'fog',
    value: '中度雾霾'
  },
  HEAVY_HAZE: {
    type: 'fog',
    value: '重度雾霾'
  },
  LIGHT_RAIN: {
    type: 'rainy',
    value: '小雨'
  },
  MODERATE_RAIN: {
    type: 'rainy',
    value: '中雨'
  },
  HEAVY_RAIN: {
    type: 'rainy',
    value: '大雨'
  },
  STORM_RAIN: {
    type: 'rainy',
    value: '暴雨'
  },
  FOG: {
    type: 'fog',
    value: '雾'
  },
  LIGHT_SNOW: {
    type: 'snowy',
    value: '小雪'
  },
  MODERATE_SNOW: {
    type: 'snowy',
    value: '中雪'
  },
  HEAVY_SNOW: {
    type: 'snowy',
    value: '大雪'
  },
  STORM_SNOW: {
    type: 'snowy',
    value: '暴雪'
  },
  DUST: {
    type: 'fog',
    value: '浮沉'
  },
  SAND: {
    type: 'fog',
    value: '沙尘'
  },
  WIND: {
    type: 'sunny',
    value: '大风'
  }
}
