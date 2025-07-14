import ButtonSearchDropdown from "./_components/button-search-dropdown";
import CardList from "./_components/card-list";
import SearchDropdown from "./_components/search-dropdown";
import SearchInput from "./_components/search-input";

const Home = () => {
   return (
      <div className="space-y-4">
         <div className="mx-auto w-fit space-y-2">
            <div className="flex w-fit mx-auto">
               <ButtonSearchDropdown />
               <SearchInput />
            </div>
            <SearchDropdown />
         </div>
         <div className="grid grid-cols-3 grid-rows-4 gap-3">
            <CardList /> <CardList /> <CardList />
         </div>
      </div>
   );
};
export default Home;
