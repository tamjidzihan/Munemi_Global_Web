import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <div className="container max-w-[1180px] place-self-center px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <nav>
                <ol className="flex items-center gap-2">
                    <li>
                        <Link className="font-medium text-white text-sm md:text-lg" to="/">
                            HOME /
                        </Link>
                    </li>
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;
                        return (
                            <li key={routeTo} className="flex items-center">
                                {!isLast ? (
                                    <Link className="font-medium text-white text-sm md:text-lg" to={routeTo}>
                                        {name.toUpperCase()} /
                                    </Link>
                                ) : (
                                    <span className="font-medium text-white text-sm md:text-lg">
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
