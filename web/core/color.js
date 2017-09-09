/* eslint no-bitwise: 0, no-plusplus: 0 */

export default str => {
  let hash = 0
  if (str.length === 0)
    return hash
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash &= hash
  }
  return `hsl(${Math.abs(hash % 360)}, 80%, 40%)`
}
