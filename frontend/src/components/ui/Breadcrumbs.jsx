function Breadcrumbs({ items = [] }) {
  return (
    <div className="flex items-center gap-2 text-sm">

      {items.map((item, index) => (

        <div
          key={index}
          className="flex items-center gap-2"
        >

          <span
            className={
              index === items.length - 1
                ? "text-gray-800 font-medium"
                : "text-gray-500"
            }
          >
            {item}
          </span>


          {index !== items.length - 1 && (
            <span className="text-gray-400">
              /
            </span>
          )}

        </div>

      ))}

    </div>
  );
}

export default Breadcrumbs;