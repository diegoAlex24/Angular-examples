import { Component, OnInit } from '@angular/core';

declare var L: any;
declare var $:any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        let map = L.map('mapid').setView([40.505, -28.09], 1);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        this.loadGeoMap(map, this.loadInformation(map));
    }

    loadGeoMap(map, information){
        let myGeoJSONPath = '../../../assets/world.geo.json';
        let customOptions = {
            'maxWidth': '500',
            'className' : 'custom'
        }
        $.getJSON(myGeoJSONPath,function(data){
            //console.log(data);
            L.geoJson(data, {
                clickable: true,
                style: function(feature) {
                    switch (feature.properties.iso_a2) {
                        case 'FR': 
                            return {
                                color: "#FFD700"
                            };
                        case 'HR': 
                            return {
                                color: "#FF0000"
                            };
                        case 'BE':
                        case 'GB':
                            return {
                                color: "#FF8000"
                            };
                        case 'UY':
                        case 'BR':
                        case 'SE':
                        case 'RU':
                            return {
                                color: "#00FF00"
                            };
                        case 'AR':
                        case 'PT':
                        case 'ES':
                        case 'DK':
                        case 'MX':
                        case 'JP':
                        case 'CH':
                        case 'CO':
                            return {
                                color: "#0000FF"
                            };
                        case 'SA':
                        case 'EG':
                        case 'IR':
                        case 'MA':
                        case 'PE':
                        case 'AU':
                        case 'NG':
                        case 'IS':
                        case 'RS':
                        case 'CR':
                        case 'KR':
                        case 'DE':
                        case 'TN':
                        case 'PA':
                        case 'SN':
                        case 'PL':
                            return {
                                color: "#FF00FF"
                            };
                        default : 
                            return {
                                color: '#D8D8D8'
                            };
                    }
                }
            }).bindPopup(function (layer) {
                information.update(layer.feature.properties);
                return layer.feature.properties.name + "<br><img src='../assets/img/png/" + layer.feature.properties.iso_a2.toLowerCase() + ".png' alt='flag'/>";
            }, customOptions).addTo(map);
        });
        this.loadLegend(map);
    }

    loadInformation(map) : any{
        let information = L.control();

        information.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this.update();
            return this._div;
        };

        // method that we will use to update the control based on feature properties passed
        information.update = function (props) {
            this._div.innerHTML = '<h4>Clasificación copa del mundo</h4>' +  (props ?'<b>' + props.name 
                + (props.position ? "</b><br />Posición: " + props.position : "")
                + (props.confederation ? "<br />Confederación: " + props.confederation : "")
                + (props.match_won ? "<br />Partidos ganados: " + props.match_won : "")
                + (props.match_draw ? "<br />Partidos empatados: " + props.match_draw : "")
                + (props.match_lose ? "<br />Partidos perdidos: " + props.match_lose : "")
                + (props.goals ? "<br />Goles totales: " + props.goals : "")
                + (props.star ? "<br />Jugador estrella: " + props.star : "")
                + (props.champion ? "<br />Veces campeón del mundo: " + props.champion : "")
                : 'Haz clic en algún país');
        };

        information.addTo(map);
        return information;
    }

    loadLegend(map){
        let legend = L.control({position: 'bottomleft'});

        legend.onAdd = function (map) {
            let div = L.DomUtil.create('div', 'info legend'),
            labels = ["Campeón", "Finalista", "Semifinalista", "Cuartos de final", "Octavos de final", "Fase de grupos", "No participó"];
            let colors = ['#FFD700', '#FF0000', '#FF8000', '#00FF00', '#0000FF', '#FF00FF', '#D8D8D8'];

            // loop through our labels and generate a label with a colored square for each interval
            for (let i = 0; i < labels.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + colors[i] + '"></i> ' +
                    labels[i] + '<br>';
            }
            return div;
        };
        legend.addTo(map);
    }
}
