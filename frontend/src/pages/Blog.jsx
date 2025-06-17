"use client"
import { getBlogById } from "../api/Api"
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import parse from "html-react-parser"
import dateFormat from "dateformat"
import {
  IoTimeOutline,
  IoPersonOutline,
  IoEyeOutline,
  IoShareSocialOutline,
  IoHeartOutline,
  IoArrowBackOutline,
} from "react-icons/io5"

const Blog = () => {
  const apiURL = "http://localhost:8000/"
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const response = await getBlogById(id)
        setBlog(response.data)
      } catch (error) {
        console.error("Error fetching blog:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [id])

  const getCategoryGradient = (category) => {
    const gradients = {
      Nature: "from-green-400 to-emerald-600",
      Technology: "from-blue-400 to-indigo-600",
      Politics: "from-red-400 to-rose-600",
      Travel: "from-purple-400 to-violet-600",
    }
    return gradients[category] || "from-gray-400 to-gray-600"
  }

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
    <div className="max-w-4xl mx-auto px-4">
      {blog && (
        <>
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-8 transition-colors duration-300"
          >
            <IoArrowBackOutline />
            <span>Back to Home</span>
          </Link>

          <article className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden transition-colors duration-300">
            {/* Hero Image */}
            <div className="relative h-96 overflow-hidden">
              <img
                src={apiURL + blog.image || "/placeholder.svg"}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Category Badge */}
              <div
                className={`absolute top-6 left-6 px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r ${getCategoryGradient(blog.category)} shadow-lg`}
              >
                {blog.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <IoPersonOutline className="text-indigo-500" />
                  <span>Admin</span>
                </div>
                <div className="flex items-center space-x-2">
                  <IoTimeOutline className="text-indigo-500" />
                  <span>{dateFormat(blog.createdon, "mmmm dS, yyyy")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <IoEyeOutline className="text-indigo-500" />
                  <span>1.2k views</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 mb-8">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    liked
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                  }`}
                >
                  <IoHeartOutline className={liked ? "text-white" : "text-red-500"} />
                  <span>{liked ? "❤️ Liked" : "Like"}</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300">
                  <IoShareSocialOutline className="text-indigo-500" />
                  <span>Share</span>
                </button>
              </div>

              {/* Blog Content */}
              <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none">
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">{parse(blog.post)}</div>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Tags:</span>
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
                    {blog.category}
                  </span>
                  <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-sm">
                    Blog
                  </span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                    Featured
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* Related Posts Section */}
          <div className="mt-16 bg-gradient-to-r from-indigo-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">📚 More from {blog.category}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Related Post 1</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Discover more amazing content...</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Related Post 2</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Explore similar topics...</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Blog