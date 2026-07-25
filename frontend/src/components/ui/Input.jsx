import React from "react";


const Input = React.forwardRef(
(
{
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  ...props
},
ref
) => {

  return (

    <div>

      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}


      <input

        ref={ref}

        type={type}

        name={name}

        value={value}

        onChange={onChange}

        placeholder={placeholder}

        disabled={disabled}

        className={`
          w-full
          rounded-xl
          border
          bg-gray-50
          px-4
          py-2.5
          outline-none
          transition-all
          duration-200

          ${
            error
              ? "border-red-500 focus:ring-red-100"
              : "border-gray-200 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
          }

          ${
            disabled
              ? "cursor-not-allowed opacity-60"
              : ""
          }
        `}

        {...props}

      />


      {error && (

        <p className="mt-1 text-sm text-red-500">

          {error}

        </p>

      )}


    </div>

  );

});


export default Input;