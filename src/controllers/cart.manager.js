import fs from 'fs'
const pathToFile = './src/data/cart.json'

class CartManager{

createCart = async (newCart) => {
    try {
      if (fs.existsSync(pathToFile)) {
        let data = await fs.promises.readFile(pathToFile, 'utf-8')
        let carts = JSON.parse(data)
        let id = carts[carts.length-1].id+1
        newCart = {
          id,
          timestamp : new Date().toLocaleString(),
          ...newCart
        }
        carts.push(newCart)
        await fs.promises.writeFile(pathToFile, JSON.stringify(carts, null, 2))
        return newCart
      } else {
        let id = 1
        newCart = {
          id, 
          timestamp : new Date().toLocaleString(),
          ...newCart
        }
        await fs.promises.writeFile(pathToFile, JSON.stringify([newCart], null, 2))
        return [newCart]
      }
    } catch (err) {
      return {status: "error", message: err.message}
    }
  }

 deleteCart = async (id) => {
    id = parseInt(id)
    if (fs.existsSync(pathToFile)) {
        let isFound = false
        let data = await fs.promises.readFile(pathToFile, 'utf-8')
        let products = JSON.parse(data)
        let newProducts = products.filter( item => item.id !== id)
        if (products.length !== newProducts.length) isFound = true
        if (!isFound) return {error: 0, descripcion: 'Carrito no encontrado'}
        await fs.promises.writeFile(pathToFile, JSON.stringify(newProducts, null, 2))
        return newProducts
        } else {
            return {error: 0, descripcion: 'No existe la Base de Datos'}
        }
    }

  deleteCartProduct = async (id, id_prod) => {
    if (!fs.existsSync(pathToFile)) return {error: 0, descripcion: "No existe la Base de Datos"}
    let data = await fs.promises.readFile(pathToFile, 'utf-8')
    let carts = JSON.parse(data)
    let cart = carts.find(item => item.id === parseInt(id))
    if (!cart) return {error: 0, descripcion: "carrito no encontrado"}
    if (!cart.productos.find(item => item.id === parseInt(id_prod))) return {error: 0, descripcion: "producto no encontrado en carrito"}
    let newProducts = cart.productos.filter(item => item.id !== parseInt(id_prod))
    cart.productos = newProducts
    await fs.promises.writeFile(pathToFile, JSON.stringify(carts, null, 2))
    return carts
  }

  findCartById = async (id) => {
    if (!fs.existsSync(pathToFile)) return {error: 0, descripcion: "No existe la Base de Datos"}
    let data = await fs.promises.readFile(pathToFile, 'utf-8')
    let carts = JSON.parse(data)
    id = parseInt(id)
    let cart = carts.find(item => item.id === id)
    if (!cart) return {error: 0, descripcion:"carrito no encontrado"}
    return cart.productos
  } 

  updateCart = async (id, newProduct) => {
    if (!fs.existsSync(pathToFile)) return {error: 0, descripcion: "No existe la Base de Datos"}
    let data = await fs.promises.readFile(pathToFile, 'utf-8')
    let carts = JSON.parse(data)
    id = parseInt(id)
    let cart = carts.find(item => item.id === parseInt(id))
    if (!cart) return {error: 0, descripcion:"carrito no encontrado"}
    cart.productos.push(newProduct)
    await fs.promises.writeFile(pathToFile, JSON.stringify(carts, null, 2))
    return cart
  }
}



export default CartManager