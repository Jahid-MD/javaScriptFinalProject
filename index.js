
let orderList=JSON.parse(localStorage.getItem("product-list"))
console.log("orderList==>",orderList)
if(orderList==null){
  orderList=[]
}

//Display count on cart
function displayCount(){
  let count=0;
  for(i=0;i<orderList.length;i++){
    count=count+orderList[i]["count"]
  }
  $("#count").text(count)
}
displayCount()

//RenderCard on Homepage
function renderCards(){
        let clothGrid=$("#clothing-grid")
        let accessoriesGrid=$("#accessories-grid")
      $.get(" https://5d76bf96515d1a0014085cf9.mockapi.io/product",function(response){
        console.log(response)
        console.log(response.length)
        var link="https://5d76bf96515d1a0014085cf9.mockapi.io/product/"
          for(let i=0;i<response.length;i++){
                let productCard=$("<div>")
                productCard.addClass("product-card")
                productCard.attr("value",`${response[i]["id"]}`)
                productCard.attr("onclick",`renderProductDetails(data,${response[i]["id"]})`)
                let imageProduct=$("<img>")
                imageProduct.attr("src",`${response[i]["preview"]}`)
                productCard.append(imageProduct)

                let productMeta=$("<div>")
                productMeta.addClass("product-meta")
                
                productMeta.html ( `<h4>${response[i]["name"]}</h4>
                <h5>${response[i]["brand"]}</h5>
                <p>${response[i]["price"]}</p>`)

                productCard.append(productMeta)
                if(response[i]["isAccessory"]===true){
                    accessoriesGrid.append(productCard)
                }
                else
                clothGrid.append(productCard)
             }

        
})
   
}

function renderHomepage(){
    cleanScreen()
    renderSlider();
    let mainBlock=$("main")
    let homepage=$("<div>")
    homepage.attr("id","homepage")
    homepage.html(` <h3 class="section-heading">Clothing for Men and Women</h3>
    <div id="clothing-grid"class=product-grid>
        
    </div>
    <h3 class="section-heading">Accessories for Men and Women</h3>
    <div id="accessories-grid"class=product-grid>
         
    </div>`)
    mainBlock.append(homepage)
    renderCards()
}
renderHomepage()

function cleanScreen(){
    $("main").html("")
}


//Render ProductDetailsPage

var data="https://5d76bf96515d1a0014085cf9.mockapi.io/product/"
function renderProductDetails(data,value){
  data=data+value;
  let mainBlock=$("main")
  cleanScreen()
  navigation()
  let detailsSection=$("<section>")
  detailsSection.attr("id","product")
  
    $.get(`${data}`,function(res){
      let response=res;
      let leftColumn=$("<div>")
      leftColumn.addClass("left-column")
    
      leftColumn.html(`<img id="product-image" src=${response["preview"]} alt="Product Image">`)
    
      detailsSection.append(leftColumn)
    
      let rightColumn=$("<div>")
      rightColumn.addClass("right-column")
      
    
      rightColumn.html(
        `
        <div class="product-description">
                        <h1>${response["name"]} </h1>
                        <h4>${response["brand"]}</h4>
                        <h3>
                            Price: Rs 
                            <span id="price">${response["price"]}</span>
                        </h3>
                        <div class="description">
                            <h3>Description</h3>
                            <p>${response["description"]}</p>
                        </div>
                        <div class="product-preview">
                            <h3>Product Preview</h3>
                            <div class="preview-container">
                                <img id="1" onclick='renderImage("${response["photos"][0]}","1")', class="preview-image active" src=${response["photos"][0]} alt="">

                                <img id="2" onclick='renderImage("${response["photos"][1]}","2" )', class="preview-image" src=${response["photos"][1]} alt="">

                                <img id="3" onclick='renderImage("${response["photos"][2]}","3")', class="preview-image" src=${response["photos"][2]} alt="">

                                <img id="4" onclick='renderImage("${response["photos"][3]}","4")' class="preview-image" src=${response["photos"][3]} alt="">

                                <img id="5" onclick='renderImage("${response["photos"][4]}","5")' class="preview-image" src=${response["photos"][4]} alt="">
                            </div>
                        </div>
        
                    </div>
        `
      )
      let addToCart=$("<div>")
      addToCart.attr("id","add-to-cart")
      addToCart.addClass("button-wrapper")
      addToCart.html(`<button>Add to Cart</button>`)
        console.log("response",response)
      addToCart.click(function(){
        orderDetails(response)
        
      })
      
      rightColumn.append(addToCart)
      detailsSection.append(rightColumn)
      mainBlock.append(detailsSection)
      
      $("h1").css({
      
        "margin": 0,
        "padding": 0,
        "box-sizing": "border-box"
      
    })

  })

  

}
  
