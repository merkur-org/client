_addSplat(splat) {
  const { x, y, dx, dy, color } = splat

  if (x === undefined) return
  if (y === undefined) return
  if (dx === undefined) return
  if (dy === undefined) return
  if (color === undefined) return

  this._splat(x, y, dx, dy, color)
}

_addSplats(splats) {
  for (const splat of splats) {
    this._addSplat(splat)
  }
}
