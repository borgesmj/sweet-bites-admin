import Navlinks from "./Navlinks";
const Dashboard = ({ children }) => {
  return (
    <div className="flex flex-row">
      <Navlinks />
      {children}
    </div>
  );
};

export default Dashboard;
