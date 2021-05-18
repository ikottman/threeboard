export function tan(degrees: number) {
  return Math.tan(toRadians(degrees));
}

export function toRadians(degrees: number) {
  return degrees * Math.PI / 180;
}