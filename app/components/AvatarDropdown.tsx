import { useState, useEffect, useRef } from "react";
import { UserAuth } from "../context/AuthContext";
import Image from "next/image";

const AvatarDropdown = () => {
  const { user, signOutUser } = UserAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error(error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="h-8 w-8 rounded-full overflow-hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          className="h-8 w-8 rounded-full"
          src="https://avatars.githubusercontent.com/u/26286058?v=4"
          alt="Workflow"
          width={32}
          height={32}
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
          <div className="py-1">
            <button
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
