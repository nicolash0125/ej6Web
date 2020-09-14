//Obtiene en una promesa el Request a una url
function promesa(url) { return new Promise( function(resolve, reject) 
    {
      let req = new XMLHttpRequest();
      req.open('GET',url)
      req.onload = function(){
        if(req.status == 200){
          resolve(req.response);
         }
        else{
          reject(Error(req.statusText));
         }
       }
      req.onerror = function() {
        reject(Error("Network Error"));
      };
      req.send()


   });
}
//Calcula el coeficiente de correlacion
function mcc(event,data){
    let tp = 0
    let tn = 0
    let fp = 0
    let fn = 0

    data.forEach(element=>{
        if (element.squirrel){    //Positive

            if (element.events.some(ev => ev == event)){    //True positive 
                tp += 1
            }
            else{   //False positive
                fp += 1
            }

        }
        else{   //Negative 
            if (element.events.some(ev=>ev==event)){    //False negative 
                fn += 1
            }
            else{   //True negative
                tn += 1
            }
        }
    })
    return (tp*tn-fp*fn) / Math.sqrt((tp+fp)*(tp+fn)*(tn+fp)*(tn+fn))
}



url='https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json'
promesa(url).then(function(response) {
    var data = JSON.parse(response);
    let tablaEventos = document.getElementById('TablaEventos') 
    let tablaCorrelacion = document.getElementById('TablaCorrelacion') 
    var datosTB = []
    let i = 1
    data.forEach(element => {

        let fila = document.createElement('tr')
        let columnaNum = document.createElement('th')
        let node = document.createTextNode(i)
        columnaNum.appendChild(node)
        columnaNum.classList.add('col')
        fila.appendChild(columnaNum)
        


        let columnaEv = document.createElement('td')
         node = document.createTextNode(element.events)
        columnaEv.appendChild(node)
        columnaEv.classList.add('col')
        fila.appendChild(columnaEv)

        let columnaSq = document.createElement('td')
         node = document.createTextNode(element.squirrel)
        columnaSq.appendChild(node)
        columnaSq.classList.add('col')
        fila.appendChild(columnaSq)

        fila.classList.add('row')        
        if (element.squirrel == true){
            fila.classList.add('table-danger')
        }

        tablaEventos.appendChild(fila)
        i++

        element.events.forEach(evento=>{
            
            if(!datosTB.some(dat => dat.evento==evento)){
                datosTB.push({'evento':evento,'mcc':mcc(evento,data)})
            }
            
        })
        function compare(a,b){
            if(a.mcc == b.mcc)
                return 0
            if(a.mcc > b.mcc)
                return -1
            else
                return 1
            
        }
        datosTB.sort(compare)
        
    });
    i=1
    datosTB.forEach(e=>{
        let fila = document.createElement('tr')
        let columnaNum = document.createElement('th')
        let node = document.createTextNode(i)
        columnaNum.appendChild(node)
        columnaNum.classList.add('col')
        fila.appendChild(columnaNum)
        


        let columnaEv = document.createElement('td')
         node = document.createTextNode(e.evento)
        columnaEv.appendChild(node)
        columnaEv.classList.add('col')
        fila.appendChild(columnaEv)

        let columnaMCC = document.createElement('td')
         node = document.createTextNode(e.mcc)
         columnaMCC.appendChild(node)
         columnaMCC.classList.add('col')
        fila.appendChild(columnaMCC)

        fila.classList.add('row')        
        
        tablaCorrelacion.appendChild(fila)
        i++


    })
})


