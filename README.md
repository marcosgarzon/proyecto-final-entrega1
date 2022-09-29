# ENDPOINTS PRODUCTOS

### *POST http://localhost:8080/api/productos*

Body/Json:


{  
  "nombre": "Cálculadora",  
  "descripcion": "Cálculadora científica con pantalla solar",  
  "codigo": "A001",  
  "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png",  
  "precio": 150,  
  "stock": 33  
}

### *GET http://localhost8080/api/productos/*  

### *GET http://localhost8080/api/productos/1*  (dónde 1 es el id de producto a buscar)  

### *PUT http://localhost:8080/api/productos/1 (dónde 1 es el id del producto a modificar)*
  
Body/Json:  
{  
  "nombre": "Cálculadora",  
  "descripcion": "Cálculadora científica con pantalla solar",  
  "codigo": "A001",  
  "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png",  
  "precio": 150,  
  "stock": 33  
}  

### *DELETE http://localhost:8080/api/productos/1* (dónde 1 es el id del producto a borrar)  

# ENDPOINTS CARRITO  
  
### POST http://localhost:8080/api/carrito
  
Body/Json:
{  
  "productos": [  
    {  
      "id": 1,  
      "nombre": "Cálculadora",  
      "descripcion": "Cálculadora científica con pantalla solar, MANZANA",  
      "codigo": "A003",  
      "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png",  
      "precio": 9500,  
      "stock": 10  
    }  
  ]  
}  
  
### POST http://localhost:8080/api/carrito/1/productos (dónde 1 es el número de id del carrito en el que se ingresará el producto)

{  
  "id": 1,  
  "nombre": "Cálculadora",  
  "descripcion": "Cálculadora científica con pantalla solar, MANZANA",  
  "codigo": "A003",  
  "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png",  
  "precio": 9500,  
      "stock": 10  
}  

### DELETE http://localhost:8080/api/carrito/1 (dónde 1 es el id de carrito a borrar)  
  
### GET http://localhost:8080/api/carrito/1/productos (dónde 1 es el id de carrito en el que buscará los productos)  

### DELETE http://localhost:8080/api/carrito/1/productos/2 (dónde 1 es el id del carrito y 2 el id del producto a borrar)
