import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const DownloadApp = () => {
  return (
    <section className="mt-[100px] mx-auto text-[max(3vw,_20px)] text-center font-medium" id="download-app">
      <p>
        For a better experience download <br /> Tomato App
      </p>
      <div className="flex gap-[max(2vw,_10px)] justify-center mt-[40px]">
        <Link to="#">
          <img
            className="w-[max(30vw,_120px) max-w-[180px]] transition duration-[0.5s] hover:scale-105"
            src={assets.play_store}
            alt="Play Store"
          />
        </Link>
        <Link to="#">
          <img
            className="w-[max(30vw,_120px) max-w-[180px]] transition duration-[0.5s] hover:scale-105"
            src={assets.app_store}
            alt="Play Store"
          />
        </Link>
      </div>
    </section>
  );
};

export default DownloadApp;
