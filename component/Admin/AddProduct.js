import { useState } from "react";
import { Box, FormControl, Heading, Input, ScrollView, Stack, Select, TextArea, Button, useToast } from "native-base";
import { useNavigate, useParams } from "react-router-native";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/slice/productSlice";

const initialState = {
  name: "",
  imageUrl: "",
  price: 0,
  brand: "",
  desc: "",
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });
  const toast = useToast()
  function detectForm(id, f1, f2) {
    if (id === "add") return f1;
    else return f2;
  }

  const submitProduct = () => {
    setIsLoading(true)
    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        desc: product.desc,
        brand: product.brand,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setProduct({
        ...initialState,
      });
      toast.show({ description: "Sản phẩm đã được cập nhật !" })

    } catch (error) {
      setIsLoading(false)
      console.error(error.message);
    }
  }
  const editProduct = () => {
    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        desc: product.desc,
        brand: product.brand,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.show({ description: "Sửa thành công" })
      navigate("/view-product")
    } catch (error) {
      setIsLoading(false);
      console.error(error.message);
    }
  }
  return (
    <ScrollView w="100%">
      <Stack space={3} alignSelf="center" px="4" safeArea mt="4" w={{
        base: "100%",
        md: "25%"
      }} h={950}>
        <Heading size="xl" mb={10} textAlign={"center"}>
          Thêm sản phẩm
        </Heading>
        <Box>
          <FormControl mb="5" isRequired>
            <FormControl.Label>Tên sản phẩm</FormControl.Label>
            <Input type="text" value={product.name} onChangeText={value => setProduct({ ...product, name: value })} />
          </FormControl>
        </Box>
        <Box>
          <FormControl mb="5" isRequired>
            <FormControl.Label>Giá</FormControl.Label>
            <Input type="text" value={product.price} placeholder="00000 VNĐ" onChangeText={value => setProduct({ ...product, price: value })} />
          </FormControl>
        </Box>
        <Box>
          <FormControl mb="5" isRequired>
            <FormControl.Label>Ảnh mô tả (đường dẫn)</FormControl.Label>
            <Input type="text" value={product.imageUrl} onChangeText={value => setProduct({ ...product, imageUrl: value })} />
          </FormControl>
        </Box>
        <Box>
          <FormControl mb="5" isRequired>
            <FormControl.Label>Hãng</FormControl.Label>
            <Input type="text" value={product.brand} placeholder="Hãng" onChangeText={value => setProduct({ ...product, brand: value })} />
          </FormControl>
        </Box>
        <Box>
          <FormControl mb="5" isRequired>
            <FormControl.Label>Mô tả</FormControl.Label>
            <TextArea value={product.desc} onChangeText={value => setProduct({ ...product, desc: value })} />
          </FormControl>
        </Box>
        <Box>
          <Button onPress={detectForm(id, submitProduct, editProduct)} bg={"black"} >
            {isLoading ? <Spinner accessibilityLabel="Loading posts" color={"indigo.50"} /> : detectForm(id, "Thêm sản phẩm", "Sửa sản phẩm")}
          </Button>
        </Box>
      </Stack>
    </ScrollView>
  );
};

export default AddProduct;