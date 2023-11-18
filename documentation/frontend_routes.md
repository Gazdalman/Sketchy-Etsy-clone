# Skethcy-Etsy

# User-facing routes

## Login page
### `/login`
This page displays a log in form
* `GET /login`
* `POST /login`


## Sign up page
### `/signup`
This page displays a signup form.
* `GET /signup`
* `POST /signup`


## Home page
### `/home`
Home page  displays all products as well as a navigation bar with login/signup or logout buttons.
* `GET /`
* `GET /home` (logged-in)


## Products (by categories) page
## `/category/products`
Product page displays all the products arranged by their categories
* `GET /products/:category` (add pagination)



## Product detail page
## `/products/:id`
This page displays a product’s details as well as its reviews.
* `GET /product/:id`


## Shopping cart page
## `/cart`
This page displays list of items  the user is going to purchase
* `GET /cart`


## Wish-list page
### `/deities/:id/wishlist`
This page displays list of items for a future purchase
* `GET /deities/:id/wishlist`


## Past-order page
### `/deities/:id/orders`
This page displays all of the user’s the past purchase items
* `GET /deities/:id/orders`


