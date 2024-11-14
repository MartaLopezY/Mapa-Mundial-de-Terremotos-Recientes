# Mapa Mundial de Terremotos Recientes
Este proyecto visualiza datos recientes de terremotos alrededor del mundo utilizando un mapa interactivo. Los datos se obtienen en tiempo real de la API de USGS (Servicio Geológico de los Estados Unidos) y se representan en un mapa mundial con puntos de diferentes tamaños y colores. El tamaño del punto depende de la magnitud del terremoto, mientras que el color indica su profundidad. Al pasar el ratón sobre cada punto, se muestra la información detallada del terremoto en un contenedor debajo del mapa. Este proyecto utiliza JavaScript, D3.js para la visualización de datos, Bootstrap para el diseño básico, y TopoJSON para el renderizado del mapa mundial.
## 🛠️ Tecnologías Utilizadas

- **JavaScript** para la lógica del cliente
- **D3.js** para la visualización de datos
- **Bootstrap** para el diseño
- **TopoJSON** para el renderizado del mapa mundial
- **API de USGS** para obtener los datos de terremotos
- ## 📈 Características

- **Visualización Interactiva:** Los puntos en el mapa representan terremotos, donde el tamaño indica la magnitud y el color representa la profundidad.
- **Actualización en Tiempo Real:** La aplicación obtiene los datos de terremotos más recientes en tiempo real de la API de USGS.
- **Información Detallada:** Al pasar el ratón sobre un punto, se muestran los detalles del terremoto en un contenedor debajo del mapa.
- **Mapa Mundial:** El mapa utiliza proyección `Natural Earth` para una representación clara de todos los continentes.
