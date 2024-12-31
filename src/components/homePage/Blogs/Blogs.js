import Title from "@/components/utility/Title";
import Wrapper from "@/components/utility/Wrapper";
import BlogCard from "./BlogCard";
import { getFeaturedBlogs } from "@/data/BlogsData";
import Link from "next/link";

export default function Blogs() {
  const featuredBlogs = getFeaturedBlogs();

  return (
    <Wrapper>
      <div className="w-full py-12">
        <div className="flex justify-between items-center mb-12">
          <Title>Featured Blog Posts</Title>
          <Link 
            href="/blogs" 
            className="text-primary hover:text-primary/80 font-medium"
          >
            View All Posts →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredBlogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
}