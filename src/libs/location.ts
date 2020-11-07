import Taro from "@tarojs/taro";

const AddressStoryKey = "history";

export function getHistory() {
  return new Promise((reslove, reject) => {
    Taro.getStorage({
      key: AddressStoryKey,
      success: res => {
        const data = res.data;
        if (typeof data === "string" && data) {
          try {
            reslove(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        }
      },
      fail: err => {
        reject(err);
      }
    });
  });
}

export function setHistory(data) {
  Taro.setStorage({
    key: AddressStoryKey,
    data: JSON.stringify(data)
  });
}
