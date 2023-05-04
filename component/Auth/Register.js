import React from "react";
import { useState } from 'react';
import { Box, Button, FormControl, Heading, Input, Stack, VStack, useToast, Spinner } from "native-base";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-native";
import { auth } from "../../firebase/config";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const nagivate = useNavigate()
  const toast = useToast()
  const registerUser = () => {
    if (email === undefined || password === undefined || cPassword === undefined) {
      toast.show({
        description: "Hãy điền hết tất cả các ô yêu cầu dấu *"
      })
    }
    else if (password !== cPassword) {
      toast.show({ description: "Mật khẩu không trùng khớp" })
    }
    else {
      setIsLoading(true)
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setIsLoading(false)
          toast.show({ description: "Đăng kí thành công !" })
          nagivate("/login")
        })
        .catch((error) => {
          setIsLoading(false)
          toast.show({ description: "Có lỗi xảy ra , vui lòng thử lại sau" })
        });
    }
  }
  return (
    <VStack mt={10} alignItems={"center"} justifyContent="center" >
      <Heading size="xl" mb={10}>
        Đăng ký
      </Heading>
      <Box alignItems="center">
        <Box w="100%" maxWidth="500px">
          <FormControl isRequired>
            <Stack mx="4">
              <FormControl.Label>Email</FormControl.Label>
              <Input type="text" placeholder="ví dụ : abc@gmail.com" onChangeText={value => setEmail(value)} />
            </Stack>
          </FormControl>
          <FormControl isRequired>
            <Stack mx="4">
              <FormControl.Label>Mật khẩu</FormControl.Label>
              <Input type="password" placeholder="password" onChangeText={value => setPassword(value)} />
            </Stack>
          </FormControl>
          <FormControl isRequired>
            <Stack mx="4">
              <FormControl.Label>Nhập lại mật khẩu</FormControl.Label>
              <Input type="password" placeholder="password" onChangeText={value => setCPassword(value)} />
            </Stack>
          </FormControl>
          <Button onPress={registerUser} backgroundColor="black" w={"full"} my={10}>
            {isLoading ? <Spinner accessibilityLabel="Loading posts" color={"indigo.50"} /> : "Đăng kí tài khoản"}
          </Button>
        </Box>
      </Box>
    </VStack>
  );
}

export default Register;
