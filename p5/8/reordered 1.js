db.order_products__prior.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: {
				reordered: 1
			}
		},

		// Stage 2
		{
			$group: {
			   _id : '$product_id', count : {$sum : 1}
			}
		},

		// Stage 3
		{
			$sort: {
			    count: -1
			}
		},

		// Stage 4
		{
			$lookup: {
			    "from" : "products",
			    "localField" : "_id",
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
			$limit: 25
		},

		// Stage 11
		{
			$project: {
			    _id:0,
			    id: "$products.product_id",
			    name: "$products.product_name",
			    aisle: "$aisles.aisle",
			    department: "$departments.department",
			    "count":1
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
