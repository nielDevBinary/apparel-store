import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Link } from "react-router-dom";


export const CartDrawer = () => {

  const {cartItems, increaseItemQuantity, decreaseCartQuantity, isOpen, setIsOpen, removeFromCart, totalAmount} = useShoppingCart()
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <ShoppingBag size={20} strokeWidth={1.5} />
                <h2 className="text-xl font-serif">Shopping bag</h2>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X />
            </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
            { cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                        <ShoppingBag size={24} className="text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-light">Your bag is empty</p>
                    <button
                        
                        className="text-xs uppercase tracking-widest font-bold border-b border-black pb-1"
                    >
                        Start Shopping
                    </button>
                </div>
            ): (
                cartItems.map((item, index) => (
                  <div key={`${item.productId}-${index}`} className="flex gap-4 group">
                <div className="w-24 h-32 bg-gray-50 overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium leading-tight line-clamp-2">
                        <Link to={`/product/${item.productId}`} >
                          {item.name}
                        </Link>
                      </h3>
                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => removeFromCart(item.variantId) }
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Talla - {item.size}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded">
                      <button
                        onClick={() => decreaseCartQuantity(item.variantId)}
                        className="p-1 hover:bg-gray-50"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs">{item.quantity}</span>
                      <button
                        onClick={() => increaseItemQuantity(item.variantId)}
                        className="p-1 hover:bg-gray-50"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
                ))
            )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 space-y-4 bg-gray-50/50">
            <div className="flex justify-between items-end">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500">Subtotal</span>
              <span className="text-2xl font-serif">S/{totalAmount}</span>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
              Shipping and taxes calculated at checkout
            </p>
            <button className="w-full bg-black text-white py-4 text-xs uppercase tracking-[0.3em] font-bold hover:bg-brand-dark transition-colors">
              Checkout
            </button>
          </div>
        )}


      </div>
    </>
  );
};
