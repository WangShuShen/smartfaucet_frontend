import Navbar from "./component/Navbar";
import Title from './component/Title';
export default function Home_Page() {
  return (
    <>
      <div className="bg-bg-gradient">
        <Navbar></Navbar>
         <Title text="專案設定" />
      </div>
    </>
  );
}
