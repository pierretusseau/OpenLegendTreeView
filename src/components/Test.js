import React, { Component } from 'react';



class Test extends Component {


	render() {
			const storeB = [
			{
				id :				0,
				name :			"Product 1",
				quantity : 	0
			},
			{
				id :				1,
				name :			"Product 2",
				quantity : 	1
			}
		]
		function dispatch(action) {
			console.log(action)
		}
		function Product(props) {
			return (
				<div>
					<h2>{props.name}</h2>
					<p>Quantity : {props.quantity}</p>
					<button onlick={()=>dispatch('ADD_TO_CART')}>Add to cart</button>
				</div>
			)
		}
		return (
			<button onClick={() => dispatch('ADD_TO_CART')} >Click me</button>
			{ storeB.products.map((product)=>(
				<Product
					name={product.name}
					quantity={product.quantity}
					id={product.id}
				/>
			))}
		);
	}
}

export default Test;
