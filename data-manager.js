// data-manager.js
class DataManager {
    constructor() {
        this.initializeData();
    }

    // 초기 데이터 설정
    initializeData() {
        if (!localStorage.getItem('products')) {
            const initialProducts = [
                {
                    id: 1,
                    name: '귀여운 고양이 스티커 세트',
                    category: 'stickers',
                    price: 15000,
                    stock: 50,
                    image: 'cat-stickers.jpg',
                    description: '다양한 표정의 귀여운 고양이 스티커',
                    status: 'active'
                },
                // 더 많은 상품들...
            ];
            this.saveProducts(initialProducts);
        }

        if (!localStorage.getItem('orders')) {
            this.saveOrders([]);
        }

        if (!localStorage.getItem('customers')) {
            this.saveCustomers([]);
        }
    }

    // 상품 관련
    getProducts() {
        return JSON.parse(localStorage.getItem('products') || '[]');
    }

    saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }

    addProduct(product) {
        const products = this.getProducts();
        product.id = Date.now(); // 간단한 ID 생성
        products.push(product);
        this.saveProducts(products);
        return product;
    }

    updateProduct(id, updatedProduct) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            this.saveProducts(products);
            return products[index];
        }
        return null;
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const filteredProducts = products.filter(p => p.id !== id);
        this.saveProducts(filteredProducts);
    }

    // 주문 관련
    getOrders() {
        return JSON.parse(localStorage.getItem('orders') || '[]');
    }

    saveOrders(orders) {
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    addOrder(order) {
        const orders = this.getOrders();
        order.id = Date.now();
        order.createdAt = new Date().toISOString();
        orders.push(order);
        this.saveOrders(orders);
        return order;
    }

    // 고객 관련
    getCustomers() {
        return JSON.parse(localStorage.getItem('customers') || '[]');
    }

    saveCustomers(customers) {
        localStorage.setItem('customers', JSON.stringify(customers));
    }
}

// 전역 데이터 매니저 인스턴스
const dataManager = new DataManager();
