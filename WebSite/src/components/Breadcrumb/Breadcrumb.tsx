import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <div className="container max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-2 sm:gap-3">
            <nav className="w-full">
                <ol className="flex flex-wrap items-center gap-2 text-sm sm:text-base md:text-lg">
                    <li>
                        <Link className="font-medium text-white transition-colors hover:text-red-300" to="/">
                            HOME /
                        </Link>
                    </li>
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;
                        return (
                            <li key={routeTo} className="flex items-center">
                                {!isLast ? (
                                    <Link className="font-medium text-white transition-colors hover:text-red-200" to={routeTo}>
                                        {name.toUpperCase()} /
                                    </Link>
                                ) : (
                                    <span className="font-medium text-gray-300">{name.toUpperCase()}</span>
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
