export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return;

    const similarProduct = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (similarProduct) {
      similarProduct.count++;
      this.onProductUpdate(similarProduct);
    } else {
      const newItem = { product, count: 1 };
      this.cartItems.push(newItem);
      this.onProductUpdate(newItem);
    }
  }

  updateProductCount(productId, amount) {
    const similarProductIndex = this.cartItems.findIndex(
      (item) => item.product.id === productId
    );

    if (similarProductIndex >= 0) {
      const object = this.cartItems[similarProductIndex];
      object.count += amount;
      object.count === 0 && this.cartItems.splice(similarProductIndex, 1);
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, val) => sum + val.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.count,
      0
    );
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
