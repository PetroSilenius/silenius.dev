export default function Cv(): null {
  if (typeof window !== 'undefined') {
    document.title = 'Resume of Petro Silenius'
    window.location.href = '/Resume-Petro-Silenius.pdf'
  }

  return null
}
