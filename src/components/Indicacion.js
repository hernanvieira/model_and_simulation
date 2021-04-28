import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class Indicacion extends Component {
  render() {
    return (
      <Grid container spacing={1}>
        <Grid item sm={12} lg={6} xs={12}>
          <Typography variant="subtitle1">
            Para utilizar los generadores de números pseudoaleatorios basta con
            seleccionar el método a utilizar y completar los campos solicitados
            por el método. Luego de cargar los datos solicitados, presionar en
            el botón <b>Generar.</b>
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default Indicacion;
