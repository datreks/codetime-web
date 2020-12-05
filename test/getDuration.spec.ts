import { getDuration } from "../middleware/utils/getDuration";
test("durations", () => {
  expect(getDuration(0)).toBe("0sec");
  expect(getDuration(10000)).toBe("10secs");
  expect(getDuration(60000)).toBe("60secs");
  expect(getDuration(60050)).toBe("1min");
  expect(getDuration(3600000)).toBe("60mins");
  expect(getDuration(3601000)).toBe("1hr");
  expect(getDuration(133601000)).toBe("1d 13hrs");
  expect(getDuration(15234664000)).toBe("176ds 7hrs");
});