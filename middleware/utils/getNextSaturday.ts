export function getNextSaturday() {
  const currentDate = new Date();
  const day = currentDate.getDay();
  const delta = 6 - day;
  const resultDate = new Date(currentDate.getTime() + delta * 86400000);
  const date = resultDate.getDate().toString().padStart(2, "0");
  const month = (resultDate.getMonth() + 1).toString().padStart(2, "0");
  const year = resultDate.getFullYear();
  return `${year}-${month}-${date}`;
}

export function getStartSunday() {
  const currentDate = new Date();
  const day = currentDate.getDay();
  const delta = 7 - day;
  const resultDate = new Date(
    currentDate.getTime() + delta * 86400000 - 53 * 7 * 86400000
  );
  const date = resultDate.getDate().toString().padStart(2, "0");
  const month = (resultDate.getMonth() + 1).toString().padStart(2, "0");
  const year = resultDate.getFullYear();
  return `${year}-${month}-${date}`;
}
