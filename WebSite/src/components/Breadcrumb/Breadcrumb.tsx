import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                {pathnames.length > 0 ? pathnames[pathnames.length - 1] : "Home"}
            </h2>

            <nav>
                <ol className="flex items-center gap-2">
                    <li>
                        <Link className="font-medium hover:text-red-600" to="/">
                            Home /
                        </Link>
                    </li>
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;
                        return (
                            <li key={routeTo} className="flex items-center">
                                {!isLast ? (
                                    <Link className="font-medium hover:text-red-600" to={routeTo}>
                                        {name.toUpperCase()} /
                                    </Link>
                                ) : (
                                    <span className="font-medium text-primary">
                                        {name.toUpperCase()}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;
