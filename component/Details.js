import { doc, getDoc } from "firebase/firestore";
import { Box, Button, Center, Flex, HStack, Heading, Image, ScrollView, Spinner, Text, VStack, useToast } from "native-base";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-native";
import { db } from "../firebase/config";
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';

const Details = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const toast = useToast()

  useEffect(() => {
    getProduct()
  }, []);

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const obj = {
        id,
        ...docSnap.data(),
      };
      setProduct(obj);
    } else {
      toast.show({ description: "Khong co thong tin ve san pham nay" })
    }
  };
  return (
    <ScrollView>
      <Heading size={"2xl"} bold textAlign={"center"}>
        Chi tiết sản phẩm
      </Heading>
      {product === null ? <Spinner accessibilityLabel="Loading posts" size={"lg"} /> : (
        <VStack justifyContent={"center"} alignItems={"center"} mx={8}>
          <Image source={{ uri: `${product.imageUrl}` }} size={"md"} alt={"image"} my={5} />
          <Text bold fontSize={25} >{product.name}</Text>
          <Text py={2}>Giá :{product.price}</Text>
          <Text py={2}>Hãng : {product.brand}</Text>
          <Text py={2} fontWeight={500}>
            {product.desc}
          </Text>
          <Flex direction="row">
            <Button colorScheme={"primary"} mr={2}>
              <AntDesign name="shoppingcart" size={20} color="white" />
            </Button>
            <Button variant={"outline"} colorScheme={"dark"}>
              <Link to={"/"}>
                <AntDesign name="back" size={24} color="black" />
              </Link>
            </Button>
          </Flex>
        </VStack>
      )}
    </ScrollView>
  );
};

export default Details;
