function Avatar({
  image,
  name,
  className = "",
}) {
  return (
    <div
      className={`
        w-10
        h-10
        rounded-full
        overflow-hidden
        flex
        items-center
        justify-center
        bg-gray-200
        text-gray-600
        font-semibold
        shrink-0
        ${className}
      `}
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>
          {name?.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}

export default Avatar;