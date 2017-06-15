db.orders.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: {
			    "user_id" : 1
			}
		},

		// Stage 2
		{
			$lookup: {
			    "from" : "order_products__prior",
			    "localField" : "order_id",
			    "foreignField" : "order_id",
			    "as" : "prior"
			}
		},

		// Stage 3
		{
			$unwind: {
			    path : "$prior" 
			}
		},

		// Stage 4
		{
			$lookup: {
			    "from" : "products",
			    "localField" : "prior.product_id",
			    "foreignField" : "product_id",
			    "as" : "products"
			}
		},

		// Stage 5
		{
			$unwind: {
			    path : "$products" 
			}
		},

		// Stage 6
		{
			$lookup: {
			    "from" : "aisles",
			    "localField" : "products.aisle_id",
			    "foreignField" : "aisle_id",
			    "as" : "aisles"
			}
		},

		// Stage 7
		{
			$unwind: {
			    path : "$aisles" 
			}
		},

		// Stage 8
		{
			$lookup: {
			    "from" : "departments",
			    "localField" : "products.department_id",
			    "foreignField" : "department_id",
			    "as" : "departments"
			}
		},

		// Stage 9
		{
			$unwind: {
			    path : "$departments" 
			}
		},

		// Stage 10
		{
			$project: {
				_id:0,
				order_id:1,
				order_number:1,
				order_dow:1,
				order_hour_of_day:1,
			    cart_order:"$prior.add_to_cart_order",
			    product_id: "$products.product_id",
			    product_name: "$products.product_name",
			    aisle: "$aisles.aisle",
			    department: "$departments.department"
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
