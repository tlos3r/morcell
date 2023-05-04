import { useState, useEffect } from "react";
import { ScrollView, VStack, HStack, Image, Flex, Text, Button, Heading, useToast } from "native-base";
import { getData, shortenText } from "../CustomHook/function";
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { REMOVE_TO_CART } from "../redux/slice/cartSlice";

export const Cart = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch()
  const toast = useToast()
  useEffect(() => {
    getData().then((items) => {
      setProducts(items)
    })
  }, [])
  const removeCart = (product) => {
    dispatch(REMOVE_TO_CART(product))
    toast.show({ description: "Xoá khỏi giỏ hàng thành công, tải lại trang lại" })

  }
  return (
    <ScrollView w={"100%"} >
      <Heading size={"2xl"} textAlign={"center"}>
        Giỏ hàng
      </Heading>
      <VStack space={3} h={1500}>
        {products.length === 0 ? <Text>Không tìm thấy sản phẩm nào</Text> :
          (products.map((product, index) => {
            const { id, name, price, imageUrl } = product
            return (
              <HStack justifyContent="space-between" alignItems={"center"} mt={5} key={index}>
                <Text px={3} bold>{index + 1}</Text>
                <Image source={{ uri: `${imageUrl}` }} size={"xs"} alt="this is a Image" w={100} h={100} />
                <Flex direction="column" textAlign={"center"}>
                  <Text px={10} bold>{shortenText(name, 9)}</Text>
                  <Text>{price}VND</Text>
                </Flex>
                <Flex direction="row">
                  <Button colorScheme={"danger"} size={"xs"} onPress={() => removeCart(product)}><FontAwesome5 name="trash" size={18} color="white" /></Button>
                </Flex>
              </HStack>
            )
          }))
        }
        <Button bg={"black"} >Thanh Toán</Button>
      </VStack>
    </ScrollView>
  );
};
