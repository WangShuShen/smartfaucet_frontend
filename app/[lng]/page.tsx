import Navbar from "./component/Navbar";
import Title from "./component/Title";
import BackButton from "./component/BackButton";

export default function Home_Page() {
  return (
    <>
      <div className="bg-bg-gradient">
        <Navbar></Navbar>
        <div className="flex justify-between items-center">
          <Title text="專案設定" />
          <BackButton />
        </div>
      </div>
    </>
  );
}
