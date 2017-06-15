db.order_products__prior.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: {
				order_id: {$lt: 100000}
			}
		},

		// Stage 2
		{
			$lookup: {
			    "from" : "products",
			    "localField" : "product_id",
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
			$group: {
			   _id : '$products.aisle_id', count : {$sum : 1}
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
			    "from" : "aisles",
			    "localField" : "_id",
			    "foreignField" : "aisle_id",
			    "as" : "aisles"
			}
		},

		// Stage 8
		{
			$unwind: {
			    path : "$aisles"
			}
		},

		// Stage 9
		{
			$project: {
			    _id:0,
			    aisle: "$aisles.aisle",
			    "count":1
			}
		},
	],

	// Options
	{
		cursor: {
			batchSize: 50
		}
	}

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
