import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  pageName: string;
  parentPath?: string; // Optional parent breadcrumb
  parentLabel?: string; // Optional parent breadcrumb label
}

const Breadcrumb = ({ pageName, parentPath, parentLabel }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Page Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{pageName}</h1>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-gray-600">
          {/* Dashboard */}
          <li>
            <Link
              to="/adminpanel"
              className="flex items-center gap-1 hover:text-blue-600 transition"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
          </li>

          {/* Optional Parent */}
          {parentPath && parentLabel && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li>
                <Link
                  to={parentPath}
                  className="hover:text-blue-600 transition font-medium"
                >
                  {parentLabel}
                </Link>
              </li>
            </>
          )}

          {/* Current Page */}
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <li className="font-semibold text-blue-600">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
