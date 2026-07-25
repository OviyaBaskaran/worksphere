import { HiOutlineSearch } from "react-icons/hi";

function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}) {

  return (

    <div className="relative w-full">

      <HiOutlineSearch
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-xl
          text-gray-400
        "
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-gray-200
          bg-gray-50
          py-2.5
          pl-12
          pr-4
          outline-none
          transition-all
          duration-200
          focus:border-orange-500
          focus:bg-white
          focus:ring-4
          focus:ring-orange-100
        "
      />

    </div>

  );

}

export default SearchInput;