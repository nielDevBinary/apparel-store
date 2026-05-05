# 📦 Shopping Cart App (React + TypeScript)

Aplicación de carrito de compras desarrollada con **React + TypeScript**, utilizando **Context API** para la gestión global del estado.

---

## 🚀 Características

- 🛒 Agregar productos al carrito
- ➕ Incrementar cantidad por variante
- ➖ Disminuir cantidad o eliminar producto
- ❌ Remover productos del carrito
- 📦 Control de stock por variante
- 💰 Cálculo automático del total
- 🔢 Conteo total de productos en el carrito
- 🧠 Manejo global del estado con Context API

---

## 🧠 Lógica principal

El estado del carrito se maneja mediante un `ShoppingCartContext`, que centraliza toda la lógica.

### Estado global

- `cartItems`: lista de productos en el carrito  
- `isOpen`: controla si el carrito está visible  
- `cartQuantity`: total de productos  
- `totalAmount`: monto total  

---

## 🛠 Funciones principales

### `addToCart(item)`
Agrega un producto al carrito:
- Si ya existe, incrementa la cantidad
- Respeta el **stock disponible**

### `increaseItemQuantity(variantId)`
Incrementa la cantidad de un producto:
- Verifica que no supere el stock

### `decreaseCartQuantity(variantId)`
Disminuye la cantidad:
- Si llega a 0, elimina el producto

### `removeFromCart(variantId)`
Elimina completamente el producto del carrito

### `getItemQuantity(variantId)`
Obtiene la cantidad actual de un producto

---

## 🧩 Estructura del CartItem

```ts
type CartItem = {
  productId: string;
  variantId: string;
  quantity: number;

  name: string;
  price: number;
  image: string;
  size: string;
  stock: number;
};
```

---

## ⚙️ Instalación

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
npm install
npm run dev
```

---

## 🧪 Ejemplo de uso

```tsx
const { addToCart } = useShoppingCart();

addToCart({
  productId: "1"
  variantId: "S-1",
  name:"vestido",
  price: 100,
  image:"image.jpg"
  size:"S"
  quantity: 2,
  stock: 5,
});
```

---

## 🧱 Tecnologías

- React  
- Tailwind css 
- TypeScript  
- Context API  
- Vite / Next.js  

---
