import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import BlogSidebar from "@/components/BlogSidebar";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import Image from "next/image";
import DynamicImage from "@/components/DynamicImage";
import Link from "next/link";
import { getBlogPosts, getSettings, getFooterContent } from "@/lib/data";

export const revalidate = 60;

export default async function BlogPage() {
  const [posts, settings, footerContent] = await Promise.all([
    getBlogPosts(),
    getSettings(),
    getFooterContent(),
  ]);

  return (
    <>
      <Preloader />
      <Header settings={settings} />
      <PageBanner
        title="Blog Post"
        description="We are here to help you when you need your<br>financial support, then we are help you."
      />

      <section className="commonSection blogPage">
        <div className="container">
          <div className="row">
            {/* Posts */}
            <div className="col-lg-9 col-md-8">
              {posts.map((post) => (
                <div key={post._id} className="singleBlog">
                  <div className="blogThumb">
                    <DynamicImage src={post.image || "/images/blog/1.jpg"} alt={post.title} width={800} height={400} />
                  </div>
                  <div className="blogDetail">
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ background: "rgba(44,187,223,0.10)", color: "#2cbbdf", padding: "3px 12px", borderRadius: 12, fontSize: 12, fontWeight: 700 }}>
                        {post.category}
                      </span>
                    </div>
                    <h3>
                      <Link href={`/blog/${post.slug ?? post._id}`}>{post.title}</Link>
                    </h3>
                    <p>{post.excerpt}</p>
                    <div className="author">
                      By : {post.author} <span>({post.date}).</span>
                    </div>
                    <Link className="view_detail" href={`/blog/${post.slug ?? post._id}`}>
                      View Details
                    </Link>
                    <div className="clearfix"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <BlogSidebar />
          </div>
        </div>
      </section>

      <Footer settings={settings} content={footerContent} />
      <Copyright settings={settings} content={footerContent} />
    </>
  );
}
