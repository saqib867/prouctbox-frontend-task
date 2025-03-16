import React from "react";
import { BiSearch } from "react-icons/bi";
import useFetchProduct from "../../hooks/useFetchProduct";

const SearchItems = ({onSearch}) => {

  return (
    <div className="w-72 flex items-center justify-between h-10 border-2 border-gray-200 my-5">
      <input
        onChange={onSearch}
        className="border-0 w-[98%] h-[98%]  outline-0  rounded-sm "
      />
      <div className="bg-blue-700 h-full px-2 flex items-center justify-center">
        <BiSearch color="white" />
      </div>
    </div>
  );
};

export default SearchItems;
