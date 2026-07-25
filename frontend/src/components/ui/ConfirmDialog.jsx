import Button from "./Button";
import Modal from "./Modal";

function ConfirmDialog({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {

  return (

    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onCancel}
    >

      <p className="text-gray-600">
        {message}
      </p>

      <div className="mt-6 flex justify-end gap-3">

        <Button
          variant="secondary"
          onClick={onCancel}
        >
          {cancelText}
        </Button>

        <Button
          onClick={onConfirm}
        >
          {confirmText}
        </Button>

      </div>

    </Modal>

  );

}

export default ConfirmDialog;