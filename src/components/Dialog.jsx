import React, { useState, useRef, useEffect, cloneElement } from "react";

export const Dialog = ({ Text, children, onCreate }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef(null);

  // ダイアログの開閉を管理
  useEffect(() => {
    if (isDialogOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isDialogOpen]);

  const handleClickOutside = (event) => {
    if (event.target === dialogRef.current) {
      setIsDialogOpen(false);
    }
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const childrenWithProps = cloneElement(children, { handleCloseDialog });
  return (
    <div>
      <button onClick={handleOpenDialog}>{Text}</button>
      <dialog
        ref={dialogRef}
        onClick={handleClickOutside}
        className="rounded-md shadow-md"
      >
        {childrenWithProps}
        <div>
          <button type="button" onClick={handleCloseDialog}>
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
};
