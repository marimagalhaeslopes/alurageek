async function productList() {
    const conexao = await fetch("http://localhost:3000/products");
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

async function createProduct(name, price, image) {
    const conexao = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, image }),
    });
  
    if (!conexao.ok) {
      throw new Error("Não foi possível cadastrar o produto");
    }
  }

export const conectaApi = {
    productList,
    createProduct
}