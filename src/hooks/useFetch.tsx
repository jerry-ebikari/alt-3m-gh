import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url: string, params?: Record<string, string | number>, changeTriggers?: any[], reqHeaders?: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [headers, setHeaders] = useState<any>(null);

  useEffect(() => {
      setLoading(true)
      // setData(null);
      setError(null);
      const source = axios.CancelToken.source();
      axios.get(url, {
        cancelToken: source.token,
        params,
        headers: reqHeaders
      })
      .then((res: any) => {
          setLoading(false);
          setHeaders(res?.headers)
          res.data && setData(res.data);
          res.data.content && setData(res.data.content);
          res.content && setData(res.content);
      })
      .catch(err => {
          setLoading(false);
          setError(err);
      })
      return () => {
          source.cancel();
      }
  }, [url, ...(changeTriggers || [])])

  return { data, loading, error, headers }

}

export default useFetch;