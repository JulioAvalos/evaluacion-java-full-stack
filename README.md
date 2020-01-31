# Ventas Web APP

### Proyecto incluye lo siguiente:

* Capa frontend mostrando la funcionalidad del aplicativo 
    - se ha modificado el modulo jwt del archivo app.module.ts para apuntar al localhost:8080, para aceptar peticiones del backend
* Capa backend que contiene el servicio restful para la logica de negocio y conexion a la base de datos

Se ha agregado archivo data.sql, con el script que se utilizo para desarrollar y hacerle pruebas a la aplicacion
Se agrego opcionalmente, un archivo docker-compose.yml para levantar base de datos postgres, sin tener que instalarla en equipo donde se desarrollara/revisara la app

######Instrucciones para levantar el monolito:

1. en la carpeta mediaapp-backend, modificar las propiedades de conexion a la base
2. limpiar el proyecto con `mvn clean` y correrlo con `mvn spring-boot:run`
3. en la carpeta mediapp-frontend, ejecutar el comando `npm install` 
4. modificar el modulo jwt para que apunte a la direccion localhost del backend `(por ej: localhost:8080 o localhost:8081, ect)`
5. ejecutar desde la terminal el comando `ng serve --o`




