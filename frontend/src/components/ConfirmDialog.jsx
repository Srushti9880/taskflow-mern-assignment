import { useState } from "react";
import { Modal } from "./Modal";
import { Spinner } from "./Spinner";

export const ConfirmDialog = ({ title, message, confirmLabel, onConfirm, onClose }) => {
  const [busy, setBusy] = useState(false);

  const handleConfirm = async () => {
    setBusy(true);
    try {
      await onConfirm();
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal title={title} onClose={busy ? () => {} : onClose} labelledBy="confirm-title">
      <p className="modal-text">{message}</p>
      <div className="modal-actions">
        <button className="btn btn-ghost" onClick={onClose} disabled={busy}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleConfirm} disabled={busy}>
          {busy && <Spinner small />}
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};
