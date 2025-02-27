import { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb"
import Loader from "../common/Loader";

const Enrollment = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay (e.g., fetching data)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 900); // Change time as needed

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <main className="w-full">
            <div className=" container">
                <Breadcrumb />
                <p>asdasd asd asd asd </p>
            </div>
        </main>
    )
}

export default Enrollment