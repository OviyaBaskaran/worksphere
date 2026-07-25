function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
}) {

  const variants = {
    primary:
      "bg-orange-500 text-white hover:bg-orange-600",

    secondary:
      "bg-gray-200 text-gray-700 hover:bg-gray-300",

    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  return (

    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-xl
        px-5
        py-2.5
        text-sm
        font-semibold
        transition-all
        duration-300
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed

        ${variants[variant]}

        ${className}
      `}
    >

      {children}

    </button>

  );

}

export default Button;