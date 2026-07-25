import React from "react";

const Select = React.forwardRef(
(
{
  label,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = "Select",
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

      <select
        ref={ref}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
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
      >

        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}

      </select>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}

    </div>

  );

});

export default Select;