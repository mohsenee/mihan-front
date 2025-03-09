import Link from "next/link";

interface BreadcrumbProps {
  pages: { name: string; path: string; disabled?: boolean }[];
}

const Breadcrumb = ({ pages }: BreadcrumbProps) => {
  console.log(pages);
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium text-blue-500 hover:text-blue-700" href="/home/home">
              داشبورد /
            </Link>
          </li>
          {pages.map((page, index) => (
            <li key={index} className="flex items-center">
              {page.disabled ? (
                <span className="cursor-default">{page.name}</span>
              ) : (
                <Link href={page.path} className="text-blue-500 hover:text-blue-700">
                  {page.name}
                </Link>
              )}
              {index < pages.length - 1 && <span className="mx-2">/</span>}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;