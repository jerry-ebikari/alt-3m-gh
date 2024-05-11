import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

function RepoPage() {
  const params = useParams<{repo: string}>();
  let url = `https://api.github.com/repos/jerry-ebikari/${params.repo}`;
  const {data, loading, error} = useFetch(url);
  return (
    <div>{data && params.repo}</div>
  )
}

export default RepoPage