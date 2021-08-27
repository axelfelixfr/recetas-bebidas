import { Form } from './components/Form';
import { Header } from './components/Header';
import CategoriesProvider from './context/CategoriesContext';
import CocktailsProvider from './context/CocktailsContext';

function App() {
  return (
    <CategoriesProvider>
      <CocktailsProvider>
        <Header />

        <div className="container mt-5">
          <div className="row">
            <Form />
          </div>
        </div>
      </CocktailsProvider>
    </CategoriesProvider>
  );
}

export default App;
