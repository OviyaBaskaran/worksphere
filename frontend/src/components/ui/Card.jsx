function Card({
  children,
  className = "",
}) {

  return (

    <div
      className={`
        rounded-3xl
        bg-white
        border
        border-gray-100
        shadow-[0_10px_35px_rgba(0,0,0,0.08)]
        ${className}
      `}
    >
      {children}
    </div>

  );

}

export default Card;