import useFetch from "../hooks/useFetch";
import Search from "../components/composite/Search";
import { Button } from "../components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination"
import { useState } from "react";
import { formatDate } from "../utils/dateFormatter";

function RepoListPage() {
  const userQuery = 'user:jerry-ebikari';
  const BASE_URL = "https://api.github.com/search/repositories";
  let url = `${BASE_URL}`;
  const [params, setParams] = useState<Record<string, string | number>>({
    q: userQuery,
    page: 1,
    per_page: 10,
    sort: 'created_at',
    order: 'desc'
  })
  const {data, loading, error} = useFetch(url, params, [params]);

  function handleSearch (value: string) {
    setParams((oldParams) => {
      return {...oldParams, q: (value ? `${value}+in:name+` : "") + userQuery}
    })
  }

  function handlePageChange(page: number) {
    console.log(page)
    setParams((oldParams) => {
      return {...oldParams, page}
    })
  }

  function handleRowsChange(rows: number) {
    if (rows != params?.per_page) {
      setParams((oldParams) => {
        return {...oldParams, per_page: rows}
      })
    }
  }

  return (
    <div className="mb-10">
      <Search searchHandler={handleSearch} rowChangeHandler={handleRowsChange}/>
      <table className="w-full table-auto border-separate border-spacing-y-5">
        <thead className="bg-slate-500">
          <tr className="bg-slate-500 text-sm">
            <th className="text-left py-3 px-4 bg-slate-500 text-slate-100 rounded">Repository Name</th>
            <th className="text-left py-3 px-4 bg-slate-500 text-slate-100">Description</th>
            <th className="text-left py-3 px-4 bg-slate-500 text-slate-100">Date Created</th>
            <th className=" bg-slate-500 text-slate-100 rounded"></th>
          </tr>
        </thead>
        <tbody>
          {data?.items?.length && data?.items?.map((repo: any) => (
            <tr key={repo?.name} className="shadow rounded">
              <td className="border-t border-b p-4 border-l rounded">{repo?.name}</td>
              <td className="border-t border-b p-4">{repo?.description}</td>
              <td className="border-t border-b p-4">{repo?.created_at ? formatDate(repo?.created_at) : ""}</td>
              <td className="border-t border-b p-4 border-r rounded flex align-center justify-end">
                <Button variant="secondary">View Details</Button>
              </td>
            </tr>
          ))}
          {!data && loading && <tr>
            <td colSpan={3} className="shadow-md">
              <div className="flex-col gap-3 flex items-center p-4 justify-center">
                <img className="w-28" src="src/assets/empty.png" alt="" />
                <p className="text-3xl text-slate-500">No Repositories</p>
              </div>
            </td>
          </tr>}
        </tbody>
      </table>

      <div className="flex justify-between">
        <div className="border p-4 rounded min-w-fit">
          {data?.total_count || 0} Repos
        </div>
        <Pagination className="flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
            {Array.from({length: Math.ceil((data?.total_count / (params?.per_page as any)) || 1)}, (_, i) => i + 1)?.map(pageNumber => (
              <PaginationItem>
                <div
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={"py-2 px-3 rounded cursor-pointer hover:bg-slate-200" + ((pageNumber == params?.page) ? " border" : "")}>
                  {pageNumber}
                </div>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default RepoListPage