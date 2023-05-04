import React, { useState } from "react";
import { Box, Button, FormControl, Heading, Input, Spinner, Stack, useToast, VStack } from "native-base";
import { useNavigate } from "react-router-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const nagivate = useNavigate()
  const toast = useToast()
  const loginUser = () => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        setIsLoading(false)
        toast.show({ description: "Đăng nhập thành công" })
        nagivate("/")
      })
      .catch((error) => {
        setIsLoading(false)
        toast.show({ description: error.message })
      });
  }
  return <VStack mt={10} alignItems={"center"} justifyContent="center" >
    <Heading size="xl" mb={10}>
      Đăng nhập
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
            <Input type="password" placeholder="ví dụ : 123456" onChangeText={value => setPassword(value)} />
          </Stack>
        </FormControl>
        <Button onPress={loginUser} backgroundColor="black" w={"full"} my={10}>
          {isLoading ? <Spinner accessibilityLabel="Loading posts" color={"indigo.50"} /> : "Đăng nhập"}
        </Button>
      </Box>
    </Box>
  </VStack>;
}

export default Login;
