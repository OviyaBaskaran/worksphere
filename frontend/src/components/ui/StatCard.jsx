function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = "orange",
}) {

  const colorStyles = {
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-500",
    },

    green: {
      bg: "bg-green-100",
      text: "text-green-500",
    },

    red: {
      bg: "bg-red-100",
      text: "text-red-500",
    },

    blue: {
      bg: "bg-blue-100",
      text: "text-blue-500",
    },
  };


  return (

    <div
      className="
        rounded-2xl
        bg-white
        p-5
        border
        border-gray-100
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
      "
    >

      <div className="flex items-center justify-between">


        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>


          <h2
            className="
              mt-2
              text-3xl
              font-bold
              text-gray-800
            "
          >
            {value}
          </h2>


          {subtitle && (
            <p
              className="
                mt-2
                text-xs
                text-gray-400
              "
            >
              {subtitle}
            </p>
          )}

        </div>


        <div
          className={`
            h-12
            w-12
            rounded-xl
            flex
            items-center
            justify-center
            text-xl
            ${colorStyles[color].bg}
            ${colorStyles[color].text}
          `}
        >

          {icon}

        </div>


      </div>


    </div>

  );
}

export default StatCard;