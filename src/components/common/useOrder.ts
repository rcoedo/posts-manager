import { useCallback, useState } from "react";

export enum Order {
  ASC = 1,
  DESC = -1,
}

export const useOrder = <T>(compareFn: (x: T, y: T) => 1 | -1 | 0, initialState = Order.DESC) => {
  const [order, setOrder] = useState<Order>(initialState);

  const setOrderAsc = useCallback(() => setOrder(Order.ASC), [setOrder]);
  const setOrderDesc = useCallback(() => setOrder(Order.DESC), [setOrder]);

  const compare = (x: T, y: T) => {
    return compareFn(x, y) * order;
  };

  return { compare, setOrderAsc, setOrderDesc };
};
