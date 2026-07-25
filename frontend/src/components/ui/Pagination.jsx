function Pagination({
  currentPage,
  totalPages,
  onPageChange
}) {

  return (

    <div className="
      flex
      items-center
      justify-center
      gap-2
      mt-6
    ">


      {/* Previous */}

      <button

        disabled={currentPage === 1}

        onClick={() => onPageChange(currentPage - 1)}

        className="
          px-3
          py-2
          text-sm
          border
          rounded-lg
          text-gray-600
          disabled:opacity-40
        "

      >

        Prev

      </button>




      {/* Pages */}

      {

        [...Array(totalPages)].map((_, index) => {

          const page = index + 1;


          return (

            <button

              key={page}

              onClick={() => onPageChange(page)}

              className={`
                px-3
                py-2
                text-sm
                border
                rounded-lg

                ${
                  currentPage === page
                  ?
                  "bg-orange-500 text-white border-orange-500"
                  :
                  "text-gray-600"
                }
              `}

            >

              {page}

            </button>

          );

        })

      }





      {/* Next */}

      <button

        disabled={currentPage === totalPages}

        onClick={() => onPageChange(currentPage + 1)}

        className="
          px-3
          py-2
          text-sm
          border
          rounded-lg
          text-gray-600
          disabled:opacity-40
        "

      >

        Next

      </button>



    </div>

  );

}

export default Pagination;