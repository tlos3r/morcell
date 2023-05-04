import { Box, Button, useToast, Flex, HStack, Heading, Image, ScrollView, Spinner, Text, Center } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import useFetch from "../CustomHook/useFetch";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_BY_SEARCH, STORE_PRODUCT, selectProducts, selectSearchProducts } from "../redux/slice/productSlice";
import { shortenText } from "../CustomHook/function";
import { Link } from "react-router-native";
import { ADD_TO_CART } from "../redux/slice/cartSlice";
import Search from "./Search";
import { useState } from "react";

export const Home = () => {
  const [search, setSearch] = useState("")
  const { data, isLoading } = useFetch("products");
  const products = useSelector(selectProducts);
  const searchProductResult = useSelector(selectSearchProducts)
  const dispatch = useDispatch()
  const toast = useToast()
  useEffect(() => {
    dispatch(
      STORE_PRODUCT({
        products: data,
      })
    );
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product))
    toast.show({ description: "Thêm vào giỏ hàng thành công" })
  }
  return (
    <>
      <Heading bold size={"2xl"} textAlign={"center"}>
        Sản phẩm hiện có
      </Heading>
      <ScrollView w={"100%"}>
        <Center mt={5} >
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </Center>
        {isLoading && <Spinner accessibilityLabel="Loading posts" size={"lg"} />}
        <HStack space="1.5" mt="4" px={2} flexWrap={"wrap"} alignItems={"center"} justifyContent={"center"}>
          {searchProductResult.map((product, index) => {
            const { id, name, price, imageUrl } = product
            return (
              <Box mt={5} key={index} >
                <Image source={{ uri: `${imageUrl}` }} size={"md"} alt={"image"} m={2} />
                <Text bold textAlign={"center"}> {shortenText(name, 9)}</Text>
                <Text textAlign={"center"}>{`${price} VND`}</Text>
                <Flex direction="row">
                  <Button colorScheme={"primary"} mr={2} onPress={() => addToCart(product)}>
                    <AntDesign name="shoppingcart" size={20} color="white" />
                  </Button>
                  <Button colorScheme={"blueGray"} variant={"outline"}>
                    <Link to={`/details/${id}`}>
                      <AntDesign name="infocirlceo" size={20} color="black" />
                    </Link>
                  </Button>
                </Flex>
              </Box>
            )
          })}
        </HStack>
      </ScrollView>
    </>
  );
};