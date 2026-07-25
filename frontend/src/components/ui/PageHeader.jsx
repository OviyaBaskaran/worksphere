function PageHeader({
  title,
  subtitle,
  action,
}) {

  return (

    <div
      className="
        flex
        flex-col
        gap-4
        mb-6

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >

      <div>

        <h1
          className="
            text-3xl
            font-bold
            text-gray-800
          "
        >
          {title}
        </h1>

        {subtitle && (

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            {subtitle}
          </p>

        )}

      </div>

      {action && (

        <div>

          {action}

        </div>

      )}

    </div>

  );

}

export default PageHeader;