import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

// Posicionamiento del modal
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

// Estilos del modal
const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: 450
    },
    maxHeight: 500,
    overflowY: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export const Recipe = ({ recipe }) => {
  // Extraer valores del context
  const { fullRecipe, setIdRecipe } = useContext(ModalContext);

  // Configuración del modal de material-ui
  const [modalStyle] = useState(getModalStyle);

  // State para abrir/cerrar el modal
  const [open, setOpen] = useState(false);

  // Extraemos las clases de CSS de useStyles
  const classes = useStyles();

  // Abre modal (en el state)
  const handleOpen = () => {
    setOpen(true);
  };

  // Cierra modal (en el state)
  const handleClose = () => {
    setOpen(false);
  };

  // Cierra modal y también pone de nueva cuenta la bebida seleccionada en null
  const handleCloseModal = () => {
    handleClose();
    setIdRecipe(null);
  };

  // Abre el modal y pone el id de la bebida selccionada
  const showModalRecipe = () => {
    setIdRecipe(recipe.idDrink);
    handleOpen();
  };

  // Muestra y formatea los ingredientes
  const showIngredients = fullRecipe => {
    // Array de ingredientes
    let ingredients = [];
    // Iteramos hasta que sea menor a 16, ya que el maximo de ingredientes que trae la API es 15
    for (let i = 1; i < 16; i++) {
      // Si existe un valor en la propiedad 'strIngredient' del objeto de la receta (fullRecipe)
      // Ejemplo fullRecipe[`strIngredient${i}`] === fullRecipe[strIngredient1]
      if (fullRecipe[`strIngredient${i}`]) {
        // Por cada propiedad de ingrediente encontrada se itera un elemento (li)
        // La propiedad 'strMeasure' es la cantidad del ingrediente
        ingredients.push(
          <li key={i}>
            {fullRecipe[`strIngredient${i}`]}
            {' - '}
            {fullRecipe[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredients;
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{recipe.strDrink}</h2>

        <img
          src={recipe.strDrinkThumb}
          alt={`Recipe from ${recipe.strDrink}`}
          className="card-img-top"
        />

        <div className="card-body">
          <button
            type="button"
            onClick={showModalRecipe}
            className="btn btn-block btn-primary"
          >
            Ver receta
          </button>

          <Modal open={open} onClose={handleCloseModal}>
            <div style={modalStyle} className={classes.paper}>
              <h2 className="text-primary">{fullRecipe.strDrink}</h2>
              <h3 className="mt-4">Instrucciones</h3>
              <p>{fullRecipe.strInstructions}</p>
              <div className="text-center">
                <img
                  className="img-fluid"
                  src={fullRecipe.strDrinkThumb}
                  alt={fullRecipe.strDrink}
                />
              </div>

              <h3>Ingredientes y cantidades</h3>
              <ul>{showIngredients(fullRecipe)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
