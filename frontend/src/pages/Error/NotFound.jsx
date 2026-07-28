import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";

import notFoundImage from "../../assets/images/404.png";

function NotFound() {

  const navigate = useNavigate();

  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-orange-50
        via-white
        to-orange-100
        flex
        items-center
        justify-center
        px-6
        py-8
      "
    >

      <div
        className="
          w-full
          max-w-7xl
          grid
          lg:grid-cols-2
          items-center
          gap-12
        "
      >

        {/* Left Side */}

        <div
          className="
            flex
            justify-center
            order-1
          "
        >

          <img
            src={notFoundImage}
            alt="404"
            className="
              w-full
              max-w-md
              lg:max-w-xl
              xl:max-w-2xl
              h-auto
              object-contain
              select-none
              pointer-events-none
            "
          />

        </div>

        {/* Right Side */}

        <div
          className="
            text-center
            lg:text-left
            order-2
          "
        >

          <p
            className="
              text-[120px]
      md:text-[150px]
      xl:text-[180px]
      font-black
      leading-none
      text-orange-500
      tracking-tight hidden
            "
          >
            404
          </p>

          <h1
            className="
              mt-2
      text-3xl
      md:text-4xl
      font-bold
      text-gray-900
            "
          >
            Oops!
          </h1>

          <p
            className="
              mt-5
      max-w-lg
      text-gray-500
      text-base
      md:text-lg
      leading-8
            "
          >
            The page you are looking for doesn't exist,
    may have been moved, or is temporarily unavailable.
          </p>

          <div
            className="
              mt-10
              flex
              flex-col
              sm:flex-row
              gap-4
              justify-center
              lg:justify-start
            "
          >

            <Button
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>

            <button
              onClick={() => navigate(-1)}
              className="
                px-6
                py-3
                rounded-xl
                border
                border-gray-300
                bg-white
                text-gray-700
                font-medium
                transition-all
                hover:bg-gray-100
                hover:shadow-lg
              "
            >
              Go Back
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default NotFound;