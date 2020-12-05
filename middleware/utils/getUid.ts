export function getUid() {
  let id = localStorage.getItem("uid");
  let finalId: number;
  if (id == null) {
    finalId = 1;
  } else {
    finalId = parseInt(id);
  }
  return finalId;
}
