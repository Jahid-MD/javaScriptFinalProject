var orders
var productList;
orders=JSON.parse(localStorage.getItem("product-list"))
if(orders==null){
  orders=[]
}
$("#count").text(orders.length)

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



var data="https://5d76bf96515d1a0014085cf9.mockapi.io/product/"
function renderProductDetails(data,value){
  data=data+value;
  let mainBlock=$("main")
  cleanScreen()
  
  let detailsSection=$("<section>")
  detailsSection.attr("id","product")
  
    $.get(`${data}`,function(res){
      var response=res;
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
                    <div id="add-to-cart" onclick=\'orderDetails(${JSON.stringify(response)})\' class="button-wrapper">
                        <button>Add to Cart</button>
                    </div>
        `
      )
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
let orderList=[]
if(localStorage.getItem("product-list")==null){
  orderList=[]
}
else{
  orderList=JSON.parse(localStorage.getItem("product-list"))
}

function orderDetails(data){
  console.log(data)
  console.log(orderList.length)
  if(orderList.length==0){
    orderList.push(data);
    orderList[0].count=1
  }
  else{
  for(i=0;i<orderList.length;i++){
    if(data["id"]==orderList[i]["id"]){
      orderList[i].count=orderList[i].count+1
    }
    else{
      console.log("hi")
      orderList.push(data);
      console.log(data)
      orderList[i].count=1
    }
  }
}
  localStorage.setItem("product-list",JSON.stringify(orderList))
  updateOrders(orderList)
  updateCount(orderList.length)
 }

 function updateCount(data){
   $("#count").text(data)
  
 }
 function updateOrders(data){
   orders=data;
   console.log(orders)
 }

 


$("#cart").click(function(){
  console.log(orderList)
  let productIdArr=[]
  for(i=0;i<orderList.length;i++){
    productIdArr.push(orderList[i]["id"])
  }
  console.log(productIdArr)
})
