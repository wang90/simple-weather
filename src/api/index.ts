
import config from "@/config/index.ts";


export function getHttpUrl( lonlant = '121.6544,25.1552') {
  return `https://api.caiyunapp.com/v2.5/${config.token}/${lonlant}/realtime.json`
}

