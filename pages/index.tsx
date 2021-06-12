import Head from 'next/head'
import Image from 'next/image'
import { Card, Footer } from '../components'

export default function Home() {
  return (
    <>
      <Head>
        <title>Petro Silenius - Frontend Developer</title>
        <meta
          name="description"
          content="🚀 Driving frontend development forward at a B2B SaaS company
        📚 Graduated Master of Technology as a 22-year old"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">
          Petro <a>Silenius</a>
        </h1>

        <p className="description">Get started by editing </p>
        <Image src="/petro.png" width="200" height="200" />

        <div className="grid">
          <Card href="/about">
            <h2>About me&rarr;</h2>
            <p>Learn more about me and what I've been up to in life.</p>
          </Card>
          <Card href="/experience">
            <h2>Experience &rarr;</h2>
            <p>Explore my education and work history.</p>
          </Card>
          <Card href="/examples">
            <h2>Examples &rarr;</h2>
            <p>Discover some of my freetime projects and completed courses.</p>
          </Card>
          <Card href="/card">
            <h2>Business card &rarr;</h2>
            <p>Check out my business card and generate one for yourself!</p>
          </Card>
        </div>
      </main>

      <Footer />
      <style jsx>
        {`
          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
            text-align: center;
          }

          .title a {
            color: var(--link);
          }

          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }

          .description {
            line-height: 1.5;
            font-size: 1.5rem;
            text-align: center;
          }
        `}
      </style>
    </>
  )
}
