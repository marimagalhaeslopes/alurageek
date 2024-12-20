import { conectaApi } from "./conectApi.js";

const productsContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");


function createCard({ name, price, image, id}) {
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
					<img src="./img/trashIcon.svg" alt="Eliminar">
				</button>
			</div>
		</div>
	`;

  return card;
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
    await conectaApi.createProduct(name, price, image);
    


    productsContainer.appendChild(createCard({ name, price, image}));
    form.reset()
  } catch (err) {
    console.error("Erro ao cadastrar o produto:", err);
  }
});

productList();
