"use client"

import { useEffect, useState } from "react"
import Blogcard from "../components/Blogcard.jsx"
import { getBlogs } from "../api/Api"
import { useSearchParams } from "react-router-dom"

const Home = () => {
  const [blogs, setBlogs] = useState([])
  const [searchParams] = useSearchParams()
  const category = searchParams.get("category")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        const allBlogs = await getBlogs(category)
        setBlogs(allBlogs.data || [])
      } catch (error) {
        console.error("Error fetching blogs:", error)
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [category])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-teal-400 rounded-full animate-spin animation-delay-150"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 rounded-3xl text-white shadow-2xl">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">
          Welcome to EchoBlog
        </h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          Discover amazing stories, insights, and ideas from our community of writers
        </p>
        <div className="mt-6 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-100"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-200"></div>
        </div>
      </div>

      {/* Category Filter Display */}
      {category && (
        <div className="bg-gradient-to-r from-indigo-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl border border-indigo-100 dark:border-gray-600">
          <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">📂 {category} Posts</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Showing {blogs.length} posts in {category} category
          </p>
        </div>
      )}

      {/* Blog Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {blogs.map((blog, index) =>
          blog && blog.image ? (
            <div
              key={blog.id || index}
              className="transform transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Blogcard blogdata={blog} />
            </div>
          ) : null,
        )}
      </div>

      {/* Empty State */}
      {blogs.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No blogs found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {category ? `No posts in ${category} category yet.` : "No posts available yet."}
          </p>
        </div>
      )}
    </div>
  )
}

export default Home
