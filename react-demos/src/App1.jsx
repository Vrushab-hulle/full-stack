import React from "react";

import UserInfoList from "./1ListRendering/UserInfoList";
import WelcomeMessage from "./WelcomeMessage";
import Pagination from "./5Pagination/Pagination";
import UserContext from "./Context/UserContext";
import { UserProfile } from "./Context/UserProfile";
import BatchingExample from "./components/BatchingExample";
import { ExpensiveCalc } from "./useMemo/ExpensiveCalc";

const LazyComponent = React.lazy(() => import("./MachineCoding/Q21"));

// const App1 = () => {
//   const name = "vrushabh";
//   const MyComponentWithLogger = withPropsLogger(Q12);

//   const [show, setShow] = useState(false);

//   const showValue = (value) => <p>the value is :{value}</p>;

//   return (
//     <div>
//       This is App Component
//       <br />
//       <hr />
//       {/* <Input renderTextBelow={showValue} /> */}
//       <hr />
//       <PortalExample />
//       <ErrorBoundary
//         fallback={
//           <div
//             style={{ color: "red", padding: "20px", border: "1px solid red" }}
//           >
//             <h2>⚠️ Error Occurred!</h2>
//             <p>Our team has been notified. Please try again later.</p>
//           </div>
//         }
//       >
//         <BuggyComponent />
//       </ErrorBoundary>
//       {/* <Q1 /> */}
//       {/* <Q2 name={name} /> */}
//       {/* <Q3/> */}
//       {/* <Q4/> */}
//       {/* <Q5 /> */}
//       {/* <Q6 /> */}
//       {/* <Q7/> */}
//       {/* <Q8 /> */}
//       {/* <Q9 /> */}
//       {/* <Q10 /> */}
//       {/* <Q11 /> */}
//       {/* <MyComponentWithLogger name={"vrushabh"} age={27} /> */}
//       {/* <ContextData /> */}
//       {/* <Q14 /> */}
//       {/* <Q15 /> */}
//       {/* <Q16 /> */}
//       {/* <Q17 /> */}
//       {/* <Q18 /> */}
//       {/* <Q19 /> */}
//       {/* <Q20 /> */}
//       <Suspense fallback={<div>Loading...</div>}>
//         {show && <LazyComponent />}
//       </Suspense>
//       <button onClick={() => setShow(!show)}>Show Comp</button>
//       {/* <Q22 /> */}
//       {/* <Q23 /> */}
//       {/* <Q24 /> */}
//       {/* <Q25 /> */}
//       <Q26 />
//       <hr />
//       <Routes>
//         <Route path="/" element={<Home />} />
//       </Routes>
//       <hr />
//       <Greet />
//       <UserList />
//     </div>
//   );
// };

const App1 = () => {
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 5000);
  // });
  // const WrappedWelcomeMessage = withLoading(WelcomeMessage);
  return (
    <>
      {/* <NavBar /> */}
      {/* <UserList /> */}
      {/* <ToDoList /> */}
      {/* <TabForm /> */}
      {/* <Accordian /> */}
      {/* <Pagination /> */}
      {/* <FunctionalErrorBoundary>
        <Routes>
          <Route path="/about" element={<Greet />} />
          <Route path="/contact" element={<BuggyComponent />} />
        </Routes>
      </FunctionalErrorBoundary> */}
      {/* <WrappedWelcomeMessage loading={loading} name="vrushabh" age={26} /> */}
      {/* <UserList /> */}
      {/* <ToDoList /> */}
      {/* <Pagination /> */}
      {/* <WelcomeMessage /> */}
      {/* <UserContext >
        <hr />
        <UserProfile />

      </UserContext> */}
      {/* <BatchingExample /> */}
      <ExpensiveCalc />
    </>
  );
};

export default App1;
