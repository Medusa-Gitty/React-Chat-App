import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      {children && <span onClick={onOpen}>{children}</span>}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent top={"25%"} margin="10px">
          <ModalHeader>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              src={user.pic}
              borderRadius="50%"
              width="150px"
              margin="auto"
            />
            <Text align="center" fontSize="xl" marginTop="20px">
              Email : {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileModal;
