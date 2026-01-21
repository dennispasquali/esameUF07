import { useState } from "react";

export function SnackBarCart() {
    const [openSnackBar,setOpenSnackBar]=useState<boolean>(false);

    function handleSnack() :boolean {
      if(!openSnackBar) {
        setOpenSnackBar(true);
        return true
      } else {
        setOpenSnackBar(false);
        return false
      }
    }

    return {
        openSnackBar,
        handleSnack
    }
}
