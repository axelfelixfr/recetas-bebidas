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
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export const Recipe = ({ recipe }) => {
  // Extraer valores del context
  const { setIdRecipe } = useContext(ModalContext);

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
              <h1>Desde modal</h1>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
