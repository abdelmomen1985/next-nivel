import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>

<div className="flex flex-col w-full">
	<div className="p-1  mt-2 text-center space-x-1 space-y-2">
		<button className="bg-gray-50 px-5 py-3 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">Gray50</button>
	</div>
    </div>


    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
)

export default IndexPage
