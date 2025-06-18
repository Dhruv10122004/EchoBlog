import { Link } from "react-router-dom";
import { IoApps, IoTimeOutline, IoEyeOutline } from "react-icons/io5";

const Blogcard = ({ blogdata }) => {
  const apiURL = "https://echoblog-seep.onrender.com";

  if (!blogdata) {
    console.warn("Missing blogdata");
    return null;
  }

  const imageUrl = blogdata.image?.startsWith("http")
    ? blogdata.image
    : blogdata.image
    ? new URL(blogdata.image, apiURL).toString()
    : "https://placehold.co/400x250?text=Image+Not+Found";

  const getCategoryColor = (category) => {
    const colors = {
      Nature: "bg-green-500",
      Technology: "bg-blue-500",
      Politics: "bg-red-500",
      Travel: "bg-purple-500",
    };
    return colors[category] || "bg-gray-500";
  };

  const getCategoryGradient = (category) => {
    const gradients = {
      Nature: "from-green-400 to-emerald-600",
      Technology: "from-blue-400 to-indigo-600",
      Politics: "from-red-400 to-rose-600",
      Travel: "from-purple-400 to-violet-600",
    };
    return gradients[category] || "from-gray-400 to-gray-600";
  };

  return (
    <div className="group bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl overflow-hidden rounded-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
      <Link to={`/blog/${blogdata.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            src={imageUrl}
            alt={blogdata.title || "Blog Image"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/400x250?text=Image+Not+Found";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-semibold bg-gradient-to-r ${getCategoryGradient(
              blogdata.category
            )} shadow-lg`}
          >
            {blogdata.category}
          </div>
          <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
            <IoTimeOutline />
            <span>5 min</span>
          </div>
        </div>

        <div className="p-6">
          <h5 className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
            {blogdata.title}
          </h5>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <IoApps className="text-indigo-500" />
              <span className="text-sm font-medium">{blogdata.category}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <IoEyeOutline />
              <span>234</span>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">
              Read More →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Blogcard;
