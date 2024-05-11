import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";


function Search(props: {searchHandler?: any, rowChangeHandler?: any}) {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchInput = (event: any) => {
    setSearchValue(event.target.value)
  }

  function handleRowChange(value: string) {
    props.rowChangeHandler(value);
  }

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      props?.searchHandler && props.searchHandler(searchValue);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [searchValue]);
  
  return (
    <div className="border border-slate-300 border-solid rounded p-3 flex justify-between bg-slate-100">
      <Input className="w-96" placeholder="Search Repos" value={searchValue} onInput={handleSearchInput}/>
      <Select onValueChange={handleRowChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Number of Rows" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default Search