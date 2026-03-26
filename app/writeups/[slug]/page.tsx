import { notFound } from 'next/navigation'
import { writeups } from '@/lib/writeups'
import WriteupPage from '@/components/WriteupPage'

export async function generateStaticParams() {
  return writeups.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const writeup = writeups.find((w) => w.slug === slug)
  if (!writeup) return {}
  return { title: `${writeup.title} — Jasmine Simmonds`, description: writeup.summary }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const writeup = writeups.find((w) => w.slug === slug)
  if (!writeup) notFound()
  return <WriteupPage writeup={writeup!} />
}
