// Konami Code: ↑↑↓↓←→←→BA
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
let konamiIndex = 0

document.addEventListener('keydown', (e) => {
  if (document.getElementById('c64-overlay')) return

  if (e.key === KONAMI[konamiIndex]) {
    konamiIndex++
    if (konamiIndex === KONAMI.length) {
      konamiIndex = 0
      launchC64()
    }
  } else {
    konamiIndex = 0
  }
})

function launchC64() {
  const overlay = document.createElement('div')
  overlay.id = 'c64-overlay'
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#4040e0;display:flex;align-items:center;justify-content:center;'

  const screen = document.createElement('div')
  screen.style.cssText = 'width:100%;max-width:640px;height:100%;background:#4040e0;color:#a0a0ff;font-family:monospace;font-size:clamp(10px,2vw,14px);line-height:1.4;padding:24px;overflow:hidden;position:relative;white-space:pre;display:flex;align-items:center;'
  screen.id = 'c64-screen'
  overlay.appendChild(screen)
  document.body.appendChild(overlay)

  // Scanline effect
  const scanlines = document.createElement('div')
  scanlines.style.cssText = 'position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.1) 2px,rgba(0,0,0,0.1) 4px);z-index:1;'
  screen.appendChild(scanlines)

  const content = document.createElement('div')
  content.className = 'c64-content'
  content.style.cssText = 'width:100%;'
  screen.appendChild(content)

  bootSequence(screen, content)
}

async function typeText(el: HTMLElement, text: string, speed = 40) {
  for (const char of text) {
    el.textContent += char
    await new Promise(r => setTimeout(r, speed))
  }
}

async function bootSequence(screen: HTMLElement, content: HTMLElement) {
  content.textContent = ''

  await typeText(content, '\n    **** COMMODORE 64 BASIC V2 ****\n\n', 30)
  await typeText(content, ' 64K RAM SYSTEM  38911 BASIC BYTES FREE\n\n', 30)
  await typeText(content, 'READY.\n', 50)
  await new Promise(r => setTimeout(r, 600))
  await typeText(content, 'LOAD "*",8,1\n\n', 60)
  await typeText(content, 'SEARCHING...\n', 40)
  await new Promise(r => setTimeout(r, 400))
  await typeText(content, 'LOADING\n', 40)
  await new Promise(r => setTimeout(r, 600))
  await typeText(content, 'READY.\n', 50)
  await typeText(content, 'RUN\n', 60)
  await new Promise(r => setTimeout(r, 300))

  showMenu(screen)
}

function showMenu(screen: HTMLElement) {
  const content = screen.querySelector('.c64-content') as HTMLElement

  let output = '\n'
  output += '     ========================\n'
  output += '     =   JARNESJO ARCADE    =\n'
  output += '     ========================\n\n'
  output += '     1. SNAKE\n'
  output += '     2. PONG\n'
  output += '     3. TRON\n\n'
  output += '     SELECT GAME (1-3)\n\n'
  output += '     ESC = EXIT'

  content.textContent = output

  function menuHandler(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      document.removeEventListener('keydown', menuHandler)
      document.getElementById('c64-overlay')?.remove()
      return
    }
    if (e.key === '1') {
      document.removeEventListener('keydown', menuHandler)
      startSnake(screen)
    } else if (e.key === '2') {
      document.removeEventListener('keydown', menuHandler)
      startPong(screen)
    } else if (e.key === '3') {
      document.removeEventListener('keydown', menuHandler)
      startTron(screen)
    }
  }

  document.addEventListener('keydown', menuHandler)
}

// ─── SNAKE ──────────────────────────────────────────

