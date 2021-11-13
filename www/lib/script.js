window.onload = function(){
  const buscar = document.querySelector("#buscar");

  const buscarQr = document.querySelector("#buscarQr");

  const cep = document.querySelector("#cep");

  function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    
    states[Connection.NONE] = 0;

    if(states[networkState] == 0 ){
      return false;
    }else{
      return true;
    }
}

//checkConnection();

  const opcoes = {
    method:'GET',
    mode: 'cors',
    cache: 'default'
  }

  buscar.addEventListener("click", function(){
    if(checkConnection()){
      fetch(`https://viacep.com.br/ws/${ cep.value }/json/`,opcoes)
      .then(response => {response.json()
        .then(data => {
          document.querySelector("#estado").value = data['uf'];
          document.querySelector("#cidade").value = data['localidade'];
          document.querySelector("#bairro").value = data['bairro'];
          document.querySelector("#rua").value = data['logradouro'];
        })
      })
    }else{
      alert("Não tem conexão filho!!")
    }
    
  });

  buscarQr.addEventListener("click", function(){
      if(checkConnection()){
          cordova.plugins.barcodeScanner.scan(
          function (result) {
            fetch(`https://viacep.com.br/ws/${ result.text }/json/`,opcoes)
            .then(response => {response.json()
            .then(data => {
              document.querySelector("#estado").value = data['uf'];
              document.querySelector("#cidade").value = data['localidade'];
              document.querySelector("#bairro").value = data['bairro'];
              document.querySelector("#rua").value = data['logradouro'];
            })
          })  
          },
          function (error) {
              alert("Scanning failed: " + error);
          },
          {
              preferFrontCamera : false, // iOS and Android
              showFlipCameraButton : true, // iOS and Android
              showTorchButton : true, // iOS and Android
              torchOn: true, // Android, launch with the torch switched on (if available)
              saveHistory: true, // Android, save scan history (default false)
              prompt : "Place a barcode inside the scan area", // Android
              resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
              formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
              orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
              disableAnimations : true, // iOS
              disableSuccessBeep: false // iOS and Android
          }
          );
  }else{
     alert("Não tem conexão filho!!");
  }
      

  });
}
