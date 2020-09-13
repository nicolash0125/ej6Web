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

url='https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json'
promesa(url).then(function(response) {
    var data = JSON.parse(response);
    let tablaEventos = document.getElementById('TablaEventos') 
    let tablaCorrelacion = document.getElementById('TablaCorrelacion') 
    
    let i = 0
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
    });
    

    
})

