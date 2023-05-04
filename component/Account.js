import { Box, Button, Center, Heading, Text, useToast, VStack } from "native-base";
import React from "react";
import { Login, Logout } from './AdminRoute';
import { Link } from "react-router-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
function Account() {
  const toast = useToast()
  const signOutUser = () => {
    signOut(auth).then(() => {
      toast.show({ description: "Đăng xuất thành công" })
    }).catch(() => {
      toast.show({ description: "Đăng xuất thất bại" })
    });
  }

  return (
    <VStack space={3} alignItems={"center"} mt={"10"} width='100%'>
      <Heading size={"2xl"}>
        Tài khoản
      </Heading>
      <Logout>
        <Center mb={5}>
          <Text >Hiện tại bạn chưa đăng nhập</Text>
        </Center>
        <Center mb={5}>
          <Button backgroundColor={"black"} size={"sm"} width="100%">
            <Link to={"/login"}>
              <Text fontSize={"lg"} color="white" >Đăng nhập</Text>
            </Link>
          </Button>
        </Center>
        <Center mb={5}>
          <Button backgroundColor={"black"}>
            <Link to={"/register"}>
              <Text fontSize={"lg"} color="white">Đăng kí</Text>
            </Link>
          </Button>
        </Center>
        <Center mb={5}>
          <Button backgroundColor={"black"}>
            <Link to={"/forget"}>
              <Text fontSize={"lg"} color="white">Quên mật khẩu</Text>
            </Link>
          </Button>
        </Center>
      </Logout>
      <Login>
        <Center mb={5}>
          <Button backgroundColor={"black"} onPress={signOutUser}>
            <Text fontSize={"lg"} color="white">Đăng xuất</Text>
          </Button>
        </Center>
      </Login>
    </VStack>
  );
}

export default Account;
