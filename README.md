# BBVA Hackathon DataFahr
Repository of the BBVA Hackathon project - Team DataFahr

## Soluciones teorizadas
### Solución para transmisión de datos
Inicialmente se creó un código utilizando node.js para la transmisión de datos de la página web creando una conexión con un servicio de base de datos MySQL de Azure, con la intención de crear jobs que revisarán la base de datos de forma continua e hicieran operaciones sobre estos.

Posteriormente se optó por utiliza el servicio de Azure Event Hubs como conexión con la página web, registrando los eventos llevados a cabo dentro de esta. El JSON envíado a Event Hubs sería redirigido a Stream Analytics, proporcionando la posibilidad de hacerlo en tiempo real, en lugar de batches. Stream Analytics permite mandar un output, el cual se pasa a Synapse, de está formando permietiendo hacer el tratamiento de los datos en forma de pipelines.

### Solución para retargeting
Modificando la información obtenida del cliente se puede realizar segmentación y personalizar la forma de entablar comunicación con el cliente, tanto el canal de comunicación y frecuencia.

Implementación de chatbot de Azure dentro de la página web para brindar ayuda en el proceso de contratación

###¿Qué se logro?
- Transmisión de datos entre la página y la base de datos de Azure MySQL. No obstante este enfoque fue descartado para realizar una conexión con Azure Event Hubs, no fue completado.
