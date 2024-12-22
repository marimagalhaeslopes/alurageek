import { conectaApi } from "./conectApi.js";

const productsContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard({ name, price, image, id }) {
  const card = document.createElement("div");
  card.className = "container-produtos";

  card.innerHTML = `
    <div class="img-container">
      <img src="${image}" alt="${name}">
    </div>
    <div class="card-container--info">
      <p>${name}</p>
      <div class="card-container--value">
        <p>$ ${price}</p>
        <button class="delete-button" data-id="${id}">
          <img src="./img/trash.png" alt="Eliminar">
        </button>
      </div>
    </div>
  `;
  addDeleteEvent(card, id);
  return card;
}

function addDeleteEvent(card, id) {
  const deleteButton = card.querySelector(".delete-button");
  deleteButton.addEventListener("click", async () => {
    try {
      await conectaApi.deleteProduct(id); 
      card.remove();
      console.log(`Produto com ID ${id} foi deletado`);
    } catch (error) {
      console.error(`Erro ao deletar o produto com ID ${id}:`, error);
    }
  });
}

async function productList() {
  try {
    const listApi = await conectaApi.productList();
    listApi.forEach((element) => {
      productsContainer.appendChild(createCard(element));
    });
  } catch (err) {
    console.error("Erro ao carregar os produtos:", err);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const image = document.querySelector("[data-image]").value;

  try {
    const newProduct = await conectaApi.createProduct(name, price, image);
    productsContainer.appendChild(createCard({ ...newProduct, name, price, image }));
    form.reset();
  } catch (err) {
    console.error("Erro ao cadastrar o produto:", err);
  }
});

productList();
