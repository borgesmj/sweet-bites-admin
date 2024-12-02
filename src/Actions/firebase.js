import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
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

export async function deleteCoupon(id) {
  let couponList = [];
  try {
    await deleteDoc(doc(db, "coupons", id));
    couponList = await fetchCoupons();
  } catch (error) {
    console.log("Error eliminando el cupon, ", error);
  } finally {
    console.log("cupon borrado con exito");
  }
  return couponList;
}

export async function loginUser(data) {
  const auth = getAuth();
  const { username, password } = data;
  let email = username;
  const user = {}
  try {
    // * si no incluye un arroba
    if (!email.includes("@")) {
      // * entramos a la coleccion usuarios
      const usersCol = collection(db, "users");
      // * consultamos si el usuario existe con respecto al username que proporcionó
      const q = await query(usersCol, where("username", "==", email));
      // * se extrae el documento de la consulta
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        email = userDoc.email;
        user.username = username
        user.email = email
      } else {
        throw new Error("No se encontro este usuario");
      }
    } else{
      //* si tiene un arroba, es un correo electronico
      //* queremos extraer el nombre de usuario
      const usersCol = collection(db, "users");
      const q = await query(usersCol, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        user.username = userDoc.username
        user.email = email
      } else {
        throw new Error("No se encontro este usuario");
      }
    }
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    user.uid = credentials.user.uid;
    return user
  } catch (error) {
    window.alert(error);
  }
}
