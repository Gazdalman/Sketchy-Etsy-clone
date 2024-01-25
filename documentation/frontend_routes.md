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


## Landing page
Landing page displays the business logo and button that will redirect the user to the home page
* `GET /`


## Home page
### `/home`
Home page  displays all products as well as a navigation bar with login/signup or logout buttons.
* `GET /home` (logged-in)


<!-- ## Products (by categories) page
## `/category/products`
Product page displays all the products arranged by their categories
* `GET /products/:category` (add pagination) -->


## Product detail page
## `/products/:id`
This page displays a product’s details as well as its reviews.
* `GET /product/:id`


## Shopping cart page
## `/cart`
This page displays list of items  the user is going to purchase
* `GET /cart`


## Wish-list page
### `/users/:id/wishlist`
This page displays list of items the user has added to their wishlist
* `GET /users/:id/wishlist`


## Profile page
### `/profile/:id`
This page displays information about the user
* `GET /profile/:id`

## (Profile page) product page
### `/profile/:id`
The page is nested under profile page. The page displays all the products owned by the logged-in user
* `GET /profile/:id`

## (Profile page) review page
### `/profile/:id (reviews)`
The page is nested under profile page. The page displays all the reviews the user has made
* `GET /profile/:id`


## (Profile page) wish-list page
### `/profile/:id`
The page is nested under profile page. The page displays list of items the user has added to their wishlist
* `GET /profile/:id`


## (Profile page) past-order page
### `/profile/:id`
The page is nested under profile page. This page displays all of the product the logged-in user has purchased in the past
* `GET /profile/:id`

## Edit Profile
### `/editAccount`
This page displays a form to edit user profile
* `GET /editAccount`
* `POST /editAccount`


## Edit Product
### `/products/:id/edit`
This page displays a form to edit a product owned by the logged-in user
* `GET /editAccount`
* `POST /editAccount`


## Edit Review
### `/reviews/:id/edit`
This page displays a form to edit a review owned by the logged-in user
* `GET /reviews/:id/edit`
* `PUT /reviews/:id/edit`



## New Product page
### `/new_product`
This page displys a form to create a new product
* `GET /new_product`
* `POST /new_product`