function startSnake(screen: HTMLElement) {
  const W = 30
  const H = 15
  let snake = [{x: 15, y: 7}, {x: 14, y: 7}, {x: 13, y: 7}]
  let dir = {x: 1, y: 0}
  let nextDir = {x: 1, y: 0}
  let food = spawnFood()
  let score = 0
  let gameOver = false
  let interval: number
  let highscore = parseInt(localStorage.getItem('c64-snake-hi') || '0')

  function spawnFood(): {x: number; y: number} {
    let pos: {x: number; y: number}
    do {
      pos = {x: Math.floor(Math.random() * W), y: Math.floor(Math.random() * H)}
    } while (snake.some(s => s.x === pos.x && s.y === pos.y))
    return pos
  }

  function draw() {
    const content = screen.querySelector('.c64-content') as HTMLElement
    let output = ' SNAKE!                    SCORE: ' + String(score).padStart(3, '0') + '\n'
    output += ' ' + '-'.repeat(W) + '\n'

    for (let y = 0; y < H; y++) {
      let row = '|'
      for (let x = 0; x < W; x++) {
        if (snake[0].x === x && snake[0].y === y) {
          row += '@'
        } else if (snake.some(s => s.x === x && s.y === y)) {
          row += 'O'
        } else if (food.x === x && food.y === y) {
          row += '*'
        } else {
          row += ' '
        }
      }
      row += '|'
      output += ' ' + row + '\n'
    }

    output += ' ' + '-'.repeat(W) + '\n\n'

    if (gameOver) {
      const best = Math.max(score, highscore)
      if (score > highscore) {
        localStorage.setItem('c64-snake-hi', String(score))
        highscore = score
      }
      output += ' GAME OVER! SCORE: ' + score
      if (score > 0 && score === best && score > parseInt(localStorage.getItem('c64-snake-hi') || '0') - score) output += '  NEW HIGH!'
      output += '\n BEST: ' + best + '\n\n'
      output += ' SPACE=AGAIN  M=MENU  ESC=EXIT'
    } else {
      output += ' HI:' + String(Math.max(score, highscore)).padStart(3, '0')
      output += '  ARROWS=MOVE  ESC=EXIT'
    }

    content.textContent = output
  }

  function tick() {
    dir = nextDir
    const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y}

    if (head.x < 0 || head.x >= W || head.y < 0 || head.y >= H || snake.some(s => s.x === head.x && s.y === head.y)) {
      gameOver = true
      clearInterval(interval)
      draw()
      return
    }

    snake.unshift(head)

    if (head.x === food.x && head.y === food.y) {
      score += 10
      food = spawnFood()
    } else {
      snake.pop()
    }

    draw()
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Escape') { cleanup(); return }

    if (gameOver) {
      if (e.key === ' ') { restart(); return }
      if (e.key === 'm' || e.key === 'M') { clearInterval(interval); document.removeEventListener('keydown', handleKey); showMenu(screen); return }
      return
    }

    switch (e.key) {
      case 'ArrowUp': if (dir.y === 0) nextDir = {x: 0, y: -1}; break
      case 'ArrowDown': if (dir.y === 0) nextDir = {x: 0, y: 1}; break
      case 'ArrowLeft': if (dir.x === 0) nextDir = {x: -1, y: 0}; break
      case 'ArrowRight': if (dir.x === 0) nextDir = {x: 1, y: 0}; break
    }
    e.preventDefault()
  }

  function restart() {
    snake = [{x: 15, y: 7}, {x: 14, y: 7}, {x: 13, y: 7}]
    dir = {x: 1, y: 0}
    nextDir = {x: 1, y: 0}
    food = spawnFood()
    score = 0
    gameOver = false
    interval = window.setInterval(tick, 150)
    draw()
  }

  function cleanup() {
    clearInterval(interval)
    document.removeEventListener('keydown', handleKey)
    document.getElementById('c64-overlay')?.remove()
  }

  document.addEventListener('keydown', handleKey)
  interval = window.setInterval(tick, 150)
  draw()
}

// ─── PONG ──────────────────────────────────────────

