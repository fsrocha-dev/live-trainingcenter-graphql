const graphql = require('graphql')
const cars = require('./cars.json')

let mechanicType = new graphql.GraphQLObjectType({
	name:'mechanic',
	fields: {
		motor: { type: graphql.GraphQLString },
		gearshift: { type: graphql.GraphQLString }
	}
})

let carType = new graphql.GraphQLObjectType({
  name: 'Car',
	fields: {
		id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
		name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
		doors: { type: graphql.GraphQLInt },
		photo: { type: graphql.GraphQLString },
		price: { type: graphql.GraphQLString },
		manufacture: { type: graphql.GraphQLString },
		type: { type: graphql.GraphQLString },
		mechanic: { type: new graphql.GraphQLList(mechanicType) }
	}
})

let schema = new graphql.GraphQLSchema({
	query: new graphql.GraphQLObjectType({
	    	name: 'Query',
	    	fields: {
					car: {
						type: carType,
						args: {
							id:{
								type: graphql.GraphQLInt
							}
						},
						resolve: function (_ , args) {
							let response = cars.find(function (car){
								return (car.id === args.id)
							})
							return response
						}
					},
					cars: {
						type: new graphql.GraphQLList(carType),
						resolve: function (_ , args) {
							return cars
						}
					}
		}
	})
})

module.exports = schema