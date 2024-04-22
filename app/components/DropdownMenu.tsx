import { useState } from "react";

const DropdownMenu = (props: { menuName: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    console.log(`Clicked on ${item}`);
    setIsOpen(false); // Close the menu after an item is clicked
  };

  return (
    <div className=" flex-col  ">
      <button
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
        onClick={handleToggleMenu}
      >
        {props.menuName ? props.menuName : "Menu"}
      </button>
      {isOpen && (
        <div className="right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-l ml-auto mr-auto">
          <div className="py-1">
            <button
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left m-auto"
              onClick={() => handleItemClick("Item 1")}
            >
              Item 1
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
              onClick={() => handleItemClick("Item 2")}
            >
              Item 2
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
              onClick={() => handleItemClick("Item 3")}
            >
              Item 3
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
