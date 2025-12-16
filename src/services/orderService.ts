// ============================================
// ORDER SERVICE - DUMMY BACKEND
// ============================================
// TODO: Replace with real backend API calls
// This service mocks order management functionality
// ============================================

export interface Order {
  id: string;
  date: string;
  address: string;
  format: string;
  scale: string;
  orientation: string;
  fileFormats: string[];
  total: number;
  status: "completed" | "pending" | "processing";
  downloadLinks?: {
    pdf?: string;
    dxf?: string;
  };
}

const MOCK_ORDERS_KEY = "lageplaner_mock_orders";

// Helper to get orders for a user
export const getOrders = (userId: string): Order[] => {
  const allOrders = localStorage.getItem(MOCK_ORDERS_KEY);
  const ordersMap: Record<string, Order[]> = allOrders ? JSON.parse(allOrders) : {};
  return ordersMap[userId] || [];
};

// Helper to save an order
export const saveOrder = (userId: string, order: Omit<Order, "id" | "date" | "status">): Order => {
  const allOrders = localStorage.getItem(MOCK_ORDERS_KEY);
  const ordersMap: Record<string, Order[]> = allOrders ? JSON.parse(allOrders) : {};
  
  const newOrder: Order = {
    ...order,
    id: `ORD-${Date.now()}`,
    date: new Date().toISOString(),
    status: "completed",
    downloadLinks: {
      pdf: order.fileFormats.includes("pdf") ? `/downloads/lageplan-${Date.now()}.pdf` : undefined,
      dxf: order.fileFormats.includes("dxf") ? `/downloads/lageplan-${Date.now()}.dxf` : undefined,
    },
  };
  
  if (!ordersMap[userId]) {
    ordersMap[userId] = [];
  }
  ordersMap[userId].unshift(newOrder);
  
  localStorage.setItem(MOCK_ORDERS_KEY, JSON.stringify(ordersMap));
  
  console.log("📦 [DUMMY ORDER SERVICE] Order saved:", newOrder);
  
  return newOrder;
};

// Format price in EUR
export const formatPrice = (price: number): string => {
  return `${price.toFixed(2).replace(".", ",")} €`;
};
