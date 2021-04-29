import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Box, Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";


import MaterialTable from "material-table";

class CongruenciaMixta extends Component {
  /* Constructor de la clase */

  constructor() {
    super();
    this.state = {
      semilla: 0,
      a: 0,
      c: 0,
      m: 0,
      iteraciones: 0,
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
    let { semilla, a, c, m, iteraciones } = this.state;

    //Transformamos los atributos recibidos a enteros
    semilla = parseInt(semilla);
    a = parseInt(a);
    c = parseInt(c);
    m = parseInt(m);
    iteraciones = parseInt(iteraciones);

    var x = 0;
    //Cargamos el array a retornar con la primera iteracion (la semilla cargada por el usuario)
    const lista = [];

    lista.push({ numero: semilla });

    //Realizamos las iteraciones
    for (let i = 0; i < iteraciones; i++) {
      //Calculamos el siguiente numero de la sucesión
      x = (a * semilla + c) % m;
      //Cargamos el nuevo numero de la sucesión al array a retornar
      lista.push({ numero: x });
      semilla = x;
    }

    //Retornamos el array con todos los numeros pseudoaleatorios calculados

    this.setState({
      resultado: lista,
    });
  }

  render() {
    return (
      <>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Box mb={2} >
                <Accordion>
                  <AccordionSummary

                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Instrucciones</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>

                      Los generadores congruenciales lineales generan una secuencia de números pseudoaleatorios en
                      la cual el próximo número pseudoaleatorio es determinado a partir del último número
                            generado, es decir, el número pseudoaleatorio <b>X<sub>n+1</sub></b> es derivado a partir
                            del número pseudoaleatorio <b>X<sub>n</sub></b>. La relación de recurrencia para el
                            generador congruencial mixto es <b>X<sub>n+1</sub> = (aX<sub>n</sub> + c) mod m</b>, en
                            donde:

                        <ul class="text-muted">
                        <li>X<sub>0</sub> = es la semilla</li>
                        <li>a = el multiplicador</li>
                        <li>c = la constante aditiva</li>
                        <li>m = el módulo (m >X<sub>0</sub>, a, c)</li>
                        <li>X<sub>0</sub>, a, c >0</li>
                      </ul>
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
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box display="flex" flexDirection="row-reverse">
                      <TextField
                        name="a"
                        id="outlined-basic"
                        label="Multiplicador"
                        variant="outlined"
                        onChange={this.handleInput}
                        type="number"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="c"
                      id="outlined-basic"
                      label="Constante Aditiva"
                      variant="outlined"
                      onChange={this.handleInput}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box display="flex" flexDirection="row-reverse">
                      <TextField
                        name="m"
                        id="outlined-basic"
                        label="Modulo"
                        variant="outlined"
                        onChange={this.handleInput}
                        type="number"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="iteraciones"
                      id="outlined-basic"
                      label="Iteraciones"
                      variant="outlined"
                      onChange={this.handleInput}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={12}>
                    <Box paddingY={1}></Box>
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
                exportButton="True"
                options={{ exportButton: true, exportAllData: true }}
              />
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
}
export default CongruenciaMixta;
