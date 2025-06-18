"use client"

import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { uploadFile, createBlog } from "../api/Api"
import { IoCloudUploadOutline, IoCreateOutline, IoImageOutline } from "react-icons/io5"

const Createblog = () => {
  const blankBlog = {
    title: "",
    image: "",
    post: "<p><br></p>",
    category: "",
  }

  const [newBlog, setNewBlog] = useState(blankBlog)
  const [formKey, setFormKey] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      console.log("Uploading file:", file)

      // Upload to server first
      const uploadedFile = await uploadFile(file)
      console.log("uploadFile response:", uploadedFile)

      if (!uploadedFile || !uploadedFile.path) {
        alert("Upload failed or invalid response.")
        setUploading(false)
        return
      }

      // Update state with actual path
      setNewBlog((prev) => ({
        ...prev,
        image: uploadedFile.path
      }))
      console.log("Set image path:", uploadedFile.path)

      // Now read preview (purely for display)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        console.log("Preview set.")
      }
      reader.readAsDataURL(file)
    } catch (err) {
      console.error("Upload failed:", err)
      alert("Image upload failed.")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log("Submitting blog:", newBlog)

    if (!newBlog.title || !newBlog.category || !newBlog.image) {
      alert("Please fill in all required fields including uploaded image.")
      return
    }

    setCreating(true)
    try {
      const createdBlog = await createBlog(newBlog)
      if (createdBlog) {
        alert("Blog created successfully!")
        setNewBlog(blankBlog)
        setImagePreview(null)
        setFormKey((prev) => prev + 1)
      } else {
        alert("Blog creation failed.")
      }
    } catch (err) {
      console.error("Error while creating blog:", err)
      alert("Something went wrong.")
    } finally {
      setCreating(false)
    }
  }


  const menu = [
    { text: "Nature", icon: "🌿", color: "from-green-400 to-emerald-600" },
    { text: "Technology", icon: "💻", color: "from-blue-400 to-indigo-600" },
    { text: "Politics", icon: "🏛️", color: "from-red-400 to-rose-600" },
    { text: "Travel", icon: "✈️", color: "from-purple-400 to-violet-600" },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full mb-4">
          <IoCreateOutline className="text-white text-2xl" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-2">
          Create New Blog Post
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Share your thoughts and ideas with the world</p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden transition-colors duration-300">
        <div className="w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 rounded-t-3xl" />
        <form key={formKey} onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-gray-700 dark:text-gray-300 font-semibold text-lg flex items-center space-x-2">
              <span>📝</span><span>Blog Title</span>
            </label>
            <input
              type="text"
              className="w-full h-14 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 text-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-800 focus:border-indigo-500 transition-all duration-300"
              value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              placeholder="Enter blog title..."
            />
          </div>

          {/* Category */}
          <div className="space-y-4">
            <label className="text-gray-700 dark:text-gray-300 font-semibold text-lg flex items-center space-x-2">
              <span>📂</span><span>Category</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {menu.map((category) => (
                <button
                  key={category.text}
                  type="button"
                  onClick={() => setNewBlog({ ...newBlog, category: category.text })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${newBlog.category === category.text
                    ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg transform scale-105`
                    : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-500"
                    }`}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="font-semibold">{category.text}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <label className="text-gray-700 dark:text-gray-300 font-semibold text-lg flex items-center space-x-2">
              <IoImageOutline />
              <span>Featured Image</span>
            </label>

            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
                id="image-upload"
                disabled={uploading}
              />
              <label
                htmlFor="image-upload"
                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${uploading
                  ? "border-indigo-300 bg-indigo-50 dark:bg-indigo-900/20"
                  : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                  }`}
              >
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-semibold">Click to change image</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    {uploading ? (
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    ) : (
                      <IoCloudUploadOutline className="text-4xl text-gray-400 mb-4 mx-auto" />
                    )}
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      {uploading ? "Uploading..." : "Click to upload featured image"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Blog Content */}
          <div className="space-y-4">
            <label className="text-gray-700 dark:text-gray-300 font-semibold text-lg flex items-center space-x-2">
              <span>✍️</span><span>Blog Content</span>
            </label>
            <div className="border-2 border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden bg-white dark:bg-gray-700 min-h-[300px]">
              <ReactQuill
                theme="snow"
                value={newBlog.post}
                onChange={(content) => setNewBlog({ ...newBlog, post: content })}
                placeholder="Start writing your blog..."
                style={{ height: "300px" }}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["blockquote", "code-block"],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              disabled={creating || uploading}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${creating || uploading
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1"
                }`}
            >
              {creating ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Publishing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>🚀</span>
                  <span>Publish Blog Post</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Createblog
