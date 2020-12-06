export function getToken() {
  let token = localStorage.getItem("token");
  let finalToken: string;
  if (token == null) {
    finalToken = "";
  } else {
    finalToken = token;
  }
  return finalToken;
}
