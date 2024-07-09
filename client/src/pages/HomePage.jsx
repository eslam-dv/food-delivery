import { useState } from "react";
import Categorys from "../components/Categorys";
import PageHeader from "../components/PageHeader";
import MenuItems from "../components/MenuItems";
import DownloadApp from "../components/DownloadApp";

const HomePage = () => {
  const [category, setCategory] = useState("All");

  return (
    <main className="container mx-auto px-5 md:px-0">
      <PageHeader />
      <Categorys category={category} setCategory={setCategory} />
      <MenuItems category={category} />
      <DownloadApp />
    </main>
  );
};

export default HomePage;
