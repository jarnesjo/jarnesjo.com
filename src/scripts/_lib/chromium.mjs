import core from 'puppeteer-core'
let _page

const exePath =
  process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
    ? '/usr/bin/google-chrome'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

async function getOptions() {
  return {
    args: [],
    executablePath: exePath,
    headless: true
  }
}
async function getPage() {
  if (_page) {
    return _page
  }

  const options = await getOptions()
  const browser = await core.launch(options)
  _page = await browser.newPage()

  return _page
}

export async function getScreenshot(html) {
  const page = await getPage()
  await page.setViewport({width: 1200, height: 630})
  await page.setContent(html)
  const file = await page.screenshot({type: 'png'})

  return file
}
