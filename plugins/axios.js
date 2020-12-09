import { getToken } from "../middleware/utils/getToken";
export default function ({ $axios }) {
  $axios.onRequest((config) => {
    if (config.url.slice(0, 4) !== "http" && config.url !== "/userInfo") {
      // 使用base url，则需要带token
      config.headers.token = getToken();
    }
  });
}
