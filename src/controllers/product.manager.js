import fs from 'fs'

const pathToFile = './src/data/products.json'

class ProductManager{

    create = async (producto) => {
    try {
      if (fs.existsSync(pathToFile)) {
        let data = await fs.promises.readFile(pathToFile, 'utf-8')
        let products = JSON.parse(data) 
        let id = products[products.length-1].id+1
        producto = {
          id, 
          timestamp : new Date().toLocaleString(),
          ...producto
        }
        products.push(producto)
        await fs.promises.writeFile(pathToFile, JSON.stringify(products, null, 2))
        return producto
      } else {
        let id = 1
        producto = {
          id, 
          timestamp : new Date().toLocaleString(),
          ...producto
        }
        await fs.promises.writeFile(pathToFile, JSON.stringify([producto], null, 2))
        return [producto]
      }
    } catch(err) {
       return {status: "error", message: err.message}
    }
  } 

findAll = async () => {
    if (!fs.existsSync(pathToFile)) return {error: 0, descripcion: 'No existe la Base de Datos'}
    let data = await fs.promises.readFile(pathToFile, 'utf-8')
    return JSON.parse(data)
}

findById = async (id) => {
    if (!fs.existsSync(pathToFile)) return {error: 0, descripcion: 'No existe la Base de Datos'}
    let data = await fs.promises.readFile(pathToFile, 'utf-8')
    let products = JSON.parse(data)
    id = parseInt(id)
    let product = products.find(item => item.id === id)
    if (!product) return {error: 0, descripcion: 'Producto no encontrado'}
    return product
}

delete = async (id) => {
    id = parseInt(id)
    if (fs.existsSync(pathToFile)) {
        let isFound = false
        let data = await fs.promises.readFile(pathToFile, 'utf-8')
        let products = JSON.parse(data)
        let newProducts = products.filter( item => item.id !== id)
        if (products.length !== newProducts.length) isFound = true
        if (!isFound) return {error: 0, descripcion: 'Producto no encontrado'}
        await fs.promises.writeFile(pathToFile, JSON.stringify(newProducts, null, 2))
        return newProducts
        } else {
            return {error: 0, descripcion: 'No existe la Base de Datos'}
        }
    }

update = async (id, product) => {
    if (!fs.existsSync(pathToFile)) return {error: 0, descripcion: "No existe la Base de Datos"}
    let data = await fs.promises.readFile(pathToFile, 'utf-8')
    let productos = JSON.parse(data)
    id = parseInt(id)
    let newProducts = productos.map(item => {
      if (item.id === id) {
        return {
          id, 
          ...product
        }
      } else return item
    })
    productos = newProducts
    await fs.promises.writeFile(pathToFile, JSON.stringify(productos, null, 2))
    return productos.find(item => item.id === id)
  }

}

export default ProductManager