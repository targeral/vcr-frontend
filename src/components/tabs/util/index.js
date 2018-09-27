export function getTransformPropValue (v) {
  return {
    transform: v
  }
}

export function getPxStyle (value, unit = 'px', vertical = false) {
  value = vertical ? `0px, ${value}${unit}, 0px` : `${value}${unit}, 0px, 0px`
  return `translate3d(${value})`
}

export function setPxStyle (el, value, unit = 'px', vertical = false, useLeft = false) {
  console.log(useLeft, value)
  if (useLeft) {
    if (vertical) {
      el.style.top = `${value}${unit}`
    } else {
      el.style.left = `${value}${unit}`
    }
  } else {
    setTransform(el.style, getPxStyle(value, unit, vertical))
  }
}

export function setTransform (style, v) {
  console.log(style, v)
  style.transform = v
  style.webkitTransform = v
  style.mozTransform = v
}
