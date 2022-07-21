import {
  Avatar,
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchIcon, BellIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

const SearchPanel = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const userData = useSelector((state) => state.userData);

  return (
    <>
      <Flex
        justifyContent={"space-between"}
        alignItems="center"
        w="100%"
        p={3}
        bg="black"
      >
        <Button colorScheme="teal" variant="ghost" leftIcon={<SearchIcon />}>
          <Text display={["none", "flex"]}>Search User</Text>
        </Button>
        <Text fontSize="2xl" color="white">
          Ping.gg
        </Text>
        <Flex>
          <Menu>
            <MenuButton as={Button} rightIcon={<BellIcon />}></MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
            </MenuList>
          </Menu>
          <Divider orientation="vertical" />
          <Menu>
            <MenuButton as={Button} borderRadius="5%">
              <Avatar size="sm" name={userData.name} src={userData.pic} />
            </MenuButton>
            <MenuList>
              <MenuItem>My Profile</MenuItem>
              <MenuDivider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
};

export default SearchPanel;
