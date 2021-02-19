import {useEffect, useState} from 'react'
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
    const excludedChars = [' ', '-', ',', ';', ':', '(', ')', `'`]
    const excludedIndexes = []
    let i = 0

    // run for the number of letters we want to wrap
    while (i < iterations) {
      const randIndex = Math.floor(Math.random() * chars.length)
      const c = chars[randIndex]

      // make sure we don't wrap a space or punctuation char
      // or hit the same letter twice
      if (!excludedIndexes.includes(randIndex) && !excludedChars.includes(c)) {
        chars[randIndex] = `<span class="tipping"><span class="flicker">${c}</span></span>`
        excludedIndexes.push(randIndex)
        i++
      }
    }

    return chars.join('')
  }

  // replace the plain text content in each element
  animatedElements.forEach(el => {
    const text = el.textContent.trim()
    const count = el.dataset.flickerChars ? parseInt(el.dataset.flickerChars) : undefined

    el.innerHTML = wrapRandomChars(text, count)
  })
}
