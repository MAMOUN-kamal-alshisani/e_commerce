const express = require('express')
const FavItemsRoute = express.Router()
const {
    getFavItems,
    getUserFavItems,
    getItemsCountInFav,
    createFavItems,
    getUserFavItemsIds,
    deleteFavoriteProducts,
    deleteFavProducts
} = require('../controllers/favItemsFn')

FavItemsRoute.get('/fav',getFavItems)
FavItemsRoute.get('/fav/user/:userId',getUserFavItems)
FavItemsRoute.get('/fav/productsId/:userId',getUserFavItemsIds)

FavItemsRoute.get('/fav/count/:userId',getItemsCountInFav)
FavItemsRoute.post('/fav/:userId',createFavItems)


FavItemsRoute.delete('/fav/:userId/:id',deleteFavoriteProducts)
FavItemsRoute.delete('/fav/:userId',deleteFavProducts)
module.exports = FavItemsRoute