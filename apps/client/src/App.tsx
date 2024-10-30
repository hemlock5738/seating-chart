import { LeafletMap } from "./components/LeafletMap";
import { SearchBox } from "./components/SearchBox";
import { useLogin } from "./hooks/useLogin";

function App() {
  useLogin();

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
