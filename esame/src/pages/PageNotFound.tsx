import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"


//PAGINA NON TROVATA
function PageNotFound() {
    const navigate=useNavigate();
    return (
        <>
            <h1 style={{marginLeft:'35%',marginTop:'10%',marginBottom:0}}>404 Pagina non Trovata</h1>
            <Button variant="contained" style={{marginTop:'5%',marginLeft:'42%'}} onClick={()=>navigate("/home")}>Torna alla Home</Button>
        </>
    )
}
export default PageNotFound