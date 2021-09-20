import {useMounted} from './useMounted'

export const useDarkModeNeonFlicker = () => {
  const mounted = useMounted()

  if (!mounted) {
    return false
  }

  generateFlicker()
}

const generateFlicker = () => {
  // get all elements that should be animated
  const animatedElements = Array.from(
    document.querySelectorAll('.js-darkmode-flicker')
  ) as Array<HTMLElement>

  if (!animatedElements.length) {
    return false
  }

  // helper function to wrap random letters in <span>
  const wrapRandomChars = (str: string, iterations = 1) => {
    const chars = str.split('')
    const excludedChars = [' ', '-', ',', ';', ':', '(', ')', `'`, '.']
    const excludedIndexes = []
    let i = 0

    // run for the number of letters we want to wrap
    while (i < iterations) {
      const randIndex = Math.floor(Math.random() * chars.length)
      const c = chars[randIndex]

      // make sure we don't wrap a space or punctuation char
      // or hit the same letter twice
      if (!excludedIndexes.includes(randIndex) && !excludedChars.includes(c)) {
        chars[randIndex] = `<span class="flicker"><span class="tipping">${c}</span></span>`
        excludedIndexes.push(randIndex)
        i++
      }
    }

    // Fix so word don't break
    return chars
      .join('')
      .split(/((?!\sclass)\s)/gm)
      .map(word => {
        if (word === ' ') return word

        return `<span class="word-no-wrap">${word}</span>`
      })
      .join('')
  }

  // replace the plain text content in each element
  animatedElements.forEach(el => {
    const text = el.textContent.trim()
    const count = el.dataset.flickerChars ? parseInt(el.dataset.flickerChars) : undefined

    el.innerHTML = wrapRandomChars(text, count)
  })
}
