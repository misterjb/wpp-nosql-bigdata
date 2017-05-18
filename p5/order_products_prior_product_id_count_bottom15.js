db.order_products__prior.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$group: {
			   _id : '$product_id', count : {$sum : 1}
			}
		},

		// Stage 2
		{
			$lookup: {
			    "from" : "products",
			    "localField" : "_id",
			    "foreignField" : "product_id",
			    "as" : "products"
			}
		},

		// Stage 3
		{
			$unwind: {
			    path : "$products"
			}
		},

		// Stage 4
		{
			$lookup: {
			    "from" : "aisles",
			    "localField" : "products.aisle_id",
			    "foreignField" : "aisle_id",
			    "as" : "aisles"
			}
		},

		// Stage 5
		{
			$unwind: {
			    path : "$aisles"
			}
		},

		// Stage 6
		{
			$lookup: {
			    "from" : "departments",
			    "localField" : "products.department_id",
			    "foreignField" : "department_id",
			    "as" : "departments"
			}
		},

		// Stage 7
		{
			$unwind: {
			    path : "$departments" 
			}
		},

		// Stage 8
		{
			$limit: 15
		},

		// Stage 9
		{
			$project: {
			      _id:0,
			    product: "$products.product_name",
			    aisle: "$aisles.aisle",
			    department: "$departments.department",
			    "count":1
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
