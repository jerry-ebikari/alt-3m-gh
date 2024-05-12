import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import leftArrow from "../../src/assets/left-arrow.svg";
import { Button } from "../components/ui/button";
import { formatDate } from "../utils/dateFormatter";
import { Input } from "../components/ui/input";
import { BallTriangle } from "react-loader-spinner";
import { useEffect, useState } from "react";

function RepoPage() {
  const params = useParams<{repo: string}>();
  let url = `https://api.github.com/repos/jerry-ebikari/${params.repo}`;
  const {data, loading} = useFetch(url, undefined, undefined);
  const [allToDisplay, setAllToDisplay] = useState<Record<string, any>>({});
  const [filteredProps, setFilteredProps] = useState<Record<string, any>>({});
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      Object.keys(data).map((key: string) => {
        const keyValue = data[key];
        key = key.replace(/[W_]/g, " ");
        if (typeof keyValue != "object") {
          setAllToDisplay((previous) => {
            return {...previous, [key]: keyValue}
          })
          setFilteredProps((previous) => {
            return {...previous, [key]: keyValue}
          })
        }
      })
    }
  }, [data])

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      const filtered = Object.keys(allToDisplay).filter(key => key.includes(searchValue));
      let temp = {};
      filtered.forEach(key => {
        temp = {...temp, [key]: allToDisplay[key]}
      })
      setFilteredProps(temp)
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [searchValue, allToDisplay])

  function handleSearchInput(event: any) {
    setSearchValue(event?.target?.value);
  }

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center pb-2 border-slate-300">
        <div className="flex gap-3 items-center cursor-pointer w-fit" onClick={() => navigate("/")}>
          <img src={leftArrow} alt="back" />
          <p className="text-xl uppercase text-slate-700">{data && params.repo}</p>
        </div>
        <Button className="bg-slate-600" onClick={() => window.open(data?.html_url)}>View on GitHub</Button>
      </div>

      <div className="flex gap-8 mt-7 items-start">
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
        <div className="p-4 shadow-sm border flex flex-col gap-10 bg-slate-100 rounded w-1/4">
          <div>
            <p className="text-sm font-semibold">Author</p>
            <p className="text-slate-700">{data?.owner?.login}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Repository Name</p>
            <p className="text-slate-700">{data?.name}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Date Created</p>
            <p className="text-slate-700">{data?.created_at ? formatDate(data?.created_at) : ""}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Date Modified</p>
            <p className="text-slate-700">{data?.updated_at ? formatDate(data?.updated_at) : ""}</p>
          </div>
        </div>
        <div className="bg-slate-300 w-px self-stretch"></div>
        <div className="w-full">
          <div className="border-b-2 pb-2 border-slate-400 w-full flex justify-between">
            <p className="text-xl">Repository Details</p>
            <Input className="w-56" value={searchValue} onInput={handleSearchInput} placeholder="Search Property Name"/>
          </div>
          {Object.keys(filteredProps).length === 0 ? <></> : Object.keys(filteredProps).map((key: string) => {
            return (
              <div className="flex items-center gap-10 py-3 border-b-2">
                <p className="w-1/5">{key}</p>
                <p>{typeof filteredProps[key] == "boolean" ? (filteredProps[key] ? "true" : "false") : filteredProps[key]}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RepoPage