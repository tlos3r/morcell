import React, { useState } from "react";
import { Box, Button, FormControl, Heading, Input, Spinner, Stack, useToast, VStack } from "native-base";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-native";
import { auth } from "../../firebase/config";

function Forget() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()
  const resetPassword = () => {
    setIsLoading(true)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false)
        toast.show({ description: "Email thay đổi mật khẩu đã được gửi" })
        navigate("/login")
      })
      .catch((error) => {
        setIsLoading(false)
        toast.show({ description: error.message })
        // ..
      });
  }
  return (
    <VStack mt={10} alignItems={"center"} justifyContent="center">
      <Heading size="xl" mb={10}>
        Quên mật khẩu
      </Heading>
      <Box alignItems="center">
        <Box w="100%" maxWidth="500px">
          <FormControl isRequired>
            <Stack mx="4">
              <FormControl.Label>Email đã đăng kí</FormControl.Label>
              <Input type="text" placeholder="ví dụ : abc@gmail.com" onChangeText={value => setEmail(value)} />
            </Stack>
          </FormControl>
          <Button onPress={resetPassword} backgroundColor="black" w={"full"} my={10}>
            {isLoading ? <Spinner accessibilityLabel="Loading posts" color={"indigo.50"} /> : "Gửi email"}
          </Button>
        </Box>
      </Box>
    </VStack>
  )
}

export default Forget;
