import { Button, Label, Select } from "@windmill/react-ui";

const HomeFilters = () => {
  return ( 
      <div className="z-10 absolute  -bottom-12 hidden sm:flex w-full ">
      <div className="max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto flex flex-row justify-between items-center gap-5 bg-white rounded-md w-full px-5 py-5 shadow-lg">
      <span className="bg-green-300 text-green-800 px-4 py-1 rounded-full text-sm font-semibold">
         Aktuell online
        </span>
        <div className="flex flex-row gap-5 items-center justify-between">
          <Label>
            <span className="text-sm font-semibold">Location</span>
            <Select className="mt-1">
              <option>Bangladesh</option>
              <option>German</option>
            </Select>
          </Label>
          <Label>
            <span className="text-sm font-semibold">Property Type</span>
            <Select className="mt-1">
              <option>House</option>
              <option>Land</option>
            </Select>
          </Label>
          <Label>
            <span className="text-sm font-semibold">Budget</span>
            <Select className="mt-1">
              <option>100$</option>
              <option>5000$</option>
            </Select>
          </Label>
        </div>
        <Button>Search</Button>
      </div>
    </div> 
    
  );
};

export default HomeFilters;

 