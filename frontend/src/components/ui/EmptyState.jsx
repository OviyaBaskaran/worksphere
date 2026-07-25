function EmptyState({
  title = "No Data Found",
  description = "There is nothing to display.",
}) {

  return (

    <div className="flex flex-col items-center justify-center py-16">

      <div
        className="
          h-20
          w-20
          rounded-full
          bg-orange-100
          flex
          items-center
          justify-center
          text-3xl
        "
      >
        
      </div>

      <h2 className="mt-6 text-xl font-semibold text-gray-700">
        {title}
      </h2>

      <p className="mt-2 text-sm text-gray-500 text-center">
        {description}
      </p>

    </div>

  );

}

export default EmptyState;