Backend Routes

# SKETCHY ETSY

# User Authentification

Route that verifies users existence

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

# Shopping Cart

# Wish List

# Past Orders
