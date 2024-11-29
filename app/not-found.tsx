import Link from 'next/link'
export const runtime = "edge";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h2 className="text-3xl font-bold mb-4">Not Found</h2>
      <p className="mb-6">Could not find requested resource</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return Home
      </Link>
    </div>
  )
}
