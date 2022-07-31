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
        <ModalContent top={"25%"} margin="20px">
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              src={user.pic}
              borderRadius="50%"
              width="200px"
              height="200px"
              margin="auto"
              border="3px solid #4CAF50"
              padding="5px"
            />

            <Text
              align="center"
              fontSize="xl"
              marginTop="20px"
              fontWeight="bold"
            >
              {user.name}
            </Text>
            <Text align="center" fontSize={["rg", "xl"]} marginTop="10px">
              <strong>Email</strong> : {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={onClose}
              colorScheme="teal"
              variant="outline"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileModal;
