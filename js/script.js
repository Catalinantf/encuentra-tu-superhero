$(document).ready(function () {
    $('button').on('click', function () {
        $('section').show();
    });

    $("#boton").click((event) => {
        event.preventDefault();
        let numero = $("#barra-buscadora").val();
        limpiarInput();
        let val = validacion(numero);
        if (val == true) {
            buscar(numero);
        }else{
            esconderHTML()
        }

    });
    let limpiarInput = () => {
        $('#barra-buscadora').val("");
    }  
    let esconderHTML = () => {
        $('section').html("");
    }
    

function validacion(num) {
    let out = false;
    let validacionNum = /[0-9]/.test(num);
    console.log(validacionNum)
    if (validacionNum == true) {
        out = true;
        $('#error').html("");
    } else {
        let alerta = "<p class='alert alert-danger' role='alert'>Ingresa solamente números del 1 al 731 para encontrar a tu SuperHero</p>";
        $('#error').html(alerta);
    }
    return out;
}



let buscar = (num) => {
    $.ajax({
        type: 'GET',
        url: "https://www.superheroapi.com/api.php/10225963221122687/" + num,
        dataType: 'json',
        success: function (data) {
            console.log(data.name);
            mostrarHeroes(data);
        }
    })
}

let mostrarHeroes = data => {
    $('#super-imagen').attr("src", data.image.url);
    $('#nombre').text(`Nombre: ${data.name}`)
    $('#conexiones').text(`Connexiones: ${data.connections["group-affiliation"]}`)
    $('#publicado-por').text(`Publicado por: ${data.biography.publisher}`)
    $('#ocupacion').text(`Ocupación: ${data.work.occupation}`)
    $('#primera-aparicion').text(`Primera Aparición: ${data.biography.publisher}`)
    $('#altura').text(`Altura: ${data.appearance.height}`)
    $('#peso').text(`Peso: ${data.appearance.weight}`)
    $('#alianzas').text(`Alianzas: ${data.biography.aliases}`)
    canvas(data.name, data.powerstats)

}
});
let canvas = (nombre, data) => {
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2",
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: `Estadisticas de poder para ${nombre}`
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - ({y}) ",
            dataPoints: [
                { y: data.combat, label: "combat" },
                { y: data.durability, label: "durability" },
                { y: data.intelligence, label: "intelligence" },
                { y: data.power, label: "power" },
                { y: data.speed, label: "speed" },
                { y: data.strength, label: "strength" }

            ]
        }]
    });
    chart.render();

};
