import InfinteScroll from "./virtulization/InfinteScroll";
import InfinteScrollWithReactQuery from "./virtulization/InfinteScrollWithReactQuery";
import NormalList from "./virtulization/NormalList";
import VirtualizedList from "./virtulization/VirtualizedList";

const App = () => {
  return (
    <div>
      {/* <InfinteScroll /> */}
      <InfinteScrollWithReactQuery />
    </div>
  );
};

export default App;
