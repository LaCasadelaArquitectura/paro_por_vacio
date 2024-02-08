

/*   
function showRangeValue() {
    return document.getElementById("rangeValue").textContent = document.getElementById("myRange").value;
     }

function valorPorDos() {
    var value = document.getElementById("myRange").value;}
    */

       /* Funcion para obtener la temeperatura de la camara a partir de la barra deslizante  */ 

    function showTCamara() {
        let tempCamara = document.getElementById("myRange").value;
                document.getElementById("tCamara").textContent = tempCamara;
    }

   /* Funcion para obtener la temeperatura exterior a partir de la barra deslizante  */ 

    function showTExt() {
        let tempr = document.getElementById("myRangeExt").value;
                document.getElementById("tExt").textContent = tempr;
    }

  /*  funcion para obtener la temperatura de condensacion */

  function showTCondensacion() {
        let temp = parseFloat(document.getElementById("myRangeExt").value);
        let tCond = 0; // inicializar la temperatura de condensación
      if (temp < 30) { tCond = temp + 15}
      else if (temp >= 30){
        switch (temp) {
          case 30:
            tCond = 44;
            break;
          case 31:
            tCond = 45;
            break;
          case 32:
            tCond = 45;
            break;
          case 33:
            tCond = 46;
            break;
          case 34:
            tCond = 46;
            break;
          case 35:
            tCond = 47;
            break;
          case 36:
            tCond = 47;
            break;
          case 37:
            tCond = 48;
            break;
            case 38:
            tCond = 48;
            break;
            case 39:
            tCond = 49;
            break;
            case 40:
            tCond = 49;
            break;
          default:
            tCond = 50; // si el valor de deltaT no coincide con ninguno de los casos anteriores
        }
    }
        document.getElementById("tCondensacion").textContent = tCond;
        let temperature = tCond;
        return temperature;
        
      }

      /* Funcion para obtener las presiones del circuito  */

      function calculateHiPressure() {
        let temperature = showTCondensacion(document.getElementById("myRangeExt").value);
        
        const data = [
          [-10, 2],
          [-5, 2.42],
          [0, 2.92],
          [5, 3.49],
          [10, 4.14],
          [15, 4.88],
          [20, 5.71],
          [25, 6.65],
          [30, 7.7],
          [35, 8.88],
          [40, 10.18],
          [45, 11.62],
          [50, 13.2]
        ];
      
        var pressure;
      
        // check if temperature is within the range of the given data
        if (temperature < data[0][0] || temperature > data[data.length - 1][0]) {
          throw new Error('Temperature is out of range');
        }
      
        // find the corresponding pressure value for the given temperature
        for (var i = 0; i < data.length - 1; i++) {
          if (temperature >= data[i][0] && temperature < data[i + 1][0]) {
            var x1 = data[i][0];
            var y1 = data[i][1];
            var x2 = data[i + 1][0];
            var y2 = data[i + 1][1];
            pressure = (y2 - y1) / (x2 - x1) * (temperature - x1) + y1;
            break;
          }
        }
        if (temperature === 50){pressure = 13.2}
        document.getElementById("HiPressure").textContent = pressure.toFixed(2);
        return pressure;
      }

        /* calcular presion de baja  */

      function calculateLowPressure() {
        let temperature = document.getElementById("tempEvaporacion").value;
        
        const data = [
          [-10, 2],
          [-5, 2.42],
          [0, 2.92],
          [5, 3.49],
          [10, 4.14],
          [15, 4.88],
          [20, 5.71],
          [25, 6.65],
          [30, 7.7],
          [35, 8.88],
          [40, 10.18],
          [45, 11.62],
          [50, 13.2]
        ];
      
        var pressure;
      
        // check if temperature is within the range of the given data
        if (temperature < data[0][0] || temperature > data[data.length - 1][0]) {
          throw new Error('Temperature is out of range');
        }
      
        // find the corresponding pressure value for the given temperature
        for (var i = 0; i < data.length - 1; i++) {
          if (temperature >= data[i][0] && temperature < data[i + 1][0]) {
            var x1 = data[i][0];
            var y1 = data[i][1];
            var x2 = data[i + 1][0];
            var y2 = data[i + 1][1];
            pressure = (y2 - y1) / (x2 - x1) * (temperature - x1) + y1;
            break;
          }
        }
        if (temperature === 50){pressure = 13.2}
        document.getElementById("LowPressure").textContent = pressure.toFixed(2);
        return pressure;
      }

      /* Enceder equipo frigorifico  */

      function activate() {
        let elements = document.querySelectorAll('.apagado');
        elements.forEach(element => {
          element.classList.add('active');
          
        });
  
        let hiddenElement = document.querySelector('.oculto');
        hiddenElement.style.display = 'inline';
  
        let numberInput = document.querySelector('#tempEvaporacion');
        numberInput.value = -5;

        document.getElementById("LowPressure").textContent = 2.42

        let divInterno = document.querySelector('.llenado');
        let porcentaje = 40; // Cambiar por el porcentaje deseado
        divInterno.style.height = porcentaje + '%';

        let triangulo = document.querySelector('.trianguloReg');
        triangulo.style.borderTopColor = '#44ff00';
    }  

    /* Funcion apagar equip frigorifico  */

    function deactivate() {
        let elements = document.querySelectorAll('.apagado');
        elements.forEach(element => {
          element.classList.remove('active');
        });
      
        let hiddenElement = document.querySelector('.oculto');
        hiddenElement.style.display = 'none';
      
        document.getElementById("LowPressure").textContent = 0
      
        let divInterno = document.querySelector('.llenado');
        let porcentaje = 80; // change to the percentage you want at off state
        divInterno.style.height = porcentaje + '%';

        let triangulo = document.querySelector('.trianguloReg');
        triangulo.style.borderTopColor = '#ff0000';
      }

      function temperaturaDeConsigna(){
        let tempCamara = document.getElementById("myRange").value;
               if (tempCamara > 5){
                activate();
               } else if (tempCamara < 3){
                deactivate();
               }
      }


      function powerOnOf() {
        var checkbox = document.getElementById("dn");
        if (checkbox.checked) {
          activate();
        } else {
            deactivate();
        }
      }