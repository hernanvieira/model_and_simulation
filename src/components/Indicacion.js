import React, { Component } from 'react';

class Indicacion extends Component {
    render(){
        return(
            <p class="text-muted card-title" >Para utilizar los generadores de números pseudoaleatorios basta con
            seleccionar el método a utilizar y completar los campos solicitados por el método. Luego de cargar
            los datos solicitados, presionar en el botón <b>Generar.</b></p>
        );
    }
}

export default Indicacion;