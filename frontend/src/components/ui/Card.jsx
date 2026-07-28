function Card({
  children,
  className = "",
}) {

  return (

    <div
      className={`
        rounded-xl
        bg-white
        border
        border-gray-100
        shadow-sm]
        ${className}
      `}
    >
      {children}
    </div>

  );

}

export default Card;