import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/Logo/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

const NavBar = () => {
  return (
    <HStack padding="20px">
      <Image src={logo} boxSize="60px" />
      <SearchInput />
      <ColorModeSwitch />
      GameHub
    </HStack>
  );
};

export default NavBar;

//

/*

show me the relative file path of C:\Users\lstem\Documents\Coding_Projects\REACT\GameHubResources 
if im in                          C:\Users\lstem\Documents\Coding_Projects\REACT\game-hub-mosh\src\components

the relative file path for the two paths above is: ..\..\..\..\GameHubResources
*/
