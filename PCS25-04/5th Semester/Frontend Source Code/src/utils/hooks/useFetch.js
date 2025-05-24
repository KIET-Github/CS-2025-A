import React, { useCallback, useEffect, useState } from "react";
import apiCall from "./api";

const useFetch = (endpoint, method) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApi = useCallback(
    async (body) => {
      try {
        const result = await apiCall(endpoint, method, body);
        setData(result?.data);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    },
    [endpoint, method]
  );

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return { data, loading, error, refetch: fetchApi };
};

export default useFetch;
