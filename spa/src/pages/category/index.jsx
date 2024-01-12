import React from "react";
import { useGetCategoriesQuery } from "../../data/services/category";

const Category = () => {
  const { isLoading, data: res } = useGetCategoriesQuery();
  console.log("🚀 ~ Category ~ res:", res);

  if (isLoading) return <div>Loading</div>;

  return (
    <>
      <div>Test</div>
      {res.data.map((cat) => (
        <div>{cat.name}</div>
      ))}
    </>
  );
};

export default Category;
