import React, { useRef, useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import { Box } from "@material-ui/core";

const defaultState = {
  nombre: "",
  probabilidad: "",
};

//columnas
const columnT1 = [
  {
    title: "Nombre MC",
    field: "mc",
  },
  {
    title: "Acumulada",
    field: "acumulada",
  },
  {
    title: "Minimo",
    field: "min",
  },
  {
    title: "Maximo",
    field: "max",
  },
];
const columnT2 = [
  {
    title: "Nombre MC",
    field: "mc",
  },
  {
    title: "Apariciones",
    field: "apariciones",
  },
  {
    title: "Esperadas",
    field: "esperadas",
  },
  {
    title: "Obtenidas",
    field: "obtenidas",
  },
];

function separarArrayN(arrayString, n) {
  var arrayRetorno = [];
  for (let i = 0; i < arrayString.length; i += n) {
    var aux = String("");
    if (i + (n - 1) < arrayString.length) {
      for (var j = i; j <= i + (n - 1); j++) {
        aux += arrayString[j];
      }
      arrayRetorno.push(parseInt(aux));
    }
  }
  return arrayRetorno;
}

function ajustar(array, min, max) {
  var arrayRetorno2 = [];
  var aux = 0;
  for (let i = 0; i < array.length; i++) {
    var division = parseInt(array[i]) / 100;
    var division = parseFloat(division);

    var diferencia = parseFloat(max) - parseFloat(min);
    diferencia = parseFloat(diferencia);

    aux = division * diferencia + parseFloat(min);
    arrayRetorno2.push(Math.round(aux));
  }
  return arrayRetorno2;
}

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
  const [z, setZ] = useState([]);
  const [x, setX] = useState([]);
  const [cant, setCant] = useState(1);

  const [arrayAcumulada, setArrayAcumulada] = useState([]);
  const [arrayMin, setArrayMin] = useState([]);
  const [arrayMax, setArrayMax] = useState([]);
  const [arrayEsperada, setArrayEsperada] = useState([]);
  const [arrayObtenida, setArrayObtenida] = useState([]);
  const [arrayApariciones, setArrayApariciones] = useState([]);

  const [dataT1, setDataT1] = useState([]);
  const [dataT2, setDataT2] = useState([]);

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
    setCant(cant + 1);
  };

  const handleOnRemove = (index) => {
    const copyRows = [...rows];
    copyRows.splice(index, 1);
    setRows(copyRows);
    setCant(cant - 1);
  };

  const valorZ = () => {
    var x = separarArrayN(props.serie, 2);
    var arrayMC = [];
    var arrayProbabilidades = [];
    var aux = "";
    var suma = 0;

    //Obtenemos el máximo y el mínimo y ajustamos el array

    var z = ajustar(x, min, max);
    z.push(min);
    z.push(max);
    console.log("zeta?");
    console.log(z);
    console.log("zeta?");

    setZ(z);
    setX(x);

    for (let i = 0; i < cant; i++) {
      aux = rows[i].probabilidad;
      suma += parseFloat(aux);
    }
    console.log("keeeeeeeeeeeeeeeeeeeeeeee");
    console.log(suma);
    var mini = min;
    var maxi = max;

    if (suma == 100) {
      for (let i = 0; i < cant; i++) {
        arrayProbabilidades.push(rows[i].probabilidad);
        arrayMC.push(rows[i].nombre);
      }

      console.log(arrayProbabilidades);
      console.log(arrayMC);

      //Calculo de arrays
      var arrayRetorno = [];
      var arrayMinimos = [];
      var arrayMaximos = [];
      var cantElementosMarca = [];

      arrayMinimos.push(mini);
      var cantElementos = Number(maxi) - Number(mini);
      //luego vamos a calcular la cantidad de elementos por marcas de clase
      for (let i = 0; i < arrayProbabilidades.length; i++) {
        cantElementosMarca.push(
          Number((arrayProbabilidades[i] * cantElementos) / 100).toFixed(2)
        );
      }
      arrayRetorno.push(cantElementosMarca);

      //esto es para armar el array de minimos y maximos
      for (let i = 0; i < arrayProbabilidades.length; i++) {
        mini = parseFloat(mini);
        arrayMaximos.push(mini + Number(cantElementosMarca[i]));
        console.log("imprimicion");
        console.log(typeof mini);
        console.log(i);
        console.log(typeof cantElementosMarca[i]);

        mini += Number(cantElementosMarca[i]) + Number(0.1);
        console.log("resultado");
        console.log(mini);

        arrayMinimos.push(parseFloat(mini).toFixed(2));
      }
      console.log("utlimo" + typeof arrayMaximos[arrayMaximos.length - 1]);
      arrayMaximos[arrayMaximos.length - 1] =
        arrayMaximos[arrayMaximos.length - 1].toFixed(0);
      arrayMinimos.pop();

      arrayRetorno.push(arrayMinimos);
      arrayRetorno.push(arrayMaximos);

      console.log("minimos sssssssss0");
      console.log(arrayMinimos);
      console.log("minimos sssssssss0");
      console.log("maxi sssssssss0");
      console.log(arrayMaximos);
      console.log("maxi sssssssss0");
      var arrayNumerosMC = [];
      var arrayNumeros = z;
      //Clasificamos
      for (let i = 0; i < arrayNumeros.length; i++) {
        for (let j = 0; j < arrayMinimos.length; j++) {
          if (
            Number(arrayNumeros[i]) >= Number(arrayMinimos[j]) &&
            Number(arrayNumeros[i]) <= Number(arrayMaximos[j])
          ) {
            arrayNumerosMC[i] = arrayMC[j];
            break;
          }
        }
      }
      console.log("array numeros mc " + arrayNumerosMC);

      //Apariciones
      var arrayApariciones = [];
      for (let i = 0; i < arrayMC.length; i++) {
        var canti = 0;
        for (let j = 0; j < arrayNumerosMC.length; j++) {
          if (String(arrayMC[i]) === String(arrayNumerosMC[j])) {
            canti++;
          }
        }
        arrayApariciones.push(canti);
      }
      console.log("apariciones" + arrayApariciones);
      //Cargamos el array de apariciones
      arrayRetorno.push(arrayApariciones);

      //Cargamos el array de aparaciciones esperadas
      for (let i = 0; i < arrayProbabilidades.length; i++) {
        arrayProbabilidades[i] = Number(
          (100 * Number(arrayProbabilidades[i])) / Number(cantElementos)
        ).toFixed(3);
      }
      arrayRetorno.push(arrayProbabilidades);
      //Obtenidas
      var arrayObtenidas = [];
      for (let i = 0; i < arrayApariciones.length; i++) {
        arrayObtenidas.push(
          (
            (parseInt(arrayApariciones[i]) / parseFloat(arrayNumeros.length)) *
            100
          ).toFixed(3)
        );
      }

      //Cargamos las obtenidas
      arrayRetorno.push(arrayObtenidas);
      setArrayAcumulada(cantElementosMarca);
      setArrayMin(arrayMinimos);
      setArrayMax(arrayMaximos);
      setArrayApariciones(arrayApariciones);
      setArrayEsperada(arrayProbabilidades);
      setArrayObtenida(arrayObtenidas);

      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALA");
      /*El array de retorno contiene:
       0: probabilidades acumuladas
       1: probabilidades minimas
       2: probabilidades maximas
       3: cantidad de apariciones por marca de clase
       4: probabilidades esperadas
       5: probabilidades obtenidas
  */

      console.log("Datos bro");
      console.log(arrayAcumulada);
      console.log(arrayMin);
      console.log(arrayMax);
      console.log(arrayApariciones);
      console.log(arrayEsperada);
      console.log(arrayObtenida);
      console.log(arrayMC.length);

      //datosT1
      var dataT1 = [];
      var nuevoArray = [];

      //Por cada marca de clase guardamos los valores para despues mostrar en una tabla
      for (let i = 0; i < arrayMC.length; i++) {
        //creamos la estructura que tenda el objeto
        var objectDataT1 = {
          mc: "",
          acumulada: "",
          min: "",
          max: "",
        };

        //guardamos los valores de cada marca de clase
        objectDataT1.mc = arrayMC[i];
        objectDataT1.acumulada = arrayAcumulada[i];
        objectDataT1.min = arrayMin[i];
        objectDataT1.max = arrayMax[i];

        //creamos un array para luego utilizar el spread operator
        var arrayAuxNazi1 = [objectDataT1];

        //dataT1.push(objectDataT1); ESTA MAL nunca debemos tratar directamente con el valor del estado a menos que usemos seteadores

        //Voy guardando los objetos en un array
        nuevoArray = [...nuevoArray, ...arrayAuxNazi1];
      }

      //seteo dataT1
      dataT1 = [...dataT1, ...nuevoArray];
      setDataT1(dataT1);

      //datosT2
      var dataT2 = [];
      nuevoArray = [];
      for (let i = 0; i < arrayMC.length; i++) {
        var objectDataT2 = {
          mc: "",
          apariciones: "",
          esperadas: "",
          obtenidas: "",
        };
        objectDataT2.mc = arrayMC[i];
        objectDataT2.apariciones = arrayApariciones[i];
        objectDataT2.esperadas = arrayEsperada[i];
        objectDataT2.obtenidas = arrayObtenida[i];

        var arrayAuxNazi2 = [objectDataT2];

        //dataT2.push(objectDataT2);
        nuevoArray = [...nuevoArray, ...arrayAuxNazi2];
      }

      dataT2 = [...dataT2, ...nuevoArray];
      setDataT2(dataT2);

      console.log("dataaaaaaaaaaaaaaaaaaaa");
      console.log(dataT1);
      console.log(dataT2);
    }
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
      <Button
        variant="contained"
        color="Primary"
        disableElevation
        onClick={valorZ}
      >
        Marca de clases
      </Button>

      <Typography variant="h5" color="initial">
        Numeros pseudoaleatorios generados:
      </Typography>
      {z}
      <Typography variant="h5" color="initial">
        Tablas
      </Typography>
      <Grid container spacing={1}>
        <Grid xs={6}>
          <Box m={2}>
            <MaterialTable columns={columnT1} data={dataT1} title={""} />
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box m={2}>
            <MaterialTable columns={columnT2} data={dataT2} title={""} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
