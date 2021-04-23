import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Box, Grid, Typography } from "@material-ui/core";

import MaterialTable from "material-table";

class VonNeumman extends Component {
  /* Constructor de la clase */

  constructor() {
    super();
    this.state = {
      semilla2: 0,
      cant: 0,
      resultado: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* funcion para input */
  handleInput(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  /* funcion para submit */
  handleSubmit(e) {
    /* Obtengo los input */
    e.preventDefault();
    let { semilla, cant } = this.state;
    var x; //Este es el numero semilla que se va a transformar en los N numeros pseudoaleatorios

    var n = parseInt(cant);

    const lista = [];

    /* Agregamos la primer semilla */
    lista.push({ numero: semilla });

    /* iteramos segun la cantidad de numeros a generar */
    for (let i = 0; i < n; i++) {
      x = semilla * semilla;
      //Transformamos x a un string para poder obtener los cuatro numeros centrales
      let semillaX = String(x);

      //Comprobamos que la potencia tenga 8 digitos, de lo contrario, completamos dicho numero con ceros a la izquiera
      if (semillaX.length < 8) {
        var semillaXAux = "";
        for (let index2 = 0; index2 < 8 - semillaX.length; index2++) {
          semillaXAux += "0";
        }
        semillaX = semillaXAux + semillaX;
      }
      //Comprobamos que la potencia tenga 8 digitos, de lo contrario, completamos dicho numero con ceros a la izquiera

      if (semillaX.length < 8) {
        var semillaXAux = "";
        for (let index2 = 0; index2 < 8 - semillaX.length; index2++) {
          semillaXAux += "0";
        }
        semillaX = semillaXAux + semillaX;
      }
      //Declaramos un auxiliar para x para poder tomar los 4 numeros centrales
      var xAux = "";
      for (let index = 2; index < semillaX.length - 2; index++) {
        xAux += semillaX[index];
      }
      //Ahora comprobamos que xAux (nuestro numero siguiente de la sucecion) no contenga dos ceros al final
      if (!(xAux == "0000")) {
        if (xAux[xAux.length - 1] == "0" && xAux[xAux.length - 2] == "0") {
          var auxiliar = "";
          auxiliar = xAux[0] + xAux[1] + "13";
          xAux = auxiliar;
        }
      } else {
        lista.push([
          "Sucesión " + (i + 1),
          "Si las iteraciones resultantes no llegan a las suceciones solicitadas es porque el metodo decae!",
        ]);
        break;
      }

      lista.push({ numero: xAux });

      //Ahora la variable semilla va a tomar el valor de xAux
      semilla = parseInt(xAux);
    }

    this.setState({
      resultado: lista,
    });
  }

  render() {
    return (
      <>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box display="flex" justifyContent="center">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="semilla"
                      id="outlined-basic"
                      label="Semilla"
                      variant="outlined"
                      onChange={this.handleInput}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box display="flex" flexDirection="row-reverse">
                      <TextField
                        name="cant"
                        id="outlined-basic"
                        label="Cantidad de numeros"
                        variant="outlined"
                        onChange={this.handleInput}
                        type="number"
                      />
                    </Box>

                    <Box padding={4}></Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box display="flex" flexDirection="row-reverse">
                      <Button
                        variant="contained"
                        color="secondary"
                        disableElevation
                        type="submit"
                      >
                        Generar
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={2}></Grid>

            <Grid item xs={6}>
              <MaterialTable
                title="Tabla de Resultados"
                columns={[{ title: "Numeros", field: "numero" }]}
                data={this.state.resultado}
              />
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
}
export default VonNeumman;
