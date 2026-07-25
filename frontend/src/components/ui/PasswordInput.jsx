import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

function PasswordInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
}) {

  const [showPassword, setShowPassword] = useState(false);

  return (

    <div>

      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="relative">

        <input
          type={showPassword ? "text" : "password"}
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
            pr-12
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
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-xl
            text-gray-500
            hover:text-orange-500
            transition
          "
        >
          {showPassword ? (
            <HiOutlineEyeOff />
          ) : (
            <HiOutlineEye />
          )}
        </button>

      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}

    </div>

  );

}

export default PasswordInput;