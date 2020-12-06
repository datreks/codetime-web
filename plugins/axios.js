import { getToken } from "../middleware/utils/getToken";
export default function ({ $axios }) {
  $axios.onRequest((config) => {
    config.headers.token = getToken();
  });
}
