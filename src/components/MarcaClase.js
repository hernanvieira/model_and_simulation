import React, { useRef, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const defaultState = {
  nombre: "",
  probabilidad: "",
};
const max = 0;
const min = 0;

/*
function marcaClaseCalc({
  semilla,
  a,
  c,
  m,
  iteraciones,
  resultado,
  serie,
} = props) {
  var semilla = semilla;
  var n = iteraciones;
  var arregloResultado = resultado;
  var arregloResultadoVonNeumanAux = [];
  for (let i = 0; i < arregloResultado.length; i++) {
    if (!isNaN(arregloResultado[i][1])) {
      arregloResultadoVonNeumanAux.push(arregloResultado[i][1]);
    }
  }
  var w = separar(arregloResultadoVonNeumanAux);
  var x = separarArrayN(w, 2);

  //Obtenemos el máximo y el mínimo y ajustamos el array
  var min = $("#minimoVonNeuman").val();
  var max = $("#maximoVonNeuman").val();

  if (validarMinMaxVonNeumann(min, max) == 2) {
    $("#errorMinimoMaximoVonNeuman").html("");
    var z = ajustar(x, min, max);
    z.push(min);
    z.push(max);
    sessionStorage.setItem("arreglo", z);
    myWindow = window.open("./marcaClase.html", "Ventana");
  } else {
    if (validarMinMaxVonNeumann(min, max) == 0) {
      $("#errorMinimoMaximoVonNeuman").html(
        "Debe ingresar el minimo y el maximo"
      );
    }
    if (validarMinMaxVonNeumann(min, max) == 1) {
      $("#errorMinimoMaximoVonNeuman").html(
        "El minimo no puede ser mayor al maximo"
      );
    }
  }
}*/

function Row({ onChange, onRemove, nombre, probabilidad }) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                id=""
                label="Nombre"
                value={nombre}
                onChange={(e) => onChange("nombre", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id=""
                label="Probabilidad"
                value={probabilidad}
                onChange={(e) => onChange("probabilidad", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                onClick={onRemove}
              >
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default function App(props) {
  const [rows, setRows] = useState([defaultState]);
  const [max, setMax] = useState("");
  const [min, setMin] = useState("");

  const onChange = (name, value) => {
    if (name == "max") {
      setMax(value);
    } else {
      setMin(value);
    }
  };

  const handleOnChange = (index, name, value) => {
    const copyRows = [...rows];
    copyRows[index] = {
      ...copyRows[index],
      [name]: value,
    };
    setRows(copyRows);
  };

  const handleOnAdd = () => {
    setRows(rows.concat(defaultState));
  };

  const handleOnRemove = (index) => {
    const copyRows = [...rows];
    copyRows.splice(index, 1);
    setRows(copyRows);
  };

  return (
    <div>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Maximo"
                  value={max}
                  onChange={(e) => onChange("max", e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Minimo"
                  value={min}
                  onChange={(e) => onChange("min", e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

      {rows.map((row, index) => (
        <Row
          {...row}
          onChange={(name, value) => handleOnChange(index, name, value)}
          onRemove={() => handleOnRemove(index)}
          key={index}
        />
      ))}
      <Button
        variant="contained"
        color="Primary"
        disableElevation
        onClick={handleOnAdd}
      >
        Agregar
      </Button>
    </div>
  );
}
