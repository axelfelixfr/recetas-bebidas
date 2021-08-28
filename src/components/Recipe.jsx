import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

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
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseModal = () => {
    handleClose();
    setIdRecipe(null);
  };

  const showModalRecipe = () => {
    setIdRecipe(recipe.idDrink);
    handleOpen();
  };

  // Muestra y formatea los ingredientes
  const showIngredients = fullRecipe => {
    let ingredients = [];
    for (let i = 1; i < 16; i++) {
      if (fullRecipe[`strIngredient${i}`]) {
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
