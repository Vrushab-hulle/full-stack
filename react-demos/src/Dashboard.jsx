import withAuth from "./utils/withAuth";

const Dashboard = () => {
  return <div>Dashboard</div>;
};

const ModifiedAuthDashBoard = withAuth(Dashboard);

export default ModifiedAuthDashBoard;
