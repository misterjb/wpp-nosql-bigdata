db.orders.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: {
				'order_dow': 2
			}
		},

		// Stage 2
		{
			$group: {
			   _id : '$order_hour_of_day', count : {$sum : 1}
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
			$limit:  10
		},

	]


);
