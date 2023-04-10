//localhost:3002
import request from "@/utils/request";

export function getBodyByUrl(data) {
  return request({ url: "/web/getBodyByUrl", method: "post", data });
}
