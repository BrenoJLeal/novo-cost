
import Container from '../layout/Container';
import styles from './Search.module.css'
const Search = ({filter, setFilter}) => {
    return (
    <> <Container>
        <input
        className={styles.search}
        type="text"
        value={filter}
        placeholder='Digite o nome do item'
        onChange={(e) => setFilter(e.target.value)}
        />
        </Container>
    </>
     );
     
}
 
export default Search;