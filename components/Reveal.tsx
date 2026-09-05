import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, JSX, ReactNode } from 'react'
import { Box, type BoxProps } from '@chakra-ui/react'

interface RevealProps extends Omit<BoxProps, 'children'> {
  /** Stagger, in milliseconds, applied once the element comes into view. */
  delay?: number
  children: ReactNode
}

/**
 * Fades and lifts its children into place the first time they scroll into
 * view. The animation itself lives in the theme's global CSS; this only flips
 * the `data-reveal` attribute, so nothing animates on the server render.
 */
export const Reveal = ({
  delay = 0,
  children,
  ...rest
}: RevealProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Older browsers simply get the content, unanimated.
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          setShown(true)
          observer.disconnect()
        }
      },
      // A little bottom inset keeps the reveal from firing on content that is
      // only just clipping the fold.
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Box
      ref={ref}
      data-reveal={shown ? 'shown' : 'hidden'}
      style={{ '--rise-delay': `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Box>
  )
}
