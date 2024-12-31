import Title from "@/components/utility/Title";
import BlogCard from "@/components/homePage/Blogs/BlogCard";
import { getAllBlogs } from "@/data/BlogsData";

export default function BlogsPage() {
  const blogs = getAllBlogs();
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Title>Latest Blog Posts</Title>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
        {blogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
}