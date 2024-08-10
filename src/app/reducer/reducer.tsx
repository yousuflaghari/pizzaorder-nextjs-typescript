import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/interface";

export interface PizzaItem {
  name: string;
  quantity: number;
  userId: string;
  totalPrice: number;
}

export interface PizzaOrder {
  customerName: string;
  items: PizzaItem[];
}

export interface PizzaState {
  currentCustomer: string;
  pizzaData: any[];
  order: PizzaOrder[];
  userId: string;
  loading: boolean;
  error: string | null;
}

const initialState: PizzaState = {
  currentCustomer: "",
  pizzaData: [],
  order: [],
  userId: "",
  loading: false,
  error: null,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzaData: (state, action: PayloadAction<any[]>) => {
      state.pizzaData = action.payload;
      state.loading = false;
    },
    setcustomername: (state, action: PayloadAction<string>) => {
      state.currentCustomer = action.payload;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        name: string;
        userId: string;
        quantity: number;
        price: number;
      }>
    ) => {
      const { name, userId, quantity, price } = action.payload;
      const customerName = state.currentCustomer;
      const orderIndex = state.order.findIndex(
        (order) => order.customerName === customerName
      );
      if (orderIndex !== -1) {
        const itemIndex = state.order[orderIndex].items.findIndex(
          (item) => item.name === name && item.userId === userId
        );
        if (itemIndex !== -1) {
          const updatedItems = [...state.order[orderIndex].items];
          updatedItems[itemIndex] = {
            ...updatedItems[itemIndex],
            quantity: quantity,
            totalPrice: quantity * price,
          };
          state.order[orderIndex].items = updatedItems;
        }
      }
      state.loading = false;
    },
    addItemToOrder: (
      state,
      action: PayloadAction<{
        name: string;
        quantity: number;
        price: number;
        userId: string;
      }>
    ) => {
      const { name, quantity, price, userId } = action.payload;
      const customerName = state.currentCustomer;
      const orderIndex = state.order.findIndex(
        (order) => order.customerName === customerName
      );

      if (orderIndex !== -1) {
        const itemIndex = state.order[orderIndex].items.findIndex(
          (item) => item.name === name && item.userId === userId
        );

        if (itemIndex !== -1) {
          state.order[orderIndex].items[itemIndex].quantity += quantity;
          state.order[orderIndex].items[itemIndex].totalPrice =
            state.order[orderIndex].items[itemIndex].quantity * price;
        } else {
          state.order[orderIndex].items.push({
            name,
            quantity,
            userId,
            totalPrice: quantity * price,
          });
        }
      } else {
        state.order.push({
          customerName,
          items: [
            {
              name,
              quantity,
              userId,
              totalPrice: quantity * price,
            },
          ],
        });
      }
      state.loading = false;
    },
    attempt: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    manageerror: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    removeItemFromOrder: (
      state,
      action: PayloadAction<{ name: string; userId: string }>
    ) => {
      const { name, userId } = action.payload;
      const customerName = state.currentCustomer;
      const orderIndex = state.order.findIndex(
        (order) => order.customerName === customerName
      );
      if (orderIndex !== -1) {
        const itemIndex = state.order[orderIndex].items.findIndex(
          (item) => item.name === name && item.userId === userId
        );
        if (itemIndex !== -1) {
          state.order[orderIndex].items.splice(itemIndex, 1);
          if (state.order[orderIndex].items.length === 0) {
            state.order.splice(orderIndex, 1);
          }
        }
      }
      state.loading = false;
    },
  },
});

// Export actions
export const {
  setPizzaData,
  updateQuantity,
  addItemToOrder,
  setcustomername,
  removeItemFromOrder,
  attempt,
  manageerror,
} = pizzaSlice.actions;

export default pizzaSlice.reducer;

// Selectors with proper types
export const selectOrdersByBookerName =
  (bookername: string) => (state: RootState) => {
    const order = state.pizza.order.find(
      (order) => order.customerName === bookername
    );
    return order ? order.items : [];
  };

export const selectPizzaQuantity =
  (name: string, userId: string) => (state: RootState) => {
    const orderItems = state.pizza.order.reduce<PizzaItem[]>((acc, order) => {
      const item = order.items.find(
        (item) => item.name === name && item.userId === userId
      );
      if (item) acc.push(item);
      return acc;
    }, []);
    return orderItems.length > 0 ? orderItems[0].quantity : 1;
  };

export const selectPizzaData = (state: RootState) => {
  return state.pizza.pizzaData;
};

export const selectTotalPriceByBookerName =
  (bookername: string) => (state: RootState) => {
    const order = state.pizza.order.find(
      (order) => order.customerName === bookername
    );
    if (!order) return 0;
    return order.items.reduce((total, item) => total + item.totalPrice, 0);
  };

export const selectCurrentCustomerItems = (state: RootState) => {
  return state.pizza.order.find(
    (singleOrder) => singleOrder.customerName === state.pizza.currentCustomer
  )?.items;
};
