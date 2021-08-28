import { Form } from './components/Form';
import { Header } from './components/Header';
import { ListRecipes } from './components/ListRecipes';
import CategoriesProvider from './context/CategoriesContext';
import CocktailsProvider from './context/CocktailsContext';
import ModalProvider from './context/ModalContext';

function App() {
  return (
    <CategoriesProvider>
      <CocktailsProvider>
        <ModalProvider>
          <Header />

          <div className="container mt-5">
            <div className="row">
              <Form />
            </div>

            <ListRecipes />
          </div>
        </ModalProvider>
      </CocktailsProvider>
    </CategoriesProvider>
  );
}

export default App;
