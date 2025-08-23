// 1. Layered Architecture (Arquitectura en Capas)
// Enunciado: Crea una arquitectura en capas donde exista una capa de persistencia que simule una base de datos de productos,
// una capa de servicio que contenga la lógica de negocio para calcular el precio con descuento,
// y una capa de presentación que muestre el nombre del producto y su precio final.

class ProductRepository {
  getProductById(id) {
    return { id, name: "Celular", price: 1000 };
  }
}

class ProductService {
  constructor(repo) {
    this.repo = repo;
  }
  getDiscountedPrice(id, discount) {
    const product = this.repo.getProductById(id);
    return product.price - (product.price * discount) / 100;
  }
}

const repo = new ProductRepository();
const service = new ProductService(repo);
console.log("Producto con descuento:", service.getDiscountedPrice(1, 10)); // 900

// 2. Hexagonal Architecture (Puertos y Adaptadores)
// Enunciado: Implementa un sistema de pagos donde la lógica de negocio esté aislada
// y se puedan usar diferentes pasarelas de pago mediante adaptadores.

class PaymentService {
  constructor(paymentGateway) {
    this.paymentGateway = paymentGateway;
  }
  process(amount) {
    return this.paymentGateway.charge(amount);
  }
}

class PaypalAdapter {
  charge(amount) {
    return `Pago de $${amount} procesado con PayPal`;
  }
}

const payment = new PaymentService(new PaypalAdapter());
console.log(payment.process(200)); // Pago de $200 procesado con PayPal

// 3. Clean Architecture
// Enunciado: Diseña un sistema donde las dependencias apunten siempre hacia el núcleo.
// Simula un caso en el que un usuario pueda ser registrado desde la capa externa,
// pero la lógica de negocio central (núcleo) maneja la validación.

class UserEntity {
  constructor(name) {
    if (!name) throw new Error("El nombre es obligatorio");
    this.name = name;
  }
}

class UserUseCase {
  createUser(name) {
    return new UserEntity(name);
  }
}

class UserController {
  constructor(useCase) {
    this.useCase = useCase;
  }
  register(name) {
    return this.useCase.createUser(name);
  }
}

const controller = new UserController(new UserUseCase());
console.log(controller.register("Laura")); // UserEntity { name: 'Laura' }

// 4. CQRS (Command Query Responsibility Segregation)
// Enunciado: Separa la lógica de lectura y escritura de usuarios.
// Crea un servicio de comandos para crear usuarios y un servicio de consultas para obtenerlos.

class UserCommandService {
  constructor(db) {
    this.db = db;
  }
  createUser(user) {
    this.db.push(user);
    return "Usuario creado";
  }
}

class UserQueryService {
  constructor(db) {
    this.db = db;
  }
  getUser(id) {
    return this.db.find((u) => u.id === id);
  }
}

const database = [];
const commandService = new UserCommandService(database);
const queryService = new UserQueryService(database);

console.log(commandService.createUser({ id: 1, name: "Pedro" }));
console.log(queryService.getUser(1));

// 5. Event Sourcing
// Enunciado: Implementa un sistema que guarde todos los eventos relacionados con un pedido.
// Simula la creación y actualización de un pedido guardando cada evento.

let events = [];

function applyEvent(event) {
  events.push(event);
}

applyEvent({ type: "ORDER_CREATED", data: { id: 1, product: "Laptop" } });
applyEvent({ type: "ORDER_UPDATED", data: { id: 1, product: "Laptop Gamer" } });

console.log(events);

// 6. Microservices Pattern
// Enunciado: Simula una arquitectura de microservicios con dos servicios independientes
// (Inventario y Facturación) que se comuniquen mediante una función simulada de API Gateway.

class InventoryService {
  checkStock(product) {
    return product === "Laptop" ? "En stock" : "Agotado";
  }
}

class BillingService {
  generateInvoice(product) {
    return `Factura generada para ${product}`;
  }
}

function apiGateway(service, action, data) {
  return service[action](data);
}

const inventory = new InventoryService();
const billing = new BillingService();

console.log(apiGateway(inventory, "checkStock", "Laptop"));
console.log(apiGateway(billing, "generateInvoice", "Laptop"));

// 7. Domain-Driven Design (DDD)
// Enunciado: Modela un dominio de órdenes donde exista una entidad "Orden",
// un objeto de valor "Precio", y un agregado que combine ambos.

class Price {
  constructor(amount) {
    this.amount = amount;
  }
}

class Order {
  constructor(id, product, price) {
    this.id = id;
    this.product = product;
    this.price = price;
  }
}

class OrderAggregate {
  constructor(order) {
    this.order = order;
  }
  getSummary() {
    return `Orden ${this.order.id}: ${this.order.product} - $${this.order.price.amount}`;
  }
}

const order = new Order(1, "Tablet", new Price(500));
const aggregate = new OrderAggregate(order);
console.log(aggregate.getSummary());

// 8. Dependency Injection (DI)
// Enunciado: Implementa un servicio que dependa de un repositorio, pero en vez de crearlo dentro,
// inyecta el repositorio desde fuera.

class UserRepository {
  getUser() {
    return { id: 1, name: "Camila" };
  }
}

class UserServiceDI {
  constructor(repo) {
    this.repo = repo;
  }
  showUser() {
    return this.repo.getUser();
  }
}

const repoDI = new UserRepository();
const serviceDI = new UserServiceDI(repoDI);
console.log(serviceDI.showUser());

// 9. Composition Root
// Enunciado: Simula un archivo principal que inicializa todas las dependencias de la aplicación
// (repositorios, servicios y controladores).

class ProductRepo {
  getProduct() {
    return { id: 1, name: "Teclado" };
  }
}

class ProductServiceCR {
  constructor(repo) {
    this.repo = repo;
  }
  showProduct() {
    return this.repo.getProduct();
  }
}

class ProductController {
  constructor(service) {
    this.service = service;
  }
  display() {
    return this.service.showProduct();
  }
}

// Composition Root (punto de entrada)
const repoCR = new ProductRepo();
const serviceCR = new ProductServiceCR(repoCR);
const controllerCR = new ProductController(serviceCR);

console.log(controllerCR.display());

// 10. Bounded Contexts
// Enunciado: Implementa dos contextos independientes (Inventario y Facturación).
// Ambos manejan conceptos distintos, pero se comunican mediante un evento simulado.

class InventoryContext {
  checkAvailability(product) {
    return product === "Mouse" ? "Disponible" : "No disponible";
  }
}

class BillingContext {
  generateInvoice(product) {
    return `Factura emitida para ${product}`;
  }
}

const inventoryContext = new InventoryContext();
const billingContext = new BillingContext();

const productToBuy = "Mouse";
if (inventoryContext.checkAvailability(productToBuy) === "Disponible") {
  console.log(billingContext.generateInvoice(productToBuy));
}
