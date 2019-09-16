// https://www.geeksforgeeks.org/calculate-angle-hour-hand-minute-hand/

// Calculate the angle between hour hand and minute hand
// This problem is know as Clock angle problem where we need to find angle
// between hands of an analog clock at a given time.
// Examples:
// 
// Input:  "12:30"
// Output: 165
// 
// Input:  "3:30"
// Output: 75

const timeToDegrees = (time) => {
  const [hour, minute] = time.split(":").map((x) => parseInt(x));

  if (hour > 12)   { throw "Minute can't be greater than 12"; }
  if (minute > 59) { throw "Minute can't be greater than 59"; }
  
  const hourHandMinute    = hourToMinute(hour, minute);
  const hourHandDegrees   = minuteToDegrees(hourHandMinute);
  const minuteHandDegrees = minuteToDegrees(minute);

  const angleBetween = Math.abs(minuteHandDegrees - hourHandDegrees);

  return angleBetween > 180 ? 360 - angleBetween : angleBetween;
}

const hourToMinute = (hour, minute) => {
  const baseMinute = hour === 12 ? 0 : hour;
  const baseDegree = baseMinute * 5;
  const degreeOffset = (minute / 60) * 5; // Calculate how far the hour hand has moved based on the minute hand's position

  return baseDegree + degreeOffset;
}

const minuteToDegrees = (minute) => {
  return minute * 6;
}
