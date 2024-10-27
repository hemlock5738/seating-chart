import { LeafletMap } from "./components/LeafletMap";
import { SearchBox } from "./components/SearchBox";

function App() {
  return (
    <>
      <div className="fixed left-4 top-4 z-[calc(infinity)]">
        <SearchBox />
      </div>
      <LeafletMap />
    </>
  );
}

export default App;
