import { Input } from "native-base";
import React from "react";

const Search = ({ value, onChange }) => {
  return <Input size="sm" placeholder="tìm sản phẩm ở đây" color={"black"} value={value} onChange={onChange} />;
};

export default Search;
