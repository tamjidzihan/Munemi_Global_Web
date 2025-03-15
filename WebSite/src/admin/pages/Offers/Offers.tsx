import Loader from "../../../components/common/Loader"
import useOffers from "../../../hooks/useOffers"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import OffersList from "../../components/Offers/OffersList"


const Offers = () => {
    const { offers, deleteoffers, loading } = useOffers()

    if (loading) return <Loader />

    return (
        <>
            <Breadcrumb pageName="Offers" />
            <div className="flex flex-col gap-10 ">
                <OffersList
                    allOffers={offers}
                    deleteOffer={deleteoffers}
                />
            </div>
        </>
    )
}

export default Offers;