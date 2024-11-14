// Definición del ancho y alto del SVG
const width = 960;
const height = 500;

// URL de la API de terremotos (últimos 30 días)
const apiUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=" +
               new Date().toISOString().slice(0,10) + "&minmagnitude=2.5";

// Proyección y escalas
const projection = d3.geoNaturalEarth1()
                     .scale(170)
                     .translate([width / 2, height / 2]);

const colorScale = d3.scaleSequential(d3.interpolatePlasma)
                     .domain([0, 700]);  // Escala basada en la profundidad

const sizeScale = d3.scaleSqrt()
                    .domain([2.5, 10])   // Escala basada en la magnitud
                    .range([2, 15]);

// Crear el SVG y el contenedor de información
const svg = d3.select("#map").append("svg")
              .attr("width", width)
              .attr("height", height);

const infoBox = d3.select("#info");

// Cargar y dibujar el mapa mundial
d3.json("https://d3js.org/world-110m.v1.json").then(worldData => {
  const countries = topojson.feature(worldData, worldData.objects.countries);

  // Dibujar el mapa de países
  svg.append("path")
     .datum(countries)
     .attr("fill", "#cce5df")
     .attr("stroke", "#888")
     .attr("d", d3.geoPath().projection(projection));

  // Obtener datos de terremotos y dibujarlos
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const earthquakes = data.features;
      renderEarthquakes(earthquakes);
    })
    .catch(error => console.error("Error al obtener los datos de la API:", error));
});

// Función para renderizar los terremotos en el mapa
function renderEarthquakes(data) {
  svg.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", d => projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0])
     .attr("cy", d => projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1])
     .attr("r", d => sizeScale(d.properties.mag))
     .attr("fill", d => colorScale(d.geometry.coordinates[2]))
     .attr("opacity", 0.8)
     .on("mouseover", function(event, d) {
       d3.select(this).attr("stroke", "black").attr("stroke-width", 1.5);

       // Actualizar el contenido del div de información
       infoBox.html(`
         <strong>Ubicación:</strong> ${d.properties.place || "Desconocida"}<br>
         <strong>Magnitud:</strong> ${d.properties.mag}<br>
         <strong>Profundidad:</strong> ${d.geometry.coordinates[2]} km<br>
         <strong>Fecha:</strong> ${new Date(d.properties.time).toLocaleString()}
       `);
     })
     .on("mouseout", function() {
       d3.select(this).attr("stroke", "none");

       // Limpiar el contenido del div de información
       infoBox.html("<p>Pasa el ratón sobre un punto para ver la información del terremoto.</p>");
     });
}
