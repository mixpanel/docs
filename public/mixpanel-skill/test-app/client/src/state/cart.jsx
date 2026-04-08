import React, { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { productId, qty = 1, grind = "Whole Bean" } = action;
      const existing = state.items.find((i) => i.productId === productId && i.grind === grind);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i === existing ? { ...i, qty: i.qty + qty } : i
          )
        };
      }
      return { ...state, items: [...state.items, { productId, qty, grind }] };
    }
    case "REMOVE": {
      const { index } = action;
      return { ...state, items: state.items.filter((_, i) => i !== index) };
    }
    case "SET_QTY": {
      const { index, qty } = action;
      const q = Math.max(1, Number(qty || 1));
      return { ...state, items: state.items.map((it, i) => (i === index ? { ...it, qty: q } : it)) };
    }
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  const value = useMemo(() => ({
    items: state.items,
    add: (productId, qty, grind) => dispatch({ type: "ADD", productId, qty, grind }),
    remove: (index) => dispatch({ type: "REMOVE", index }),
    setQty: (index, qty) => dispatch({ type: "SET_QTY", index, qty }),
    clear: () => dispatch({ type: "CLEAR" })
  }), [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
