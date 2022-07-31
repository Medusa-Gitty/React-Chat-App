import {
  Box,
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
        <ModalContent
          top={"25%"}
          margin="20px"
          style={{
            backgroundImage: `url(${require("../../assets/images/bg10.jpg")})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={8}>
            <Image
              src={user.pic}
              borderRadius="50%"
              width="200px"
              height="200px"
              margin="auto"
              border="3px solid #4CAF50"
              padding="5px"
            />
          </ModalBody>
          <Box
            style={{
              backgroundImage: `url(${require("../../assets/images/bg12.jpg")})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            color="white"
            borderBottomRadius="5px"
          >
            <Box>
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
            </Box>
            <ModalFooter borderRadius={5}>
              <Button
                mr={3}
                onClick={onClose}
                colorScheme="teal"
                variant="outline"
              >
                Close
              </Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileModal;
