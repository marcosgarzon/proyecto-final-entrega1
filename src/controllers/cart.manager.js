import fs from 'fs'

const pathToFile = './src/data/cart.json'

class CartManager{

    createCart = async (product) => {
    try {
    let id = 1
if (fs.existsSync(pathToFile)) {
    let data = await fs.promises.readFile(pathToFile, 'utf-8')
    let products = JSON.parse(data)
    if (products.length > 0) id = products[products.length-1].id+1
    product = {
    id,
    timestamp: new Date().toLocaleString(),
    ...product
}
    await fs.promises.writeFile(pathToFile, JSON.stringify([product], null, 2))
}
    return product
} catch(err) {    
    return {error: 0, descripcion: 'Error al acceder a la Base de Datos'}
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
   
    


update = async (id, updatedProduct) => {
    id = parseInt(id)
    if (fs.existsSync(pathToFile)) {
        let isFound = false
        let data = await fs.promises.readFile(pathToFile, 'utf-8')
        let products = JSON.parse(data)
        let newProducts = products.map(item => {
	    if (item.id === id) {
		    isFound = true
		    return {
		    	id, 
		    	...updatedProduct
		    	}
	    } else return item
})
if (!isFound) return {error: 0, descripcion: 'Producto no encontrado'}
await fs.promises.writeFile(pathToFile, JSON.stringify(newProducts, null, 2))
return newProducts.find(item => item.id === id)
} else {
    return {error: 0, descripcion: 'No existe la Base de Datos'}
}
}

}

export default CartManager