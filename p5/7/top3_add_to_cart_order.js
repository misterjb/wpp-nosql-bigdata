db.order_products__prior.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: {
			    add_to_cart_order : 3
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
			$limit: 10
		},

		// Stage 5
		{
			$lookup: {
			    "from" : "products",
			    "localField" : "_id",
			    "foreignField" : "product_id",
			    "as" : "products"
			}
		},

		// Stage 6
		{
			$unwind: {
			    path : "$products"
			}
		},

		// Stage 7
		{
			$project: {
			    _id:0,
			    id: "$products.product_id",
			    name: "$products.product_name",
			    "count":1
			}
		},

	]


);
