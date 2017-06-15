db.order_products__prior.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: {
				"product_id":16797
			}
		},

		// Stage 2
		{
			$lookup: {
			    "from" : "order_products__prior",
			    "localField" : "order_id",
			    "foreignField" : "order_id",
			    "as" : "orders"
			}
		},

		// Stage 3
		{
			$unwind: {
			    path : "$orders"
			}
		},

		// Stage 4
		{
			$group: {
			    _id : '$orders.product_id', count : {$sum : 1}
			}
		},

		// Stage 5
		{
			$sort: {
				count: -1
			}
		},

		// Stage 6
		{
			$limit: 10
		},

		// Stage 7
		{
			$lookup: {
			    "from" : "products",
			    "localField" : "_id",
			    "foreignField" : "product_id",
			    "as" : "products"
			}
		},

		// Stage 8
		{
			$unwind: {
			    path : "$products"
			}
		},

		// Stage 9
		{
			$project: {
			    _id:0,
			    name: "$products.product_name",
			    "count":1
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
