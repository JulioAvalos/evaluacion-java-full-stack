# Media App - (Evaluacion Tipo B | Java Full Stack Developer)

### Proyecto incluye lo siguiente:

- Capa frontend mostrando la funcionalidad del aplicativo 
- Capa backend que contiene el servicio restful para la logica de negocio y conexion a la base de datos

### Consideraciones:

- Se ha modificado el modulo jwt del archivo **app.module.ts** para apuntar al **localhost:8080** y aceptar peticiones del backend
- Se ha agregado archivo **data.sql**, con el script que se utilizo para desarrollar y hacerle pruebas a la aplicacion
- Se agrego opcionalmente, un archivo **docker-compose.yml** para levantar base de datos postgres, sin tener que instalarla en equipo donde se desarrollara/revisara la app

###  Instrucciones para levantar el monolito:

1. En la carpeta **mediaapp-backend**, modificar las propiedades de conexion a la base desde el archivo **aplication.properties**
2. Limpiar el proyecto con `mvn clean` y correrlo con `mvn spring-boot:run`
3. En la carpeta **mediapp-frontend**, ejecutar el comando `npm install` 
4. Modificar modulo jwt en **app.module.ts**, para que apunte al backend `(por ej: localhost:8080 o localhost:8081, ect)`
5. Ejecutar desde la terminal el comando `ng serve --o`

