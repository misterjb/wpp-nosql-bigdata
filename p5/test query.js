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

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
