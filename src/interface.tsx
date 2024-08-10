export interface PizzaItem {
  name: string;
  quantity: number;
  price: string;
  userId: string;
  totalPrice: number;
}
export interface Pizza {
  id: string;
  name: string;
  ingredients: string[];
  price: number;
}
export interface PizzaOrder {
  customerName: string;
  items: PizzaItem[];
}
export interface ItemProps {
  image: string;
  name: string;
  ingredients: string[];
  userId: string;
  price: number;
}
export interface CartItemProps {
  id: string;
  name: string;
  quantity: number;
  price: number;
  userId: string;
}
export interface PizzaState {
  currentCustomer: string;
  pizzaData: any[];
  order: PizzaOrder[];
  userId: string;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  pizza: PizzaState;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  userId: string;
  totalPrice: number;
}

export interface Order {
  customerName: string;
  items: OrderItem[];
}
export interface Item {
  name: string;
  quantity: number;
  userId: string;
  price: string;
}
