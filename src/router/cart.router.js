import express from 'express'
import Manager from '../controllers/cart.manager.js'
const router = express.Router()
const manager = new Manager()

router.post('/', (req, res) => {
    if (!req.body.productos) return res.send({error: 0, descripcion: 'Faltan datos obligatorios'})
    manager.createCart(req.body)
        .then(result => res.send(result))
        .catch(err => res.send({error: 0, descripcion: err}))
} )

router.delete('/:id', (req, res) => {
    if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} método ${req.method} no implementada`})
    manager.delete(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.send({error:0, descripcion: err}))
})

router.delete('/:id/productos/:id_prod', (req, res) => {
    if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} método ${req.method} no implementada`})
    if (isNaN(req.params.id_prod)) return res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} método ${req.method} no implementada`})
    manager.deleteProductInCart(req.params.id, req.params.id_prod)
        .then(result => res.send(result))
        .catch(err => res.send({error: 0, descripcion: err}))
})

router.get('/:id/productos', (req, res) => {
    if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} método ${req.method} no implementada`})
    manager.findById(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.send({error: 0, descripcion: err}))
})

router.post('/:id/productos', (req, res) => {
    if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} método ${req.method} no implementada`})
    if (!req.body.id || !req.body.nombre || !req.body.descripcion || !req.body.codigo || !req.body.foto || !req.body.precio || !req.body.stock ) return res.send({error: 0, descripcion: 'Faltan datos obligatorios'})
        manager.createProductInCart(req.params.id, req.body)
        .then(result => res.send(result))
        .catch(err => res.send({error: 0, descripcion: err}))
})


export default router

