function renderImage(photo,num){
  productImage=$("#product-image")
  productImage.attr("src",`${photo}`)
  
  $('.preview-container img').removeClass('active')
  $(`#${num}`).addClass('active')

}
// orderList=[]
// if(localStorage.getItem("product-list")==null){
//   orderList=[]
// }
// else{
//   orderList=JSON.parse(localStorage.getItem("product-list"))
// }

function orderDetails(data){
  // console.log("data enter")
  // console.log(data)
  navigation()
  console.log(orderList)
  console.log(orderList.length)
  let position;
  // if(orderList.length==0){
  //   orderList.push(data);
  //   orderList[0].count=1
  // }
  
  for(i=0;i<orderList.length;i++){
    console.log(data["id"])
    console.log(orderList[i]["id"])
    if(data["id"]==orderList[i]["id"]){
      position=i
      console.log("postion changed")
      break
    }
    else{
      position=-1  
      console.log("postion didn't changed")    
    }
  
}
  if(position>-1){
    orderList[position].count=orderList[position].count+1;
    console.log("counted")
  }
  else{
    data.count=1
    orderList.push(data);
    console.log("added")
  }
  localStorage.setItem("product-list",JSON.stringify(orderList))
  updateOrders(orderList)
  updateCount(orderList)
  console.log(orderList)
 }

 function updateCount(data){
   let count=0;
   console.log(data)
   
   for(i=0;i<data.length;i++){
     count=count+data[i].count;
     
   }
   console.log("count",count)
  $("#count").text(count);
 }
 function updateOrders(data){
   orderList=data;
  //  console.log(orders)
 }

 


$("#cart").click(function(){
  let checkOutData=JSON.parse(localStorage.getItem("product-list"))
  console.log(checkOutData)
  renderCheckOutPage(checkOutData)
})

function renderCheckOutPage(data){
  cleanScreen()
  navigation()
  console.log(data)
  if (data==null){
    data=[]
  }
  let checkoutPage =$("<div>")
  checkoutPage.attr("id","check-out-page")

  checkoutPage.html(`<h1 id="main-heading">Checkout</h1>`)

  let CheckOutContent=$("<div>")
  CheckOutContent.attr("id","check-out-content")


  let leftSection=$("<div>")
  leftSection.attr("id","section-heading")
  leftSection.html(` <h3 class="section-heading">Total Items: <Span>0</Span></h3>`)

  let totalAmount=0;
  
  for(i=0;i<data.length;i++){
    console.log(data.length)
    totalAmount=totalAmount+(data[i].price*data[i].count);
    let orderItems=$("<div>")
    orderItems.addClass("order-item")
    orderItems.html(`<div>
    <img class="order-item-img"src=${data[i].preview} alt="">
    </div>
    <div>
    <h3>
        ${data[i].name}
    </h3>
    <p>x${data[i].count}</p>
    <p>Amount: Rs <span id="item-count">${data[i].price}</span></p>
    </div>`)
    leftSection.append(orderItems)

    
  }


  
  let rightSection=$("<div>")
  rightSection.addClass("right-section")
  rightSection.html(`<div id="amount-box">
  <h3 class="section-heading">Total Amount</h3>
  <p>Amount: Rs <span id="total-amount">${totalAmount}</span></p>
  <button id="btn-place-order">Place Order</button>
  </div>`)



  CheckOutContent.append(leftSection)
  CheckOutContent.append(rightSection)
  checkoutPage.append(CheckOutContent)
  $("main").append(checkoutPage)
  
  $("#btn-place-order").click(function(){
    cleanScreen()
    navigation()
    orderList=[]
    localStorage.clear()
   $("#count").html(0)
    let mainBlock=$("main").html(`<div id="main-wrapper">
    <div id="tick-wrapper">
        <img src="https://test-hosting-8f9bf.web.app/assets/white-tick.png">
    </div>
    <h1 class="main-heading">Order Placed Successfully!!</h1>
    <p class="section-heading">We have sent you an email with the order details</p>
</div>`)
  })
  
}

function navigation(){
  $(".home-link").attr("href","./index.html")
}


function renderSlider(){
  $("main").html(`
  <div class="contain">
    <div id="owl-carousel" class="owl-carousel owl-theme">
      <img src="https://imgur.com/KtGxwnN.png" class="item">
      <img src="https://imgur.com/p0wdadG.png" class="item">
      <img src="https://imgur.com/KtGxwnN.png" class="item">
      <img src="https://imgur.com/p0wdadG.png" class="item">
    </div>
  </div>
`)
}


 
$('#owl-carousel').owlCarousel({
  loop: true,
  margin: 30,
  dots: true,
  items: 1,
  autoplay:true,
  autoplayTimeout:5000,
  autoplayHoverPause:true
})
