export type Vec3 = [number, number, number];

export function iso([x, y, z]: Vec3): [number, number] {
  return [(x - y) * 0.866, (x + y) * 0.5 - z];
}

export function isoPoints(points: Vec3[]) {
  return points.map((p) => iso(p).map((n) => n.toFixed(1)).join(",")).join(" ");
}

export function isoBox([x, y, z]: Vec3, [w, d, h]: Vec3) {
  return {
    top: isoPoints([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]]),
    left: isoPoints([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]]),
    right: isoPoints([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]]),
  };
}

export function lerp3(a: Vec3, b: Vec3, t: number): Vec3 {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}
