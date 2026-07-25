function Modal({
  isOpen,
  title,
  children,
  onClose,
}) {

  if (!isOpen) {
    return null;
  }

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        px-4
      "
    >

      <div
        className="
          w-full
          max-w-lg
          rounded-2xl
          bg-white
          shadow-xl
          overflow-hidden
        "
      >

        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-gray-200
            px-6
            py-4
          "
        >

          <h2
            className="
              text-lg
              font-semibold
              text-gray-800
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              text-xl
              text-gray-500
              hover:text-red-500
            "
          >
            ×
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          {children}

        </div>

      </div>

    </div>

  );

}

export default Modal;