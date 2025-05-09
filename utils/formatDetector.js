// detecta json, código ou linguagem natural (auto)
export function detectFormat(input, mode = 'auto') {
    const txt = input.trim()
    if (mode === 'json' || mode === 'code' || mode === 'natural') {
      return mode
    }
    // auto
    try {
      JSON.parse(txt)
      return 'json'
    } catch {}
    if (/function|=>|<\w+/.test(txt)) return 'code'
    return 'natural'
  }
  