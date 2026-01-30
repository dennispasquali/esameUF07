import styles from '../ComponentStyle/SearchBar.module.css'; // Importiamo lo stile che definiremo dopo
import Lente from '../assets/lente.svg';
import TextField from '@mui/material/TextField';

//COMPONENTE BARRA DI RICERCA
const SearchBar = () => {

  return (
    <div className={styles.search_container}>
      {/* INPUT DI RICERCA */}
      <TextField
        size="small"
        placeholder="Trova Prodotti..."
      />
      <div id={styles.lente}>
        <img src={Lente} />
      </div>
    </div>
  );
};

export default SearchBar;