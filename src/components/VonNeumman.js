import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import {
  Button,
  Box,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Divider,
} from "@material-ui/core";

import MaterialTable from "material-table";

import Tests from "./Tests";
import Rachas from "./Rachas";

class VonNeumman extends Component {
  /* Constructor de la clase */

  constructor() {
    super();
    this.state = {
      semilla2: 0,
      cant: 0,
      resultado: [],
      serie: "",

      leyenda: "",
      error: false,

      visibilidad: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.visibilidad = this.visibilidad.bind(this);
    this.handleVisible = this.handleVisible.bind(this);
  }

  handleVisible(e) {
    this.setState({
      visibilidad: e,
    });
  }

  /* funcion visibilidad */
  visibilidad(e) {
    this.setState({
      visibilidad: this.state.visibilidad ? false : true,
    });
  }
  /* funcion para input */
  handleInput(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });

    if (name === "semilla") {
      if (value.length < 4 || value.length > 4) {
        this.setState({
          error: true,
          leyenda: "Debe introducir 4 digitos",
        });
      } else {
        this.setState({
          error: false,
          leyenda: "",
        });
      }
      if (value.length === 0) {
        this.setState({
          error: false,
          leyenda: "",
        });
      }
    }
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

      //Esto es una condicion del metodo
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
      if (!(xAux === "0000")) {
        if (xAux[xAux.length - 1] === "0" && xAux[xAux.length - 2] === "0") {
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
    /* Unificar numeros */
    let numeros = "";
    numeros = lista.map((obj) => numeros.concat(obj.numero));
    let serie = "";
    for (var i = 0; i < numeros.length; i++) {
      serie = serie + numeros[i];
    }
    this.setState({
      serie: serie,
    });
    console.log(serie);
  }

  render() {
    return (
      <>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Box mb={2}>
                <Accordion>
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Instrucciones</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Primer método aritmético para generar números
                      pseudoaleatorios. Desarrollado por Von Neumann y
                      Metropolis en 1946. Consiste en: ㅤㅤㅤㅤ <b>1.</b> Tomar
                      un número cualquiera de 4 (cuatro) dígitos y asignarlo al
                      primer elemento (semilla) de la serie, x1.
                      ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ ㅤ<b>2.</b> Elevarlo
                      al cuadrado y completar 8 (ocho) cifras, si fuera
                      necesario con ceros a la izquierda.
                      ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
                      <b>3.</b> Descartar los 2 (dos) primeros dígitos, al igual
                      que los 2 (dos) últimos. ㅤ <b>4.</b> Tomar los 4 (cuatro)
                      dígitos centrales como elemento siguiente de la sucesión,
                      x2.
                      ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
                      <b>5.</b> Repetir los pasos del 2 al 4 n veces, siendo n
                      la cantidad de nros pseudoaleatorios a generar.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>

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
                      error={this.state.error}
                      helperText={this.state.leyenda}
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
                      <Box>
                        <Button
                          disabled={this.state.error}
                          variant="contained"
                          color="secondary"
                          disableElevation
                          type="submit"
                        >
                          Generar
                        </Button>
                      </Box>

                      <Box mr={5}>
                        <Button
                          disabled={this.state.error}
                          variant="contained"
                          color="Primary"
                          disableElevation
                          onClick={this.visibilidad}
                        >
                          Tests
                        </Button>
                      </Box>
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
                exportButton="True"
                options={{ exportButton: true, exportAllData: true }}
              />
            </Grid>
          </Grid>

          {this.state.visibilidad ? (
            <Tests serie={this.state.serie} visible={this.handleVisible} />
          ) : null}
        </form>
      </>
    );
  }
}
export default VonNeumman;
