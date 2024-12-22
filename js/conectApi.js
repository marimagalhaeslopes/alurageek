export const conectaApi = {
  async productList() {
    const response = await fetch("http://localhost:3000/products");
    if (!response.ok) {
      throw new Error("Erro ao buscar a lista de produtos");
    }
    return response.json();
  },
  async createProduct(name, price, image) {
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, image }),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar o produto");
    }
    return response.json();
  },
  async deleteProduct(id) {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar o produto com ID ${id}`);
    }
  },
};