function startPong(screen: HTMLElement) {
  const W = 30
  const H = 15
  let paddleY = 6
  const paddleH = 3
  let ballX = 15, ballY = 7
  let ballDx = 1, ballDy = 1
  let score = 0
  let gameOver = false
  let interval: number
  let highscore = parseInt(localStorage.getItem('c64-pong-hi') || '0')

  // AI paddle
  let aiY = 6

  function draw() {
    const content = screen.querySelector('.c64-content') as HTMLElement
    let output = ' PONG!                     SCORE: ' + String(score).padStart(3, '0') + '\n'
    output += ' ' + '-'.repeat(W) + '\n'

    for (let y = 0; y < H; y++) {
      let row = '|'
      for (let x = 0; x < W; x++) {
        const isPlayerPaddle = x === 1 && y >= paddleY && y < paddleY + paddleH
        const isAiPaddle = x === W - 2 && y >= aiY && y < aiY + paddleH
        const isBall = x === Math.round(ballX) && y === Math.round(ballY)

        if (isBall) {
          row += 'O'
        } else if (isPlayerPaddle || isAiPaddle) {
          row += '#'
        } else {
          row += ' '
        }
      }
      row += '|'
      output += ' ' + row + '\n'
    }

    output += ' ' + '-'.repeat(W) + '\n\n'

    if (gameOver) {
      const best = Math.max(score, highscore)
      if (score > highscore) {
        localStorage.setItem('c64-pong-hi', String(score))
        highscore = score
      }
      output += ' GAME OVER! SCORE: ' + score
      output += '\n BEST: ' + best + '\n\n'
      output += ' SPACE=AGAIN  M=MENU  ESC=EXIT'
    } else {
      output += ' HI:' + String(Math.max(score, highscore)).padStart(3, '0')
      output += '  UP/DOWN=MOVE  ESC=EXIT'
    }

    content.textContent = output
  }

  function tick() {
    ballX += ballDx
    ballY += ballDy

    // Top/bottom bounce
    if (ballY <= 0 || ballY >= H - 1) ballDy *= -1

    // Player paddle hit
    if (Math.round(ballX) === 2 && Math.round(ballY) >= paddleY && Math.round(ballY) < paddleY + paddleH) {
      ballDx = Math.abs(ballDx)
      score += 10
    }

    // AI paddle hit
    if (Math.round(ballX) === W - 3 && Math.round(ballY) >= aiY && Math.round(ballY) < aiY + paddleH) {
      ballDx = -Math.abs(ballDx)
    }

    // AI movement (imperfect)
    if (ballDx > 0) {
      if (aiY + paddleH / 2 < ballY && aiY + paddleH < H) aiY++
      else if (aiY + paddleH / 2 > ballY && aiY > 0) aiY--
    }

    // Ball missed by player
    if (ballX <= 0) {
      gameOver = true
      clearInterval(interval)
    }

    // Ball missed by AI - point and reset
    if (ballX >= W - 1) {
      score += 25
      ballX = 15
      ballY = 7
      ballDx = -1
      ballDy = Math.random() > 0.5 ? 1 : -1
    }

    draw()
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Escape') { cleanup(); return }

    if (gameOver) {
      if (e.key === ' ') { restart(); return }
      if (e.key === 'm' || e.key === 'M') { clearInterval(interval); document.removeEventListener('keydown', handleKey); showMenu(screen); return }
      return
    }

    switch (e.key) {
      case 'ArrowUp': if (paddleY > 0) paddleY--; break
      case 'ArrowDown': if (paddleY + paddleH < H) paddleY++; break
    }
    e.preventDefault()
  }

  function restart() {
    paddleY = 6; aiY = 6
    ballX = 15; ballY = 7; ballDx = 1; ballDy = 1
    score = 0; gameOver = false
    interval = window.setInterval(tick, 120)
    draw()
  }

  function cleanup() {
    clearInterval(interval)
    document.removeEventListener('keydown', handleKey)
    document.getElementById('c64-overlay')?.remove()
  }

  document.addEventListener('keydown', handleKey)
  interval = window.setInterval(tick, 120)
  draw()
}

// ─── TRON ──────────────────────────────────────────

