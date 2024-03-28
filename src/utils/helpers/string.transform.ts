export function camelToSnake(param: string) {
  return param
    .replace(/[\w]([A-Z])/g, function (m) {
      return m[0] + '_' + m[1]
    })
    .toLowerCase()
}

export function snakeToCamel(param: string) {
  return param.replace(/(_\w)/g, function (m) {
    return m[1].toUpperCase()
  })
}
