import Head from 'next/head'
import { BusinessCard } from '../components'

const borderColorOptions = [
  'rgb(238,16,16), rgb(252,176,69)',
  'rgb(255,78,205), rgb(26,117,255)',
  'rgb(4,91,86), rgb(253,203,73)',
  'rgb(208,111,63) 60%, rgb(245, 228, 211)',
]

export default function Card(): JSX.Element {
  return (
    <>
      <Head>
        <title>Business Card - Petro Silenius</title>
        <meta name="description" content="Contact information and resume" />
      </Head>

      <BusinessCard
        imgSrc="/petro.png"
        name="Petro Silenius"
        title="Frontend Developer"
        borderColors={borderColorOptions[1]}
        github="petrosilenius"
        linkedin="petrosilenius"
        email="petro.silenius@gmail.com"
      />
    </>
  )
}
