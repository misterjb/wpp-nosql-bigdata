db.orders.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$group: {
			   _id : '$order_hour_of_day', count : {$sum : 1}
			}
		},

		// Stage 2
		{
			$sort: {
			    count: 1
			}
		},

	]


);
