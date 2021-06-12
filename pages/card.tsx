import { useState } from 'react'
import Head from 'next/head'
import { BusinessCard } from '../components'
import { Stack, Radio, RadioGroup } from '@chakra-ui/react'

const borderColorOptions = [
  'rgb(238, 16, 16), rgb(252, 176, 69)',
  'rgb(255, 78, 205), rgb(26, 117, 255)',
  'rgb(4, 91, 86), rgb(253, 203, 73)',
  'rgb(208, 111, 63) 60%, rgb(245, 228, 211)',
]

export default function Card() {
  const [selectedBorderColor, setSelectedBorderColor] = useState('0')
  return (
    <>
      <Head>
        <title>Business Card - Petro Silenius</title>
        <meta
          name="description"
          content="🚀 Driving frontend development forward at a B2B SaaS company
        📚 Graduated Master of Technology as a 22-year old"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <BusinessCard
          imgSrc="/petro.png"
          name="Petro Silenius"
          title="Frontend Developer"
          borderColors={borderColorOptions[parseInt(selectedBorderColor)]}
        />
        <RadioGroup
          onChange={setSelectedBorderColor}
          value={selectedBorderColor}
          margin={6}
        >
          <Stack direction="row">
            <Radio value="0">Red-yellow</Radio>
            <Radio value="1">Pink-blue</Radio>
            <Radio value="2">Green-yellow</Radio>
            <Radio value="3">Brown-white</Radio>
          </Stack>
        </RadioGroup>
      </main>
    </>
  )
}
