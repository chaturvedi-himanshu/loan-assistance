import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import BlogSidebar from "@/components/BlogSidebar";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import Image from "next/image";
import DynamicImage from "@/components/DynamicImage";
import Link from "next/link";
import { getBlogPost, getBlogPosts, getSettings, getFooterContent } from "@/lib/data";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ id: p.slug ?? String(p._id) }));
}

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post, related, settings, footerContent] = await Promise.all([
    getBlogPost(id),
    getBlogPosts(),
    getSettings(),
    getFooterContent(),
  ]);

  if (!post) notFound();

  const relatedPosts = related.filter((p) => p.slug !== id && p._id !== id).slice(0, 4);

  return (
    <>
      <Preloader />
      <Header settings={settings} />
      <PageBanner
        title="Blog Details"
        description="We are here to help you when you need your<br>financial support, then we are help you."
      />

      <section className="commonSection singlblogPage">
        <div className="container">
          <div className="row">
            {/* Blog content */}
            <div className="col-lg-9 col-md-8">
              <div className="singleBlogDetails">
                <div className="blogThumb">
                  <DynamicImage src={post.image || "/images/blog/1.jpg"} alt={post.title} width={800} height={400} />
                </div>
                <div className="blogDetail">
                  <div style={{ marginBottom: 10 }}>
                    <span style={{ background: "rgba(44,187,223,0.10)", color: "#2cbbdf", padding: "3px 12px", borderRadius: 12, fontSize: 12, fontWeight: 700 }}>
                      {post.category}
                    </span>
                  </div>
                  <h3>{post.title}</h3>
                  <div className="author">
                    By : {post.author} <span>({post.date}).</span>
                  </div>

                  {post.content ? (
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  ) : (
                    <p>{post.excerpt}</p>
                  )}
                </div>

                {/* Social share */}
                <div className="blog_social">
                  <Link className="fac" href="#">Facebook</Link>
                  <Link className="goo" href="#">Twitter</Link>
                  <Link className="sky" href="#">LinkedIn</Link>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="related_post">
                    <h3>Related Post:</h3>
                    <div className="row">
                      {relatedPosts.map((rp) => (
                        <div key={rp._id} className="col-md-6">
                          <div className="SRPost">
                            <DynamicImage src={rp.image || "/images/blog/1.jpg"} alt={rp.title} width={350} height={220} />
                            <h4><Link href={`/blog/${rp.slug ?? rp._id}`}>{rp.title}</Link></h4>
                            <p>{rp.excerpt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comment Form */}
                <div className="commentFrom">
                  <h3>Leave a comment:</h3>
                  <form action="#" method="post" className="row">
                    <div className="col-md-6">
                      <input required type="text" name="name" placeholder="Name here" />
                    </div>
                    <div className="col-md-6">
                      <input required type="email" name="email" placeholder="Email here" />
                    </div>
                    <div className="col-md-12">
                      <textarea required name="comment" placeholder="Comment here...."></textarea>
                    </div>
                    <div className="col-md-12">
                      <button name="submit" type="submit" className="common_btn">Submit Now</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <BlogSidebar />
          </div>
        </div>
      </section>

      <Footer settings={settings} content={footerContent} />
      <Copyright settings={settings} content={footerContent} />
    </>
  );
}
