import React, { useEffect, useState } from "react";
import { Center, HStack, Icon, Image, Input, Text } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "../redux/slice/authSlice";
import Search from "./Search";
export const Header = () => {
  const [userName, setUserName] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const getNameEmail = user.email.substring(0, user.email.indexOf("@"));
          const uName = getNameEmail.charAt(0).toUpperCase() + getNameEmail.slice(1);
          user.displayName = uName;
          setUserName(uName);
        } else setUserName(user.displayName);
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName,
            userID: user.uid,
          })
        );
      } else {
        setUserName("");
        dispatch(REMOVE_ACTIVE_USER());
      }

    });
  }, [])


  return (
    <HStack space={3} justifyContent={"space-between"} bgColor={"black"} maxW={"100%"} h="16" alignItems={"center"}>
      <Center>
        <Image source={{ uri: "https://i.ibb.co/NS2rgYz/Morcell-Logo.png" }} alt={"morcel logo"} size="lg" />
      </Center>
      <Center alignItems={"center"}>
        <Text color={'white'} fontFamily='body' pr={10}>
          <Icon as={FontAwesome} name="user-circle" size={"sm"} color="white" />
          {" "} {userName != "" ? userName : "Khách"}
        </Text>
      </Center>
    </HStack>
  )
};
