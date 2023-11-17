# **Database Schema**

## `users`

| column name | data type | details                   |
|-------------|-----------|---------------------------|
| id          | integer   | not null, primary key     |
| username    | string    | not null,                 |
| email       | string    | not null, indexed, unique |
| first_name  | string    | not null                  |
| last_name   | string    |                           |
| created_at  | datetime  | not null                  |
| updated_at  | datetime  | not null                  |

## `products`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| name        | string    | not null              |
| seller_id   | integer   | not null, foreign key |
| price       | float     | not null              |
| description | string    | not null              |
| created_at  | datetime  | not null              |
| updated_at  | datetime  | not null              |

* `seller_id` references `users` table

## `reviews`

| column name      | data type | details               |
|------------------|-----------|-----------------------|
| id               | integer   | not null, primary key |
| product_id       | integer   | not null, foreign key |
| user_id          | integer   | not null, foreign key |
| review           | string    | not null              |
| seller_commented | boolean   | not null              |
| created_at       | datetime  | not null              |
| updated_at       | datetime  | not null              |

* `user_id` references `users` table
* `product_id` references `products` table

## `wishlists`

| column name      | data type | details               |
|------------------|-----------|-----------------------|
| id               | integer   | not null, primary key |

## `orders`

| column name      | data type | details               |
|------------------|-----------|-----------------------|
| id               | integer   | not null, primary key |
| user_id          | integer   | not null, foreign key |
| order_details    | integer   | not null, foreign key |

* `user_id` references `users` table
* `order_details` references `order_products` table

## `order_products`

| column name      | data type | details               |
|------------------|-----------|-----------------------|
| id               | integer   | not null, primary key |
| order_id         | integer   | not null, foreign key |
| product_id       | integer   | not null, foreign key |

* `order_id` references `orders` table
* `product_id` references `products` table

## `carts`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| num_items   | integer   | not null              |
| owner_id    | integer   | not null, foreign key |

* `owner_id` references `users` table

## `cart_items`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| cart_id     | integer   | not null, foreign key |
| product_id  | integer   | not null, foreign key |

* `cart_id` references `carts` table
* `product_id` references `products` table
