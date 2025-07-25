import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const ac = new AbortController();
    const signal = ac.signal;

    try {
      async function fetchData() {
        const data = await fetch(url, signal);
        const response = await data.json();
        setData(response);
        setLoading(false);
      }
      fetchData();
    } catch (error) {
      setError(error);
    }
    return () => {
      ac.abort();
    };
  }, [url]);

  return {
    data: data,
    loading: loading,
    error: error,
  };
};

export default useFetch;
