$(function () {
  const soundtrack = document.getElementById("soundtrack");
  let score = 0;
  $("#jugar").click(function () {
    $(".container__grid-entrada-hidden-key-data").val($("#usuario").val());
    validarNickname();
    soundtrack.addEventListener("ended", function () {
      this.currentTime = 0;
      this.play();
    });
    soundtrack.play();
    celdaTopo();
    setInterval(celdaTopo, 3000);
  });
  const celdaTopo = () => {
    let random = Math.floor(Math.random() * 9) + 1;
    $(".container__pruebita").text(`NUMERO: ${random}`);
    $(`#imagen-${random}`).attr("src", "topologo2.png");
    $(`#imagen-${random}`).dblclick(function () {
      if ($(`#imagen-${random}`).attr("src") === "topologo2.png") {
        $(".container__scoregrid").text(`SCORE: ${(score += 10)}`);
        $(`#imagen-${random}`).attr("src", "hole.png");
      }
    });
  };
  const validarNickname = () => {
    const nicknameIngresado = $(".container__grid-entrada-hidden-key-data").val();
    const nicknameLongitud = nicknameIngresado.length;
    if (nicknameLongitud >= 4 && nicknameLongitud <= 8)
      $("#row1, #row2, #row3, #row4").hide(generarGrid());
    else alert("usuario invalido");
  };
  const generarGrid = () => {
    let i = 0;
    $(".container").css({gridTemplateAreas: 0, gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "25% 25% 25% 25%",});
    const filas = $(".container").css("gridTemplateRows").split(" ").length;
    const columnas = $(".container").css("gridTemplateColumns").split(" ").length;
    for (let fila = 1; fila < filas; fila++) {
      for (let columna = 1; columna <= columnas; columna++) {
        i++;
        if (fila !== 4) $(".container").append($.parseHTML(/*html */ `<div class = "container__item-${fila}-${columna} container__grid-gameplay"><img class = "container__grid-gameplay-img-${fila}-${columna} container__grid-gameplay-holes" id="imagen-${i}" src = "hole.png"/></div>`));
        else {
          if (columna == 1) $(".container").append($.parseHTML(/*html */ `<div class = "container__item-${fila}-${columna} container__grid-gameplay container__usuariogrid">${$(".container__grid-entrada-hidden-key-data").val()}</div>`));
          else if (columna == 2) $(".container").append($.parseHTML(/*html */ `<div class = "container__item-${fila}-${columna} container__grid-gameplay container__pruebita">reloj</div>`));
          else $(".container").append($.parseHTML(/*html */ `<div class = "container__item-${fila}-${columna} container__grid-gameplay container__scoregrid">SCORE: 0</div>`));
        }
      }
    }
  };
});