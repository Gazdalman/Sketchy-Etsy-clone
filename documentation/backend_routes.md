Backend Routes

# SKETCHY ETSY

# User Authentification

Route that verifies users existence

### `GET /api/auth/`

# Login

Route to log in a user

### `POST /api/auth/login`

# Sign Up

Route to sign up a user

### `POST /api/auth/signup`

# Log out

Route to log out a user

### `GET /api/auth/logout`

# Home Page

Route to get to Sketchy Etsy Home Page

### `GET /api/auth/`

# Products

Route to see all the Products

### `GET /api/products/`

# Product Details

Route to see specific Products

### `GET /api/products/<int:id>`

# Product List by User

Route to see all of a specific users products

### `GET /api/products/user/<int:id>`

# Product Creation

Route to create a product post

### `POST /api/products/form`

# Delete a Product

Route to delete a product post

### `DELETE /api/products/<int:id>`

# Edit a Product Post

Route to edit an existing Product post

### `PUT /api/products/<int:id>/edit`

# Delete a Product Image

Route to delete a specific image on a post

### `DELETE /api/products/images/<int:id>`

# Add a Product Image

Route to add a product image to a product post

### `POST /api/products/<int:id>/images`

# Review list for a Product

Route to view all reviews for a product

### `GET /api/reviews/<int:productId>`

# Review list for a User

Route to view all reviews by a user

### `GET /api/reviews/<int:id>/reviews`

# Create a Review

Route to create a review for a post

### `POST /api/reviews/<int:productId>/new`

# Edit a Review

Route to edit a review current user made

### `PUT /api/reviews/<int:id>/edit`

# Delete a Review

Route to delete a review made by the current user

### `DELETE /api/reviews/<int:id>/delete`

# All user orders

Route to get all user orders

### `GET /api/orders/`

# Get Specific Order Details

Route to get a specific order placed by the user

### `GET /api/orders/<int:id>`

# Place a New Order

Route to place a new order

### `POST /api/orders/place`

# Shopping Cart

Route to get the current users shopping cart

### `GET /api/cart/`

# Add to Shopping Cart

Route to add an item to the cart

### `POST /apo/cart/<int:id>`

# Delete an item from Shopping Cart

Route to delete an item from the shopping cart

### `/api/cart/product/<int:id>`

# Change the quantity in Shopping Cart

Route to update an items quantity in the shopping cart

### `PUT /api/cart/<string:change>/<int:itemId>`

# List of Users

Route to query for all users and return them in a dictionary

### `GET /api/users/`

# Get specific User

Route to query for a specific user by id

### `GET /api/users/<int:id>`

# Delete a User

Route to delete a user

### `DELETE /api/users/`

# Create a User

Route to create a user

### `POST /api/users/<int:id>`

# Wish List

Route to retrieve wishlist of current user

### `GET /api/wishlist/`

# Add product to the current users Wish list

Route to add an item to the current users wish list

### `POST /api/wishlist/add-wish/<int:id>`

# Delete from wishlist

Route to delete an item from the current users wish list

### `DELETE /api/delete-wish/<int:id>`
