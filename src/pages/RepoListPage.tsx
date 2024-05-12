import useFetch from "../hooks/useFetch";
import Search from "../components/composite/Search";
import { Button } from "../components/ui/button";
import { BallTriangle } from 'react-loader-spinner'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination"
import { useState } from "react";
import { formatDate } from "../utils/dateFormatter";
import { useNavigate } from "react-router-dom";

function RepoListPage() {
  const userQuery = 'user:jerry-ebikari';
  const BASE_URL = "https://api.github.com/search/repositories";
  let url = `${BASE_URL}`;
  const [params, setParams] = useState<Record<string, string | number>>({
    q: userQuery,
    page: 1,
    per_page: 5,
    sort: 'created_at',
    order: 'desc'
  })
  const {data, loading} = useFetch(url, params, [params]);
  const navigate = useNavigate();

  function handleSearch (value: string) {
    setParams((oldParams) => {
      return {...oldParams, q: (value ? `${value} in:name ` : "") + userQuery}
    })
  }

  function handlePageChange(page: number) {
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

  function getCountByPage() {
    return Math.ceil(data?.total_count / (params?.per_page as any))
  }

  return (
    <div className="mb-20">
      <Search searchHandler={handleSearch} rowChangeHandler={handleRowsChange}/>
      <div className="relative mt-2 mb-2">
        {!loading ? <></> : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-slate-50/50">
            <BallTriangle
              height="100"
              width="100"
              color="grey"
              ariaLabel="loading"
              wrapperClass=""
            />
          </div>
        )}
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
              <tr key={repo?.name + repo?.owner?.login} className="shadow rounded">
                <td className="border-t border-b p-4 border-l rounded">{repo?.name}</td>
                <td className="border-t border-b p-4">{repo?.description}</td>
                <td className="border-t border-b p-4">{repo?.created_at ? formatDate(repo?.created_at) : ""}</td>
                <td className="border-t border-b p-4 border-r rounded flex align-center justify-end">
                  <Button variant="secondary" onClick={() => navigate(`/repo/${repo?.name}`)}>View Details</Button>
                </td>
              </tr>
            ))}
            {data ? <></> : (
                <tr key="not-in-list">
                  <td colSpan={4} className="shadow-md">
                    <div className="flex-col gap-3 flex items-center p-4 justify-center">
                      <img className="w-28" src="src/assets/empty.png" alt="empty" />
                      <p className="text-3xl text-slate-500">No Repositories</p>
                    </div>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

      <div className="flex justify-between">
        <div className="border p-3 rounded min-w-fit bg-slate-200 shadow-md">
          {data?.total_count || 0} Repos
        </div>
        <Pagination className="flex justify-end">
          <PaginationContent>
            <PaginationItem
              className="cursor-pointer"
              onClick={() => ((params?.page as any) > 1) ? handlePageChange((params.page as any) - 1) : 0}>
              <PaginationPrevious />
            </PaginationItem>
            {
              !(data?.total_count && params?.page) ? (
                <PaginationItem>
                  <div
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className={"py-2 px-3 rounded cursor-pointer hover:bg-slate-200 border"}>
                    1
                  </div>
                </PaginationItem>
              ) : (
                Array.from({length: (getCountByPage() - (5 * Math.floor((params.page as number - 1)/5))) > 5 ? 5 : (getCountByPage() - (5 * Math.floor((params.page as number - 1)/5)))}, (_, index) => index + 1 + 5 * Math.floor((params.page as number - 1)/5))?.map(pageNumber => (
                  <PaginationItem>
                    <div
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={"py-2 px-3 rounded cursor-pointer hover:bg-slate-200" + ((pageNumber == params?.page) ? " border" : "")}>
                      {pageNumber}
                    </div>
                  </PaginationItem>
                ))
              )
            }
            <PaginationItem
              className="cursor-pointer"
              onClick={() => ((params?.page as any) < Math.ceil((data?.total_count / (params?.per_page as any)) || 1)) ? handlePageChange((params.page as any) + 1) : 0}>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default RepoListPage