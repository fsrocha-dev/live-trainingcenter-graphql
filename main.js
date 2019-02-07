const listCars = document.querySelector('#listaCarros')
const detailsCar = document.querySelector('#detalheCarro')

function main(){
  const cars = `{
    cars{
      id,
      name,
      doors,
      price,
      photo
    }}`
  reqApi(cars).then(res => showListCar(res.cars))
}

function getOneCar(id){
  const carQuery = `{
    car(id: ${id}){
      id,
      name,
      doors,
      price,
      photo,
      manufacture,
      type
    }
  }`
  reqApi(carQuery).then(res => showCar(res.car))
}

function showCar(car){
  let template = `
    <div class="carro-item">
      <h1>${car.name}</h1>
      <img src="${car.photo}" alt="${car.name}">
      <ul class="carro-lista">
        <li>Preço: ${car.price}</li>
        <li>Ano: ${car.manufacture}</li>
        <li>Portas: ${car.doors}</li>
        <li>Estado: ${car.type}</li>
      </ul>
    </div>
  `
  detailsCar.innerHTML = template
}

function showListCar(cars){
  let template = ""

  cars.forEach(
    car =>
    (template += `
      <li class="carros-item" onclick="getOneCar('${car.id}')">
        <p>${car.name}</p>
        <p>${car.price}</p>
      </li>
    `)
  )
  listCars.innerHTML = `
    <ul class="carros">
        ${template}
    </ul>`
}

async function reqApi(query){
  let response = await fetch(`http://localhost:3000/car?query=${query}`)
  response = await response.json()
  return response.data
}

main()