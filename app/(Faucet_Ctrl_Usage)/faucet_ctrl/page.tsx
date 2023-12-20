import FaucetItem from "./faucetitem_segment/faucetitem_segment";
import DashboardLayout from "../../layout";
export default function Faucet_Ctrl_Page() {
  return (
    <div className="block">
      <FaucetItem></FaucetItem>
    </div>
  );
}
Faucet_Ctrl_Page.Layout = DashboardLayout;
