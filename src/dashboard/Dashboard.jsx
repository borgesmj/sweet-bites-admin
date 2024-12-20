import { useApp } from "../Actions/ContextProvider";
import Navlinks from "./Navlinks";
const Dashboard = ({ children }) => {
  const {user, handleLogOutUser } = useApp()
  return (
    <div className="flex flex-row">
      <Navlinks username = {user.username} handleLogOutUser ={handleLogOutUser }/>
      {children}
    </div>
  );
};

export default Dashboard;
