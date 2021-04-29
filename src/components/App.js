import "../assets/css/App.css";

/* Importando componentes */
import VonNeumman from "./VonNeumman";
// import ChiCuadrado from "./ChiCuadrado";
import CongruenciaMixta from "./CongruenciaMixta";
import React, { useState } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import Indicacion from "./Indicacion";

function App() {
  const [state, setState] = useState(0);

  function handleChange(e, val) {
    setState(val);
    console.log(val);
  }

  function TabPanel(props) {
    const { children, value, index } = props;

    return <>{value === index && <div>{children}</div>}</>;
  }

  return (
    <div className="App">
      <body className="App-body">
        <Box paddingBottom={2}>
          <Typography variant="h4" color="initial">
            Generador de Numeros Aleatorios
          </Typography>
        </Box>
        <Divider></Divider>

        <Indicacion />
        <Box paddingY={10}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <AppBar position="static" color="transparent" elevation={2}>
                <Tabs value={state} onChange={handleChange}>
                  <Tab label="Von Neumman" />
                  <Tab label="Congruencia Mixta" />
                </Tabs>
              </AppBar>
            </Grid>
          </Grid>

          <TabPanel value={state} index={0}>
            <Box paddingY={2}>
              <VonNeumman />
            </Box>
          </TabPanel>
          <TabPanel value={state} index={1}>
            <Box paddingY={2}>
              <CongruenciaMixta />
            </Box>
          </TabPanel>
        </Box>
        <Box alignContent="center">
          <Typography variant="h4" color="initial">
            Test de aleatoriedad{" "}
          </Typography>
        </Box>
      </body>
    </div>
  );
}

export default App;
