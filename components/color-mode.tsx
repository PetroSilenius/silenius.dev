import type { JSX } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

export type ColorModeProviderProps = ThemeProviderProps

export function ColorModeProvider(props: ColorModeProviderProps): JSX.Element {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      {...props}
    />
  )
}

export type ColorMode = 'light' | 'dark'

interface UseColorModeReturn {
  colorMode: ColorMode
  toggleColorMode: () => void
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme } = useTheme()
  const colorMode = (resolvedTheme as ColorMode) ?? 'dark'
  const toggleColorMode = () => {
    setTheme(colorMode === 'dark' ? 'light' : 'dark')
  }
  return { colorMode, toggleColorMode }
}

export function useColorModeValue<T>(light: T, dark: T): T {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}
