import React, { useState, useRef, useEffect, cloneElement } from "react";

export const Dialog = ({ Text, children, css }) => {
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
      <button
        onClick={handleOpenDialog}
        className={`border-2 rounded-md px-2 py-1 ${css}`}
      >
        {Text}
      </button>
      <dialog
        ref={dialogRef}
        onClick={handleClickOutside}
        className="rounded-md shadow-md"
      >
        {childrenWithProps}
        <div className="flex justify-end">
          <button type="button" onClick={handleCloseDialog} className="p-4">
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
};
