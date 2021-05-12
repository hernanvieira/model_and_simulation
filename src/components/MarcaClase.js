import React, { useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const defaultState = {
  nombre: "",
  probabilidad: "",
};

export default function MarcaClase() {
  const cant = useRef(null);
  const [rows, setRows] = useState([defaultState]);
  const [input, setInput] = useState("");
  const [arr, setArr] = useState([]);
  const [newArr, setNewArr] = useState([]);

  function Row({ onChange, nombre, probabilidad }) {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  id=""
                  label="Nombre"
                  value={nombre}
                  onChange={(e) => onChange("nombre", e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id=""
                  label="Probabilidad"
                  value={probabilidad}
                  onChange={(e) => onChange("probabilidad", e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  function handleChange(e) {
    setInput(e.target.value);
    for (let i = 0; i < e.target.value; i++) {
      arr.push(<p>{rows}</p>);
      setNewArr([...arr]);
    }

    setArr([]);

    if (e.target.value == "") {
      setNewArr([]);
    }
  }

  const handleOnChange = (index, name, value) => {
    var copyRows = [...rows];
    copyRows[index] = {
      ...copyRows[index],
      [name]: value,
    };
    /* setRows(copyRows); */
    console.log(copyRows);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            ref={cant}
            id=""
            label="N° de marcas de clases"
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <div>
        {console.log(newArr)}
        {newArr.map((row, index) => (
          <Row
            {...row}
            onChange={(name, value) => handleOnChange(index, name, value)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
