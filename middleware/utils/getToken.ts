export function getToken() {
  const token = localStorage.getItem("token");
  let finalToken: string;
  if (token == null || !isToken(token)) {
    finalToken = "";
  } else {
    finalToken = token;
  }
  return finalToken;
}
function isToken(token: string) {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    token
  );
}
