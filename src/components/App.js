import "../assets/css/App.css";

/* Importando componentes */
import VonNeumman from "./VonNeumman";
// import ChiCuadrado from "./ChiCuadrado";
import CongruenciaMixta from "./CongruenciaMixta";
import React, { useState } from "react";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  Grid,
  Divider,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import Indicacion from "./Indicacion";

function App() {
  const [state, setState] = useState(0);

  function handleChange(e, val) {
    setState(val);
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
            <Grid item xs={12}>
              <Box display="flex">
                <AppBar position="static" color="transparent" elevation={2}>
                  <Tabs value={state} onChange={handleChange}>
                    <Tab label="Von Neumman" />
                    <Tab label="Congruencia Mixta" />
                    <Box flexGrow={1}></Box>

                    <Tooltip
                      onClick={() => console.log("holanda")}
                      title={
                        <>
                          <Typography color="inherit" align="center">
                            Tests de Aleatoriedad
                          </Typography>
                          Chi-Cuadrado y Rachas
                        </>
                      }
                      placement="top"
                    >
                      <IconButton icon={<HelpOutlineIcon fontSize="large" />}>
                        <HelpOutlineIcon fontSize="large" />
                      </IconButton>
                    </Tooltip>
                  </Tabs>
                </AppBar>
              </Box>
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
      </body>
    </div>
  );
}

export default App;
