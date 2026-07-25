function Table({ children, bordered = true }) {

  return (

    <div
      className={`
        overflow-x-auto
        ${
          bordered
            ? "rounded-xl border border-gray-200 bg-white"
            : ""
        }
      `}
    >

      <table
        className="
          min-w-full
          divide-y
          divide-gray-200
        "
      >

        {children}

      </table>

    </div>

  );

}

export default Table;