function startTron(screen: HTMLElement) {
  const W = 30
  const H = 15
  let player = {x: 5, y: 7, dx: 1, dy: 0}
  let ai = {x: 24, y: 7, dx: -1, dy: 0}
  let playerTrail: {x: number; y: number}[] = [{x: 5, y: 7}]
  let aiTrail: {x: number; y: number}[] = [{x: 24, y: 7}]
  let score = 0
  let gameOver = false
  let won = false
  let interval: number
  let highscore = parseInt(localStorage.getItem('c64-tron-hi') || '0')

  function draw() {
    const content = screen.querySelector('.c64-content') as HTMLElement
    let output = ' TRON!                     SCORE: ' + String(score).padStart(3, '0') + '\n'
    output += ' ' + '-'.repeat(W) + '\n'

    for (let y = 0; y < H; y++) {
      let row = '|'
      for (let x = 0; x < W; x++) {
        if (player.x === x && player.y === y) {
          row += '@'
        } else if (ai.x === x && ai.y === y) {
          row += 'X'
        } else if (playerTrail.some(t => t.x === x && t.y === y)) {
          row += '.'
        } else if (aiTrail.some(t => t.x === x && t.y === y)) {
          row += ':'
        } else {
          row += ' '
        }
      }
      row += '|'
      output += ' ' + row + '\n'
    }

    output += ' ' + '-'.repeat(W) + '\n\n'

    if (gameOver) {
      const best = Math.max(score, highscore)
      if (score > highscore) {
        localStorage.setItem('c64-tron-hi', String(score))
        highscore = score
      }
      output += won ? ' YOU WIN! ' : ' CRASHED! '
      output += 'SCORE: ' + score
      output += '\n BEST: ' + best + '\n\n'
      output += ' SPACE=AGAIN  M=MENU  ESC=EXIT'
    } else {
      output += ' HI:' + String(Math.max(score, highscore)).padStart(3, '0')
      output += '  @=YOU :=ENEMY  ESC=EXIT'
    }

    content.textContent = output
  }

  function collides(x: number, y: number) {
    if (x < 0 || x >= W || y < 0 || y >= H) return true
    if (playerTrail.some(t => t.x === x && t.y === y)) return true
    if (aiTrail.some(t => t.x === x && t.y === y)) return true
    return false
  }

  function tick() {
    // Move player
    const newPx = player.x + player.dx
    const newPy = player.y + player.dy

    // AI: simple avoidance
    let bestDir = {dx: ai.dx, dy: ai.dy}
    const ahead = {x: ai.x + ai.dx, y: ai.y + ai.dy}

    if (collides(ahead.x, ahead.y)) {
      const options = [
        {dx: 0, dy: -1}, {dx: 0, dy: 1},
        {dx: -1, dy: 0}, {dx: 1, dy: 0}
      ].filter(d => !(d.dx === -ai.dx && d.dy === -ai.dy))

      const valid = options.filter(d => !collides(ai.x + d.dx, ai.y + d.dy))
      if (valid.length > 0) {
        bestDir = valid[Math.floor(Math.random() * valid.length)]
      }
    } else {
      // Sometimes turn toward player
      if (Math.random() < 0.1) {
        const options = [
          {dx: 0, dy: -1}, {dx: 0, dy: 1},
          {dx: -1, dy: 0}, {dx: 1, dy: 0}
        ].filter(d => !(d.dx === -ai.dx && d.dy === -ai.dy) && !collides(ai.x + d.dx, ai.y + d.dy))
        if (options.length > 0) bestDir = options[Math.floor(Math.random() * options.length)]
      }
    }

    ai.dx = bestDir.dx
    ai.dy = bestDir.dy
    const newAx = ai.x + ai.dx
    const newAy = ai.y + ai.dy

    const playerDead = collides(newPx, newPy)
    const aiDead = collides(newAx, newAy)

    if (playerDead && aiDead) {
      gameOver = true; won = false; clearInterval(interval); draw(); return
    }
    if (playerDead) {
      gameOver = true; won = false; clearInterval(interval); draw(); return
    }
    if (aiDead) {
      score += 50; won = true; gameOver = true; clearInterval(interval); draw(); return
    }

    playerTrail.push({x: player.x, y: player.y})
    player.x = newPx; player.y = newPy

    aiTrail.push({x: ai.x, y: ai.y})
    ai.x = newAx; ai.y = newAy

    score++
    draw()
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Escape') { cleanup(); return }

    if (gameOver) {
      if (e.key === ' ') { restart(); return }
      if (e.key === 'm' || e.key === 'M') { clearInterval(interval); document.removeEventListener('keydown', handleKey); showMenu(screen); return }
      return
    }

    switch (e.key) {
      case 'ArrowUp': if (player.dy === 0) { player.dx = 0; player.dy = -1 }; break
      case 'ArrowDown': if (player.dy === 0) { player.dx = 0; player.dy = 1 }; break
      case 'ArrowLeft': if (player.dx === 0) { player.dx = -1; player.dy = 0 }; break
      case 'ArrowRight': if (player.dx === 0) { player.dx = 1; player.dy = 0 }; break
    }
    e.preventDefault()
  }

  function restart() {
    player = {x: 5, y: 7, dx: 1, dy: 0}
    ai = {x: 24, y: 7, dx: -1, dy: 0}
    playerTrail = [{x: 5, y: 7}]
    aiTrail = [{x: 24, y: 7}]
    score = 0; gameOver = false; won = false
    interval = window.setInterval(tick, 150)
    draw()
  }

  function cleanup() {
    clearInterval(interval)
    document.removeEventListener('keydown', handleKey)
    document.getElementById('c64-overlay')?.remove()
  }

  document.addEventListener('keydown', handleKey)
  interval = window.setInterval(tick, 150)
  draw()
}
