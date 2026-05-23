let windowModule: typeof import('@tauri-apps/api/window') | null = null

// Pre-load the Tauri window module
if (import.meta.client) {
  import('@tauri-apps/api/window').then(mod => {
    windowModule = mod
  }).catch(() => {
    // Not in Tauri environment
  })
}

export function useTauriWindow() {
  const startDragging = () => {
    if (windowModule) {
      windowModule.getCurrentWindow().startDragging()
    }
  }

  const setWindowTitle = async (title: string) => {
    if (!windowModule)
      return

    const window = windowModule.getCurrentWindow()
    await window.setTitle(title)

    // On Windows with Tauri >= 2.3.1, title text may not repaint immediately
    // until window decorations are toggled. Keep this workaround client-side only.
    if (import.meta.client && navigator.userAgent.includes('Windows')) {
      const isDecorated = await window.isDecorated()
      if (isDecorated) {
        await window.setDecorations(false)
        await new Promise(resolve => setTimeout(resolve, 100))
        await window.setDecorations(true)
      }
    }
  }

  return {
    startDragging,
    setWindowTitle,
  }
}
