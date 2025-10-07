import Loader from "../../../components/common/Loader";
import useNewsHeadlines from "../../../hooks/useNewsHeadlines";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import NewsHeadlineList from "../../components/NewsHeadline/NewsHeadlineList";

const NewsHeadline = () => {
    const { headlines, updateHeadline, deleteHeadline, loading } = useNewsHeadlines();

    if (loading) return <Loader />;

    return (
        <>
            <Breadcrumb pageName="News Headlines" />
            <div className="flex flex-col gap-10">
                <NewsHeadlineList
                    allHeadlines={headlines}
                    deleteHeadline={deleteHeadline}
                    updateHeadlineById={updateHeadline}
                />
            </div>
        </>
    );
};

export default NewsHeadline;