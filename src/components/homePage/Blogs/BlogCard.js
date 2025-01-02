import Link from 'next/link';

const BlogCard = ({ blog }) => {
  const isExternalLink = blog.link.startsWith('https');
  
  return (
    <div className="group">
      <span className="text-trinary text-xs">{blog.date}</span>
      <Link
        href={blog.link}
        target={isExternalLink ? "_blank" : "_self"}
        prefetch={!isExternalLink}
        className="text-secondary font-bold text-xl group-hover:text-primary cursor-pointer block mt-2"
      >
        {blog.title}
      </Link>
      <p className="text-trinary font-medium mt-2 pr-6">
        {blog.description}
      </p>
    </div>
  );
}

export default BlogCard;