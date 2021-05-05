import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Typography, Grid, IconButton, Tooltip } from "@material-ui/core";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green, red } from "@material-ui/core/colors";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

function Tests(props) {
  const [open, setOpen] = React.useState(true);

  function handleClose() {
    setOpen(false);
    props.visible(false);
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "relative",
    },
    buttonSuccess: {
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
      },
    },
    buttonErr: {
      backgroundColor: red[500],
      "&:hover": {
        backgroundColor: red[700],
      },
    },
  }));

  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [success2, setSuccess2] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [err2, setErr2] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [msg2, setMsg2] = React.useState("");
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonErr]: err,
  });

  const buttonClassname2 = clsx({
    [classes.buttonSuccess]: success2,
    [classes.buttonErr]: err2,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  //Chi cuadrado
  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        /* funcion para resultado del chi cuadrado */
        var m = 0;
        var n = props.serie.length; //n es la cantidad de elementos
        var k = 10; //k es la posibilidad de numeros que hay, en este caso, 10 (0-9)
        var pi = n / k; //pi es la probabilidad que tiene cada numero de salir

        var arrayRetorno = [];

        //Retornaremos un array que contendra lo siguiente
        //[  digito(0-9), fi (frecuencia), npi (pi), fi-npi, (chi)^2, (chi)^2 / npi  ]
        for (let i = 0; i < k; i++) {
          var fi = 0;
          //Obtenemos fi
          for (let j = 0; j < props.serie.length; j++) {
            if (props.serie[j] === i) {
              fi++;
            }
          }
          arrayRetorno.push([
            i,
            fi,
            pi,
            fi - pi,
            (fi - pi) ^ 2,
            ((fi - pi) ^ 2) / pi,
          ]);
          m += ((fi - pi) ^ 2) / pi; //Este viaja a la funcion de arriba
        }

        var p = 0.01;
        var tablaChi = [
          ["0.001", 27.8767],
          ["0.0025", 25.4625],
          ["0.005", 23.5893],
          ["0.01", 21.666],
          ["0.025", 19.0228],
          ["0.05", 16.919],
          ["0.1", 14.6837],
          ["0.15", 13.288],
          ["0.2", 12.2421],
          ["0.25", 11.3887],
          ["0.3", 10.6564],
          ["0.35", 10.006],
          ["0.4", 9.4136],
          ["0.45", 8.8632],
          ["0.5", 8.3428],
          ["0.55", 7.8434],
          ["0.6", 7.357],
          ["0.65", 6.8763],
          ["0.7", 6.3933],
          ["0.75", 5.8988],
          ["0.8", 5.3801],
          ["0.85", 4.8165],
          ["0.9", 4.1682],
          ["0.95", 3.3251],
          ["0.975", 2.7004],
          ["0.99", 2.0879],
          ["0.995", 1.7349],
          ["0.9975", 1.4501],
          ["0.999", 1.1516],
        ];

        for (let i = 0; i < tablaChi.length; i++) {
          if (parseFloat(p) === parseFloat(tablaChi[i][0])) {
            if (parseFloat(m) > parseFloat(tablaChi[i][1])) {
              setErr(true);
              setMsg(
                "Rechaza porque m = " + m + " es mayor a " + tablaChi[i][1]
              );
            } else {
              setSuccess(true);
              setMsg(
                "Se acepta la hipotesis porque el valor de m^2 = " +
                  m +
                  " es menor al valor de m^2 sub e =" +
                  tablaChi[i][1]
              );
            }
          }
        }

        setLoading(false);
      }, 1000);
    }
  };

  //Rachas
  const handleButtonClick2 = () => {
    if (!loading) {
      setSuccess2(false);
      setLoading2(true);
      timer.current = window.setTimeout(() => {
        var aux = 0; //esta variable es para sumar los valores
        for (let i = 0; i < props.serie.length; i++) {
          aux += parseInt(props.serie[i]);
        }

        var media = 0.0;
        media = aux / parseFloat(props.serie.length);
        var arrayBinario = [];
        for (let i = 0; i < props.serie.length; i++) {
          if (props.serie[i] >= media) {
            arrayBinario.push(1);
          } else {
            arrayBinario.push(0);
          }
        }

        let i = 0;
        var valor0 = [0, 0, 0, 0, 0, 0];
        var valor1 = [0, 0, 0, 0, 0, 0];
        console.log(arrayBinario);
        while (i < arrayBinario.length) {
          var longitud = 0;
          while (arrayBinario[i] === 0 && i < arrayBinario.length) {
            longitud = longitud + 1;
            i++;
          }
          valor0[longitud - 1] = valor0[longitud - 1] + 1;
          longitud = 0;
          while (arrayBinario[i] === 1 && i < arrayBinario.length) {
            longitud = longitud + 1;
            i++;
          }
          valor1[longitud - 1] = valor1[longitud - 1] + 1;
        }
        let pasa = false;
        if (valor0[0] >= 2343 && valor1[0] >= 2657) {
          if (valor0[1] >= 1135 && valor1[1] >= 1365) {
            if (valor0[2] >= 542 && valor1[2] >= 708) {
              if (valor0[3] >= 251 && valor1[3] >= 373) {
                if (valor0[4] >= 111 && valor1[4] >= 201) {
                  if (valor0[5] >= 111 && valor1[5] >= 201) {
                    pasa = true;
                    setSuccess2(true);
                    setMsg2(
                      `Se acepta ya que los valores de rachas obtenidos estan en el rango aceptado`
                    );
                  } else {
                    setMsg2(
                      `Se rechaza porque los valores ${valor0[5]} , ${valor1[5]}  para longitud 6 estan fuera del rango aceptado`
                    );
                  }
                } else {
                  setMsg2(
                    `Se rechaza porque los valores ${valor0[4]} , ${valor1[4]}  para longitud 5 estan fuera del rango aceptado`
                  );
                }
              } else {
                setMsg2(
                  `Se rechaza porque los valores ${valor0[4]} , ${valor1[4]}  para longitud 4 estan fuera del rango aceptado`
                );
              }
            } else {
              setMsg2(
                `Se rechaza porque los valores ${valor0[4]} , ${valor1[4]}  para longitud 3 estan fuera del rango aceptado`
              );
            }
          } else {
            setMsg2(
              `Se rechaza porque los valores ${valor0[4]} , ${valor1[4]}  para longitud 2 estan fuera del rango aceptado`
            );
          }
        } else {
          setMsg2(
            `Se rechaza porque los valores ${valor0[4]} , ${valor1[4]}  para longitud 1 estan fuera del rango aceptado`
          );
        }
        if (pasa === false) {
          setErr2(true);
        }
        setLoading2(false);
      }, 1000);
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle id="alert-dialog-slide-title">
          {"Test de Aleatoriedad"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <div className={classes.root}>
                  <Button
                    name="buttonChi"
                    variant="contained"
                    color="primary"
                    className={buttonClassname}
                    disabled={loading}
                    onClick={handleButtonClick}
                  >
                    Chi-Cuadrado
                  </Button>
                  <Tooltip
                    title={
                      <>
                        <Typography variant="subtitle1">{msg}</Typography>
                      </>
                    }
                    placement="right"
                  >
                    <IconButton icon={<HelpOutlineIcon fontSize="large" />}>
                      <HelpOutlineIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                  {loading && <CircularProgress size={24} />}
                </div>
                <Box p={2}></Box>
                <div className={classes.root}>
                  <Button
                    name="buttonRacha"
                    variant="contained"
                    color="primary"
                    className={buttonClassname2}
                    disabled={loading2}
                    onClick={handleButtonClick2}
                  >
                    Rachas
                  </Button>
                  <Tooltip
                    title={
                      <>
                        <Typography variant="subtitle1">{msg2}</Typography>
                      </>
                    }
                    placement="right"
                  >
                    <IconButton icon={<HelpOutlineIcon fontSize="large" />}>
                      <HelpOutlineIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                  {loading2 && <CircularProgress size={24} />}
                </div>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Tests;
