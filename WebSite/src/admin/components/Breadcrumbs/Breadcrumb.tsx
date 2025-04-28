import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-title-md2 font-semibold text-midnight ">
        {pageName}
      </div>
      <nav>
        <div className="flex items-center gap-2">
          <div>
            <Link className="font-medium" to="/adminpanel">
              Dashboard /
            </Link>
          </div>
          <div className="font-medium text-primary">{pageName}</div>
        </div>
      </nav>
    </div>
  );
};

export default Breadcrumb;
