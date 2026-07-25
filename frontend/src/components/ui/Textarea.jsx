function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
  disabled = false,
}) {

  return (

    <div>

      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`
          w-full
          rounded-xl
          border
          bg-gray-50
          px-4
          py-3
          outline-none
          resize-none
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

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}

    </div>

  );

}

export default TextArea;