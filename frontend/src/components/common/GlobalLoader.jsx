import { useEffect, useState } from "react";

let activeRequests = 0;

function GlobalLoader() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const handleStart = () => {

      activeRequests++;

      setLoading(true);

    };

    const handleEnd = () => {

      activeRequests--;

      if (activeRequests <= 0) {

        activeRequests = 0;

        setLoading(false);

      }

    };

    window.addEventListener(
      "api-request-start",
      handleStart
    );

    window.addEventListener(
      "api-request-end",
      handleEnd
    );

    return () => {

      window.removeEventListener(
        "api-request-start",
        handleStart
      );

      window.removeEventListener(
        "api-request-end",
        handleEnd
      );

    };

  }, []);

  if (!loading) {

    return null;

  }

  return (

    <div
      className="
        fixed
        inset-0
        z-[9999]
        bg-white/40
        backdrop-blur-[2px]
        flex
        items-center
        justify-center
      "
    >

      <div
        className="
          h-14
          w-14
          rounded-full
          border-4
          border-gray-200
          border-t-orange-500
          animate-spin
        "
      />

    </div>

  );

}

export default GlobalLoader;