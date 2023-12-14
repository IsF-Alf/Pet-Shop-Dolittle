const { createApp } = Vue;

createApp({
  data() {
    return {
      productos: [],
      prodFarm: [],
      valueSearch: ``,
      filtrados: [],
      carrito: [],
      stock: 0,
      precioTotal: 0,
    };
  },

  created() {
    fetch(`https://mindhub-xj03.onrender.com/api/petshop`)
      .then((respuesta) => respuesta.json())
      .then((info) => {
        this.productos = info;
        this.prodFarm = this.productos.filter(
          (producto) => producto.categoria == "farmacia"
        );
        this.filtrados = this.prodFarm;
        console.log(this.productos);
        console.log(this.prodFarm);

        this.carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        console.log(this.carrito);

        JSON.stringify(this.carrito);
        console.log(this.carrito);

        for (producto of this.carrito) {
          console.log(producto);
          this.precioTotal += producto.precio;
        }

        for (producto of this.carrito) {
          console.log(producto);
          this.precioIndividual += producto.precio;
        }

        console.log(this.precioIndividual);
      })
      .catch((err) => console.log(err));
  },
  methods: {
    filtroSearch() {
      this.filtrados = this.prodFarm.filter((producto) =>
        producto.producto.toLowerCase().includes(this.valueSearch.toLowerCase())
      );
    },

    addCar(producto) {
      if (!this.carrito.includes(producto._id)) {
        this.carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(this.carrito));
      }
      producto.disponibles -= 1;
      this.precioTotal += producto.precio;
      producto.disponibles;
    },

    sacarCar(producto) {
      console.log(producto);
      let indice = this.carrito.findIndex(productoCarrito => productoCarrito._id == producto._id)
      this.carrito.splice(indice, 1)
      
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
      producto.disponibles += 1
      this.precioTotal-=producto.precio
    },
  },
}).mount("#app");
