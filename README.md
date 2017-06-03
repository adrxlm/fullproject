# Mongo, API y React App

Gracias a __docker-compose__ podemos definir una serie de contenedores a ser levantados. Docker-compose también nos permite establecer una serie de reglas para que nuestros contenedores se levanten en el orden correcto y cumpliendo las condiciones necesarias para que todo funcione.

## Modo de uso (usando docker)

### Instalar docker-compose
```bash
sudo bash install-docker-compose.sh
```

### Levantar contenedores
```bash
docker-compose up -d
```

## A tener en cuenta

LOS PUERTOS __3000__, __3500__ Y __27017__ deben estar disponibles.

## Modo de uso (SIN docker)

* Instalar mongo

* Instalar nodejs v 6.10

* Editar el archivo __/etc/hosts__ y agregar la siguiente línea __127.0.0.1	fullproject_mongodb_1__

* Correr API __npm start__

* Correr APP __npm start__

