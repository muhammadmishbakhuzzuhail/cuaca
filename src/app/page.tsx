import ButtonSearchDropdown from "./_components/button-search-dropdown";
import GridCardPreview from "./_components/grid-card-preview";
import SearchDropdown from "./_components/search-dropdown";
import SearchInput from "./_components/search-input";

const Home = () => {
  return (
    <div className="space-y-4 ">
      <div className="mx-auto w-fit space-y-2">
        <div className="flex w-fit mx-auto">
          <ButtonSearchDropdown />
          <SearchInput />
        </div>
        <SearchDropdown />
      </div>
      <GridCardPreview />
    </div>
  );
};
export default Home;
