import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault(); // prevent the form from being posted to the server
          // We want access to this input field, we can use RefHook or useState to store the value of the input field
          // its a simple form with a single input field, we can just use RefHook
          if (ref.current) onSearch(ref.current.value);
        }}
      >
        <InputGroup>
          <InputLeftElement children={<BsSearch />} />
          <Input
            ref={ref} //we can use ref to access the input field (by associating the ref with the input field)
            borderRadius={20}
            placeholder="Search Games..."
            variant="filled"
          />
        </InputGroup>
      </form>
    </>
  );
};

export default SearchInput;
