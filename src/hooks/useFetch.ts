import { useEffect, useState } from "react";
import { api } from "../api";

export type TFetchProps = {
  url: string;
  params: Record<string, unknown>;
};

export type TData<T extends object> = {
  results: T[];
  hasMore: boolean;
};

export type TFetchResult<T extends object> = {
  data: TData<T> | null;
  error: unknown | null;
  isLoading: boolean;
};

export const useFetch = <T extends object>({
  url,
  params
}: TFetchProps): TFetchResult<T> => {
  const [data, setData] = useState<TData<T> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    setIsLoading(() => true);
    api
      .get<TData<T>>(url, {
        params
      })
      .then((response) => setData(response.data))
      .catch((e) => setError(e))
      .finally(() => setIsLoading(() => false));
  }, [url, params]);

  return {
    data,
    error,
    isLoading
  };
};
