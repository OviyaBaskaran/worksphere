function Badge({ status }) {

  const isActive = status === "Active";


  return (

    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1
        rounded-full
        text-xs
        font-medium

        ${
          isActive
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600"
        }
      `}
    >

      {status}

    </span>

  );

}


export default Badge;