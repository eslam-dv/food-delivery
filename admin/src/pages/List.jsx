import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../assets/assets";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/v1/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/v1/food/remove`, {
      id: foodId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error("Error!")
    }
  };

  return (
    <section className="w-[70%] ml-[max(5vw,_25px)] mt-[50px] text-[#6d6d6d] text-[16px] flex flex-col gap-[10px]">
      <p>Available Food List</p>
      <div className="overflow-x-scroll">
        <table className="w-full">
          <thead className="border-b bg-[#f9f9f9]">
            <tr>
              <th className="py-[12px] px-[15px] text-[13px] text-start">
                Image
              </th>
              <th className="py-[12px] px-[15px] text-[13px]">Name</th>
              <th className="py-[12px] px-[15px] text-[13px]">Category</th>
              <th className="py-[12px] px-[15px] text-[13px]">Price</th>
              <th className="py-[12px] px-[15px] text-[13px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => {
              return (
                <tr key={index} className="border-b">
                  <td className="p-[10px]">
                    <img
                      className="w-[100px]"
                      src={`${url}/images/${item.image}`}
                      alt="Item Image"
                    />
                  </td>
                  <td className="text-center p-[10px]">
                    <p>{item.name}</p>
                  </td>
                  <td className="text-center p-[10px]">
                    <p>{item.category}</p>
                  </td>
                  <td className="text-center p-[10px]">
                    <p>${item.price}</p>
                  </td>
                  <td className="text-center p-[10px]">
                    <p
                      className="cursor-pointer"
                      onClick={() => removeFood(item._id)}
                    >
                      X
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default List;
