import Link from "next/link";

export default function BlogSidebar() {
  return (
    <div className="col-lg-3 col-md-4 noPaddingLeft sidebar">
      {/* Search */}
      <aside className="widget widget_search">
        <form role="search" method="get" action="#">
          <input type="search" placeholder="Search here" name="s" />
          <button type="submit">
            <i className="flaticon-magnifying-glass"></i>
          </button>
        </form>
      </aside>

      {/* Recent Posts */}
      <aside className="widget recent_posts">
        <h3 className="widget_title">Recent News</h3>
        {[1, 2, 3].map((i) => (
          <div key={i} className="Smart Loans_post_widget">
            <h4>
              <Link href="#">Provide best financial solution.</Link>
            </h4>
            <p>
              We all know how hard it can be make a site look like the demo
              world of as easy as possible.
            </p>
            <div className="author">
              Habibur Rahman <span>(05 Jan 2019).</span>
            </div>
          </div>
        ))}
      </aside>

      {/* Archive */}
      <aside className="widget archive_posts">
        <h3 className="widget_title">Archive Post</h3>
        {[1, 2].map((i) => (
          <div key={i} className="Smart Loans_post_widget">
            <h4>
              <Link href="#">Provide best financial solution.</Link>
            </h4>
            <p>
              We all know how hard it can be make a site look like the demo
              world of as easy as possible.
            </p>
            <div className="author">
              Habibur Rahman <span>(05 Jan 2019).</span>
            </div>
          </div>
        ))}
      </aside>

      {/* Tags */}
      <aside className="widget widget_tag_cloud">
        <h3 className="widget_title">Popular Tags</h3>
        <div className="tagcloud">
          {[
            "Business",
            "Agency",
            "Corporate",
            "Marketing",
            "Minimal",
            "Medical",
            "SEO",
            "WooCommerce",
            "Digital Agency",
          ].map((tag) => (
            <span key={tag}>
              <Link href="#">{tag}</Link>
              {", "}
            </span>
          ))}
        </div>
      </aside>
    </div>
  );
}
