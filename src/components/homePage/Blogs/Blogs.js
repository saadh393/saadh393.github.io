import Title from "@/components/utility/Title";
import Wrapper from "@/components/utility/Wrapper";
import getBlogs from "@/data/Blogs";
import Link from "next/link";
import React from "react";

export default function Blogs() {
  const blogs = getBlogs();
  return (
    <Wrapper>
      <Title>My Blogs</Title>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 my-12">
        {blogs.map((blog) => (
          <div key={blog.title}>
            <span className="text-trinary text-xs">{blog.date}</span>
            <Link
              href={blog.link.startsWith("https") ? blog.link :  `/blogs/${blog.link}`}
              className="text-secondary font-bold text-xl hover:text-primary cursor-pointer block"
            >
              {blog.title}
            </Link>
            <p className="text-trinary font-medium mt-2 pr-6">{blog.description}</p>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
