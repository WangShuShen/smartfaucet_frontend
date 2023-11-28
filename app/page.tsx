import Image from "next/image";
import Navbar from "./component/Navbar";
export default function Home() {
  return (
    <div
      // style={{
      //   backgroundImage:
      //     "linear-gradient(to bottom, #0ea5e9, #0e71a8, #0c659e)",
      // }}
      className="bg-bg-gradient"
    >
      <Navbar></Navbar>
    </div>
  );
}
