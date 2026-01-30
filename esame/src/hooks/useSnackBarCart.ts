import { useState } from "react";

//HOOK CHE SI OCCUPA DI FORNIRE IL METODO E LO USE STATE PER GESTIRE LA SNACKBAR ID REACT MATERIAL
export function SnackBarCart() {
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

  function handleSnack(): boolean {
    if (!openSnackBar) {
      setOpenSnackBar(true);
      return true;
    } else {
      setOpenSnackBar(false);
      return false;
    }
  }

  return {
    openSnackBar,
    handleSnack,
  };
}
