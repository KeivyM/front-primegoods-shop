# Pasos para ejecutar esta app:

## 1. Descarga este repo y el del backend:

```
git clone https://github.com/KeivyM/back-primegoods-shop.git
git clone https://github.com/KeivyM/front-primegoods-shop.git
```

## 2. Instala los paquetes en ambos repositorios:

#### (debes ubicarte desde una terminal en el directorio raiz de cada proyecto)

```
npm install
```

## 3. agregar variables de entorno:

#### deber renombrar el archivo '.env.example' a '.env' y pegar las variables de entorno

## 4. ejecuta el comando para levantar la aplicacion:

### en el backend:

```
npm run dev
```

### en el frontent:

```
npm run start
```

## 5. agregar productos a la base de datos (opcional):

### puedes crear en mongoCompass una coleccion llamada 'products' y importar el archivo 'products.json' que esta en la raiz del proyecto

</br>

## (El primer usuario registrado sera administrador, el cual tiene los privilegios de crear productos )

## requerimientos:

- tener instalado node
- tener instalado git
- tener instalado mongoCompass
