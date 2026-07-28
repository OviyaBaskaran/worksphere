import {
  HiOutlineTrash,
  HiOutlineX,
} from "react-icons/hi";

function ConfirmDialog({
  isOpen,
  title = "Delete Employee?",
  message = "Are you sure you want to delete this employee? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {

  if (!isOpen) return null;

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >

      <div
        className="
          relative
          w-full
          max-w-sm
          rounded-2xl
          bg-white
          shadow-2xl
          p-6
          animate-fadeIn
        "
      >

        {/* Close */}

        <button
          onClick={onCancel}
          className="
            absolute
            right-4
            top-4
            text-gray-400
            hover:text-gray-600
            transition
          "
        >

          <HiOutlineX size={18} />

        </button>

        {/* Delete Icon */}

        <div className="flex justify-center">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-red-100
            "
          >

            <HiOutlineTrash
              size={24}
              className="text-red-500"
            />

          </div>

        </div>

        {/* Title */}

        <h2
          className="
            mt-5
            text-center
            text-lg
            font-semibold
            text-gray-800
          "
        >

          {title}

        </h2>

        {/* Message */}

        <p
          className="
            mt-2
            text-center
            text-sm
            leading-6
            text-gray-500
          "
        >

          {message}

        </p>

        {/* Buttons */}

        <div
          className="
            mt-7
            flex
            gap-3
          "
        >

          <button
            onClick={onCancel}
            className="
              flex-1
              rounded-lg
              border
              border-gray-300
              bg-white
              py-2.5
              text-sm
              font-medium
              text-gray-700
              transition
              hover:bg-gray-100
            "
          >

            {cancelText}

          </button>

          <button
            onClick={onConfirm}
            className="
              flex-1
              rounded-lg
              bg-red-500
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-red-600
            "
          >

            {confirmText}

          </button>

        </div>

      </div>

    </div>

  );

}

export default ConfirmDialog;