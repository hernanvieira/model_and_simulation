import "../assets/css/App.css";

/* Importando componentes */
import VonNeumman from "./VonNeumman";
import CongruenciaMixta from "./CongruenciaMixta";
import React, { useState } from "react";
import { ScrollTo } from "react-scroll-to";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  Grid,
  Divider,
  IconButton,
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
        <Box paddingY={5} display="flex" justifyContent="center">
          <ScrollTo>
            {({ scroll }) => (
              <IconButton
                onClick={() => scroll({ x: 20, y: 1000, smooth: true })}
              >
                <ExpandMoreIcon fontSize="large" />
              </IconButton>
            )}
          </ScrollTo>
        </Box>

        <Box paddingTop={8}>
          <Box display="flex" justifyContent="center">
            <ScrollTo>
              {({ scroll }) => (
                <IconButton
                  onClick={() => scroll({ x: 20, y: -1000, smooth: true })}
                >
                  <ExpandLessIcon fontSize="large" />
                </IconButton>
              )}
            </ScrollTo>
          </Box>
          <Typography variant="h4" color="initial">
            Test De Aleatoriedad
          </Typography>
        </Box>
        <Divider></Divider>
        <Box paddingY={300}></Box>
      </body>
    </div>
  );
}

export default App;
