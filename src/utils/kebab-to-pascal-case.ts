function kebabToPascalCase(str: string) {
  const words = str.split('-')
  const pascalWords = words.map(word => {
    const firstLetter = word.charAt(0).toUpperCase()
    const rest = word.slice(1)
    return firstLetter + rest
  })
  return pascalWords.join('')
}

export default kebabToPascalCase
