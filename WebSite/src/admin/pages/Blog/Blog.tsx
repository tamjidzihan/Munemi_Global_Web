import Loader from "../../../components/common/Loader"
import useBlogPosts from "../../../hooks/useBlogPosts"
import BlogList from "../../components/Blog/BlogList"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"


const Blog = () => {
    const { blogPosts, updateBlogPost, deleteBlogPost, loading } = useBlogPosts()
    if (loading) return <Loader />
    return (
        <>
            <Breadcrumb pageName="Blog" />
            <div className="flex flex-col gap-10 ">
                <BlogList
                    allBlogs={blogPosts}
                    deleteBlog={deleteBlogPost}
                    updateBlogById={updateBlogPost}
                />
            </div>
        </>
    )
}

export default Blog