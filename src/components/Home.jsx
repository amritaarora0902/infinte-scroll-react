import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState();
  const [page, setPage] = useState();

  const getData = async () => {
    const res = await fetch(`https://dummyjson.com/products?page=${page}`);
    const data = await res.json();
    console.log(data.products);
    setData(data.products);
  };

  const handleInfiniteEventListener = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteEventListener);
  }, []);

  return (
    <div>
      {data &&
        data.map((post) => {
          return (
            <>
              <span
                id={post.id}
                style={{ padding: "10px", margin: "10px", display: "flex" }}
              >
                {post.title}
              </span>
              <br />
            </>
          );
        })}
    </div>
  );
};

export default Home;
