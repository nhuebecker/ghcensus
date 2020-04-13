import Head from 'next/head'
import Link from 'next/link'

export default ({title, children}) => (
  <div>
    <Head>
      <title>{ title }</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="font-sans text-md">
      <div className="max-w-screen-lg px-3 mx-auto">
        {children}
      </div>
    </main>
  </div>
)