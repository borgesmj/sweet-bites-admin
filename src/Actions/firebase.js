import { initializeApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const firebase_APIKEY = import.meta.env.VITE_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey: firebase_APIKEY,
  authDomain: "sweet-bites-fa085.firebaseapp.com",
  projectId: "sweet-bites-fa085",
  storageBucket: "sweet-bites-fa085.firebasestorage.app",
  messagingSenderId: "193035648112",
  appId: "1:193035648112:web:1e2641b47a13eea0fcc8b5",
  measurementId: "G-HES1GDNXTB",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function fetchProducts() {
  const productsCol = collection(db, "products");
  const productsSnapshot = await getDocs(productsCol);
  const productsList = productsSnapshot.docs.map((doc) => doc.data());
  return productsList;
}

export async function updateProduct(id, newProduct) {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, {
      title: newProduct.title,
      description: newProduct.description,
      category: newProduct.category,
      images: newProduct.images,
      special_product: newProduct.special_product,
      productPrices: newProduct.productPrices,
    });
    const newList = await fetchProducts();
    return newList;
  } catch (error) {
    console.log("error actualizando el producto, ", error);
    return;
  } finally {
    console.log("producto actualizado con exito");
  }
}

export async function deleteProduct(id) {
  let filteredProducts = [];
  try {
    await deleteDoc(doc(db, "products", id));
    filteredProducts = await fetchProducts();
  } catch (error) {
    console.log("error borrando el documento: ", error, id);
  } finally {
    console.log("producto borrado con exito");
  }
  return filteredProducts;
}

export async function updateNewProduct(newProduct) {
  let id = "";
  try {
    const docRef = await doc(collection(db, "products"));
    id = docRef.id;
    await setDoc(docRef, {
      id,
      rating: {
        rate: 0,
        count: 0,
      },
      ...newProduct,
    });
  } catch (error) {
    console.log("error creando el producto, ", error);
  } finally {
    console.log("producto creado con exito");
  }
}

export async function fetchOrders() {
  const productsCol = collection(db, "orders");
  const productsSnapshot = await getDocs(productsCol);
  const ordersList = productsSnapshot.docs.map((doc) => doc.data());
  return ordersList;
}

export async function cancelOrder(id) {
  const orderRef = doc(db, "orders", id);
  await updateDoc(orderRef, {
    status: 3,
  });
}

export async function completeOrder(id) {
  const orderRef = doc(db, "orders", id);
  await updateDoc(orderRef, {
    status: 2,
  });
}

export async function fetchCoupons() {
  const couponsCol = collection(db, "coupons");
  const couponsSnapshot = await getDocs(couponsCol);
  const couponsList = couponsSnapshot.docs.map((doc) => doc.data());
  return couponsList;
}

export async function addCoupon(coupon) {
  let id = "";
  try {
    const docRef = await doc(collection(db, "coupons"));
    id = docRef.id;
    await setDoc(docRef, {
      id,
      ...coupon,
    });
  } catch (error) {
    console.log("Error creando un cupon, ", error);
  } finally {
    console.log("Cupon creado con exito");
  }
}

export async function updateCoupon(id, currentCouponStatus) {
  try {
    const couponRef = doc(db, "coupons", id);
    await updateDoc(couponRef, {
      is_valid: !currentCouponStatus,
    });
  } catch (error) {
    console.log("Error actualizando el cupon, ", error);
    return;
  } finally {
    console.log("Cupon actualizado con exito");
  }
}

export async function deleteCoupon(id){
  let couponList = []
  try{
    await deleteDoc(doc(db, "coupons", id))
    couponList = await fetchCoupons()
  }catch(error){
    console.log("Error eliminando el cupon, ", error)
  } finally{
    console.log("cupon borrado con exito")
  }
  return couponList
}