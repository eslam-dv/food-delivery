import { useState, useEffect } from "react";
import axios from "axios";

import { assets, url } from "../assets/assets";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/v1/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <section className="w-[70%] ml-[max(5vw,_25px)] mt-[50px] text-[#6d6d6d] text-[16px]">
      <form className="flex flex-col gap-[20px]" onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-[10px]">
          <p>Upload Image</p>
          <label className="w-fit" htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="uplpoad area"
              className="w-[120px] cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="flex flex-col gap-[10px] w-[max(40%,_280px)]">
          <p>Product Name</p>
          <input
            className="p-[10px] border border-1"
            type="text"
            name="name"
            placeholder="Product name..."
            required
            onChange={onChangeHandler}
            value={data.name}
          />
        </div>
        <div className="flex flex-col gap-[10px] w-[max(40%,_280px)]">
          <p>Product Description</p>
          <textarea
            className="p-[10px] border border-1"
            name="description"
            rows={6}
            placeholder="Product descriptoin..."
            required
            onChange={onChangeHandler}
            value={data.description}
          ></textarea>
        </div>
        <div className="flex gap-[30px]">
          <div className="flex flex-col gap-[10px]">
            <p>Product Category</p>
            <select
              className="max-w-[120px] p-[10px]"
              name="category"
              required
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="flex flex-col gap-[10px]">
            <p>Product Price</p>
            <input
              className="max-w-[120px] p-[10px] border border-1"
              type="number"
              name="price"
              placeholder="Price..."
              required
              onChange={onChangeHandler}
              value={data.price}
            />
          </div>
        </div>
        <button
          className="max-w-[120px] p-[10px] bg-black text-white"
          type="submit"
        >
          ADD
        </button>
      </form>
    </section>
  );
};

export default Add;
