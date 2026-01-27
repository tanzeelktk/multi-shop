import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext()
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart")
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (product) => {
        let prev = [...cart]
        const existing = prev.find(item => item.id === product.id)

        if (existing) {
            prev = prev.map((item,) => {
                return (
                    item.id === product.id ? { ...item, qty: item.qty + product.qty } : item
                )
            })
        } else {
            prev.push(product)
        }
        console.log("product Added to cart")
        setCart(prev)
    }

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }

    const updateQty = (productId, qty) => {
        setCart(prev => prev.map((item) => {
            return (
                item.id === productId ? { ...item, qty: qty } : item
            )
        }))
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty }}>{children}</CartContext.Provider>
    )
}

