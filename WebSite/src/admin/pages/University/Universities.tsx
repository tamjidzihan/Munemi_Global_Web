import Loader from "../../../components/common/Loader";
import useUniversity from "../../../hooks/useUniversity";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import UniversitiesList from "../../components/University/UniversitiesList";

const Universities = () => {
    const { universities, deleteUniversity, loading } = useUniversity();

    if (loading) return <Loader />;

    return (
        <>
            <Breadcrumb pageName="Universities Management" />
            <div className="flex flex-col gap-10">
                <UniversitiesList
                    allUniversities={universities}
                    deleteUniversity={deleteUniversity}
                />
            </div>
        </>
    );
};

export default Universities;