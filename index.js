var allData = [];
let Container = document.querySelector("#Container");

const dataFetchFunc = (orderBy = "") => {
  const url = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?orderBy=${orderBy}`;
  fetch(url)
    .then((res) => {
      let data = res.json();
      data.then((res) => {
        allData = res.data;
        allTheProductsFunc(allData);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
dataFetchFunc();

//Implement Filtering functionality Here

const handleSelect = () => {
  const filterItems = document.getElementById("category-selector").value;
  console.log(filterItems, "Checking Filter Items is there or not");
  const filteredList = allData.filter((elem) => {
    if(filterItems == []){
         allTheProductsFunc(allData);
         return "Empty";
    }
    return elem.category === filterItems;
   
  });
  console.log(filteredList);
  allTheProductsFunc(filteredList);
};

//Implement High to Low sorting Here

const sortLowToHigh = () => {
  // console.log(allData);
  allData.sort(function (a, b) {
    return a.price - b.price;
  });
  allTheProductsFunc(allData);
};

//Implement Low to High sorting Here

const sortHighToLow = () => {
  // console.log(allData);
  allData.sort(function (a, b) {
    return b.price - a.price;
  });
  allTheProductsFunc(allData);
};

const allTheProductsFunc = (allData) => {
  Container.innerHTML = "";
  let data = allData;

  data &&
    data.forEach((element) => {
      let card = document.createElement("div");
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
      Container.append(card);
    });
};

//added to cart Functionality

const addedToCartFunction = (element, wishList) => {
  const heart = wishList;
  // console.log(heart.style.color, "Heart getting or not")
  const cart = JSON.parse(localStorage.getItem("heartItem")) || [];
  const productIndex = cart.findIndex((item) => item.id === element.id);
  if (productIndex > -1) {
    cart.splice(productIndex, 1);
    heart.style.color = "blue";
    alert("Removed from withlist");
  } else {
    cart.push(element);
    heart.style.color = "red";
    alert("Added to withlist");
  }
  // cart.push(element);
  localStorage.setItem("heartItem", JSON.stringify(cart));
};
