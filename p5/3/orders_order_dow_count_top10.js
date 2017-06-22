db.orders.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$group: {
			   _id : '$order_dow', count : {$sum : 1}
			}
		},

		// Stage 2
		{
			$sort: {
				count: -1
			}
		},

		// Stage 3
		{
			$limit: 10
		},

	]


);
