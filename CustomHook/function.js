import AsyncStorage from '@react-native-async-storage/async-storage';
export function shortenText(text, n) {
  if (text.length > n) {
    return text.substring(0, n).concat("...");
  }
  return text;
}

export async function getData() {
  try {
    const jsonValue = await AsyncStorage.getItem('cartItems')
    return jsonValue !== null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error(e.message);
  }
}

export async function storeData(value) {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('cartItems', jsonValue)
  } catch (e) {
    console.error(e.message);
  }
}
