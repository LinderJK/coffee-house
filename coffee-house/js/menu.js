class Menu {
  static menu = {};

  static menuParser () {
    fetch('./data/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error ('json not found');

        }
        return response.json();

      })
      .then(data => {
        Menu.menu = data;
        console.log (Menu.menu);
      })

  }
}
