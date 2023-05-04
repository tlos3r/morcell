import React from "react";
import { Button, Flex, HStack, Image, ScrollView, Spacer, Spinner, Text, VStack, useToast } from "native-base";
import useFetch from "../../CustomHook/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCT, selectProducts } from "../../redux/slice/productSlice";
import { useEffect } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { shortenText } from "../../CustomHook/function";
import { Link } from "react-router-native";
const ViewProduct = () => {
  const { data, isLoading } = useFetch("products");
  const products = useSelector(selectProducts);
  const toast = useToast()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      STORE_PRODUCT({
        products: data,
      })
    );
  }, [data, dispatch]);
  const deleteProduct = async (id, imageUrl) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
      toast.show({ description: "Xoá sản phẩm thành công !" })
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      {isLoading && <Spinner accessibilityLabel="Loading posts" color={"indigo.50"} size={"lg"} />}
      <ScrollView w={"100%"} >
        <VStack space={3} h={1500}>
          {products.length === 0 ? <Text>Không tìm thấy sản phẩm nào</Text> :
            (products.map((product, index) => {
              const { id, name, price, imageUrl } = product
              return (
                <HStack justifyContent="space-between" alignItems={"center"} mt={5} key={id}>
                  <Text px={3} bold>{index + 1}</Text>
                  <Image source={{ uri: `${imageUrl}` }} size={"xs"} alt="this is a Image" w={100} h={100} />
                  <Flex direction="column" textAlign={"center"}>
                    <Text px={10} bold>{shortenText(name, 9)}</Text>
                    <Text>{price}VND</Text>
                  </Flex>
                  <Flex direction="row">
                    <Button colorScheme={"dark"} size={"xs"}>
                      <Link to={`/add-product/${id}`}>
                        <AntDesign name="edit" size={18} color="black" />
                      </Link>
                    </Button>
                    <Spacer />
                    <Button colorScheme={"dark"} size={"xs"} onPress={() => deleteProduct(id, imageUrl)}><FontAwesome5 name="trash" size={18} color="black" /></Button>
                  </Flex>
                </HStack>
              )
            }))
          }
        </VStack>
      </ScrollView>
    </>
  );
};

export default ViewProduct;