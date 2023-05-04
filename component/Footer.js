import React, { useState } from "react";
import { Box, Center, HStack, Icon, Pressable, Text } from "native-base";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Link, useLocation } from "react-router-native"
import { AdminOnlyLink } from "./AdminRoute";
export const Footer = () => {
  const location = useLocation();
  return (
    <Box flex={1} bg="white" safeAreaTop width="100%" alignSelf="center" position={"fixed"} bottom={0} >
      <HStack bg="black" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable cursor="pointer" opacity={location.pathname === "/" ? 1 : 0.5} py="3" flex={1} >
          <Link to={"/"}>
            <Center>
              <Icon mb="1" as={<Ionicons name={location.pathname === "/" ? 'home' : 'home-outline'} />} color="white" size="sm" />
              <Text color="white" fontSize="12">
                Trang chủ
              </Text>
            </Center>
          </Link>
        </Pressable>
        <Pressable cursor="pointer" opacity={location.pathname === "/cart" ? 1 : 0.6} py="2" flex={1} >
          <Link to={"/cart"} >
            <Center>
              <Icon mb="1" as={<Ionicons name={location.pathname === "/cart" ? 'cart' : 'cart-outline'} />} color="white" size="sm" />
              <Text color="white" fontSize="12">
                Giỏ hàng
              </Text>
            </Center>
          </Link>
        </Pressable>
        <Pressable cursor="pointer" opacity={location.pathname === "/account" ? 1 : 0.5} py="2" flex={1}>
          <Link to={'/account'} >
            <Center>
              <Icon mb="1" as={<MaterialCommunityIcons name={location.pathname === "/account" ? 'account' : 'account-outline'} />} color="white" size="sm" />
              <Text color="white" fontSize="12">
                Tài khoản
              </Text>
            </Center>
          </Link>
        </Pressable>
        <AdminOnlyLink>
          <Pressable cursor="pointer" opacity={location.pathname === "/admin" ? 1 : 0.5} py="2" flex={1}>
            <Link to={'/admin'} >
              <Center>
                <Icon mb="1" as={<MaterialIcons name={'admin-panel-settings'} />} color="white" size="sm" />
                <Text color="white" fontSize="12">
                  Admin
                </Text>
              </Center>
            </Link>
          </Pressable>
        </AdminOnlyLink>
      </HStack>
    </Box>
  );
};
