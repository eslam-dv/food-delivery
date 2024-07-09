const PageHeader = () => {
  return (
    <section className="h-[38vw] lg:h-[34vw] my-[30px] mx-auto bg-header-img bg-no-repeat bg-cover relative">
      <div className="absolute flex flex-col items-start gap-[1.5vw] lg:max-w-[50%] max-w-[65%] bottom-[10%] left-[6vw] animate-fadeIn">
        <h2 className="font-medium text-white text-[max(4.5vw,_22px)]">Order your favourite food here</h2>
        <p className="text-white text-[1vw] hidden md:block">
          Chose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satify your cravings and elevate your dining experience,
          one delicious meal at a time.
        </p>
        <button className="text-[#747474] text-[max(1vw,_13px)] rounded-[50px] font-medium py-[2vw] px-[4vw] md:py-[1vw] md:px-[2.3vw] bg-white">View Menu</button>
      </div>
    </section>
  );
};

export default PageHeader;
