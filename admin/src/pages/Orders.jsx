import axios from "axios";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { url, assets } from "../assets/assets";

const Orders = () => {
	const [orders, setOrders] = useState([]);

	const fetchOrders = async () => {
		const response = await axios.get(`${url}/api/v1/order/getorders`);
		if (response.data.success) {
			setOrders(response.data.data);
		} else {
			toast.error("Error loading orders");
		}
	};

	const statusHandler = async (e, orderId) => {
		const response = await axios.post(`${url}/api/v1/order/status`, {
			orderId,
			status: e.target.value,
		});
		if (response.data.success) {
			await fetchOrders();
		}
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	return (
		<main className="w-[70%] ml-[max(5vw,_25px)] mt-[50px]">
			<h2 className="text-xl">Orders</h2>
			<div>
				{orders.map((order, index) => (
					<div
						key={index}
						className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-[30px] border border-red-500 p-[20px] my-[30px] mx-0 text-[14px] text-[#505050] max-[1000px]:text-[12px] max-[1000px]:grid-cols-[0.5fr_2fr_1fr] max-[1000px]:py-[15px] max-[1000px]:px-[8px]"
					>
						<img
							src={assets.parcel_icon}
							alt=""
							className="max-[1000px]:w-[40px]"
						/>
						<div>
							<p className="font-semibold">
								{order.items.map((item, index) => {
									if (index === order.items.length - 1) {
										return `${item.name}x${item.quantity}`;
									}
									return `${item.name}x${item.quantity}, `;
								})}
							</p>
							<p className="font-semibold mt-[30px] mb-[5px]">
								{`${order.address.firstName} ${order.address.lastName}`}
							</p>
							<div className="mb-[10px]">
								<p>{order.address.street}, </p>
								<p>
									{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}
								</p>
							</div>
							<p>{order.address.phone}</p>
						</div>
						<p>Items: {order.items.length}</p>
						<p>${order.amount}</p>
						<select
							className="bg-[#ffe8e4] border border-red-500 w-[max(10vw,_120px)] p-[10px] outline-none max-[1000px]:p-[5px] max-[1000px]:text-[12px]"
							onChange={(e) => statusHandler(e, order._id)}
							value={order.status}
						>
							<option value="Food Proccessing">Food Proccessing</option>
							<option value="Out For Delivery">Out For Delivery</option>
							<option value="Delivered">Delivered</option>
						</select>
					</div>
				))}
			</div>
		</main>
	);
};

export default Orders;
