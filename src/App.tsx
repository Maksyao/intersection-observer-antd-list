import "./styles.css";
import { List, Row, Spin } from "antd";
import { useState, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { useFetch } from "./hooks/useFetch";
import Card from "antd/es/card/Card";

type TData = {
  id: string;
  name: string;
};

export default function App() {
  const [dataSource, setDataSource] = useState<TData[]>([]);
  const [page, setPage] = useState<number>(1);

  const { ref, inView } = useInView({
    threshold: 0.1
  });

  const props = useMemo(
    () => ({
      url: "/users",
      params: {
        page
      }
    }),
    [page]
  );

  const { data, isLoading, error } = useFetch<TData>(props);

  useEffect(() => {
    if (data) {
      setDataSource((prev) => [...prev, ...data.results]);
    }
  }, [data]);

  useEffect(() => {
    if (data?.hasMore && inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  return (
    <List
      dataSource={dataSource}
      renderItem={(item) => {
        return <Card key={item.id}>{item.name}</Card>;
      }}
      footer={isLoading ? <Spin /> : <Row ref={ref}>123</Row>}
    />
  );
}
