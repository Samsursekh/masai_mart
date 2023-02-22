 const data = JSON.parse(localStorage.getItem('heartItem')) || [];
 const displaData = (data) => {
    const container = document.getElementById("container");

    data.forEach(element => {
        const card = document.createElement("div");
        card.setAttribute("class", "cards");

      let heading1 = document.createElement("h3");
      let heading2 = document.createElement("h3");
      let image = document.createElement("img");
      image.setAttribute("class", "images");
      image.src =
        "https://images.unsplash.com/photo-1610130383669-95917c70ca20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60";
      let category = document.createElement("h4");
      let price = document.createElement("h4");
      let wishlist = document.createElement("p");
      wishlist.setAttribute("class", "fa fa-heart");
      wishlist.addEventListener("click", () => {
        addedToCartFunction(element, wishlist);
      });

      heading1.innerText = `Name : ${element.brand}`;
      heading1.style.color = heading2.innerText = `Title : ${element.title}`;
      category.innerText = `Category : ${element.category}`;
      price.innerText = `Price : ${element.price}`;
      card.append(image, heading1, heading2, category, price, wishlist);
        container.append(card);
    });
 }

 const addedToCartFunction = (element, wishList) => {
    const heart = wishList;
    // console.log(heart.style.color, "Heart getting or not")
    const cart = JSON.parse(localStorage.getItem("heartItem")) || [];
    const productIndex = cart.findIndex((item) => item.id === element.id);
    if (productIndex > -1) {
      cart.splice(productIndex, 1);
    //   fetchData(data)
      heart.style.color = "blue";
      alert("Removed from withlist");
      window.location.reload();
    //   fetchData(data)
    } else {
      cart.push(element);
      heart.style.color = "red";
      alert("Added to withlist");
      window.location.reload();
    }
    // cart.push(element);
    localStorage.setItem("heartItem", JSON.stringify(cart));
    
  };
//  console.log(data);


displaData(data);