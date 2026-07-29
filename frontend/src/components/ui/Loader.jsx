function Loader() {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        min-h-[60vh]
        w-full
      "
    >
      <div
        className="
          h-10
          w-10
          animate-spin
          rounded-full
          border-4
          border-gray-200
          border-t-orange-500
        "
      />
    </div>
  );
}

export default Loader;