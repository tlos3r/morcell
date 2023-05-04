import { Button, Center, Heading, Text, VStack } from "native-base";
import { Link } from "react-router-native";

const Admin = () => {
  return (
    <VStack space={4} alignItems="center">
      <Heading size={"2xl"}>
        Quản lý sản phẩm
      </Heading>
      <Center>
        <Button backgroundColor="black" w={"full"}>
          <Link to={"/view-product"}>
            <Text color={"white"} >Xem tất cả sản phẩm</Text>
          </Link>
        </Button>
      </Center>
      <Center>
        <Button backgroundColor="black" w={"full"}>
          <Link to={"/add-product/add"}>
            <Text color={"white"}>Thêm sản phẩm</Text>
          </Link>
        </Button>
      </Center>
    </VStack>
  );
};

export default Admin;
