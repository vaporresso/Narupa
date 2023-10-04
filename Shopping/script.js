let onTopDiscountPercent = 15; // ปรับค่านี้ตามส่วนลดที่คุณต้องการให้

let product = [
    {    
        id: 1,
        img: "https://cdn.pixabay.com/photo/2014/04/02/16/21/high-heels-307038_1280.png",
        name: "shoe-black",
        price: 550,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse amet vero, quibusdam minima eveniet est", 
        type: "shoe"},
    {    id: 2,
        img: "https://cdn.pixabay.com/photo/2017/02/01/12/21/fashion-2030044_1280.png",
        name: "shoe-grey",
        price: 600,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse amet vero, quibusdam minima eveniet est", 
        type: "shoe"},
    {    id: 3,
        img: "https://cdn.pixabay.com/photo/2014/04/03/11/54/high-heels-312528_1280.png",
        name: "shoe-orange limited edition",
        price: 1500,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse amet vero, quibusdam minima eveniet est", 
        type: "shoe"},


    {    id: 4,
        img: "https://cdn.pixabay.com/photo/2016/03/31/19/19/cloth-1294908_1280.png",
        name: "Clothing-pink",
        price: 450,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse amet vero, quibusdam minima eveniet est", 
        type: "Clothing"},
    {    id: 5,
        img: "https://cdn.pixabay.com/photo/2014/03/24/13/42/fashion-294100_1280.png",
        name: "Clothing-yellow",
        price: 500,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse amet vero, quibusdam minima eveniet est", 
        type: "Clothing" },
    {    id: 6,
        img: "https://cdn.pixabay.com/photo/2012/04/02/13/28/dress-24492_1280.png",
        name: "Clothing-pink limited edition",
        price: 1700,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse amet vero, quibusdam minima eveniet est", 
        type: "Clothing"},


    {    id: 7,
        img: "https://cdn.pixabay.com/photo/2014/04/03/00/37/purse-308879_1280.png",
        name: "handbag",
        price: 1200,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse amet vero, quibusdam minima eveniet est", 
        type: "Accessories"},
    {    id: 8,
        img: "https://cdn.pixabay.com/photo/2016/02/02/17/04/watches-1175627_1280.png",
        name: "watch",
        price: 2500,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse amet vero, quibusdam minima eveniet est", 
        type: "Accessories"},
    {    id: 9,
        img: "https://cdn.pixabay.com/photo/2020/05/11/09/49/glasses-5157288_1280.png",
        name: "glasses",
        price: 1499,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse amet vero, quibusdam minima eveniet est", 
        type: "Accessories"},


    {    id: 10,
        img: "https://cdn.pixabay.com/photo/2016/07/16/13/40/smartphone-1521799_1280.png",
        name: "Mobile phone",
        price: 40000,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse amet vero, quibusdam minima eveniet est", 
        type: "Electronics"},
    {    id: 11,
        img: "https://cdn.pixabay.com/photo/2014/04/03/11/54/laptop-312499_1280.png",
        name: "Note-Book",
        price: 21000,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse amet vero, quibusdam minima eveniet est", 
        type: "Electronics"},
    {    id: 12,
        img: "https://cdn.pixabay.com/photo/2014/03/25/15/25/television-296783_1280.png",
        name: "TV",
        price: 4900,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse amet vero, quibusdam minima eveniet est", 
        type: "Electronics"}
    ]





    $(document).ready(() => {
        let html = "";
        for (let i = 0; i < product.length; i++) {
            html += `<div onclick="openProductDetail(${i})" class="product-item ${product[i].type}">
                        <img class="product-img" src="${product[i].img}" alt="">
                        <p style="font-size: 1.2vw;">${product[i].name}</p>
                        <p style="font-size: 0.9vw">${product[i].price} THB</p>
                    </div>`;
        }
        $("#productlist").html(html);
        
    })

    function searchproduct(param) {
        $(".product-item").css('display', 'none');
        if (param == 'all') {
            $(".product-item").css('display', 'block');
        } else {
            $("." + param).css('display', 'block');
        }
    }

    let productindex = 0;
    function openProductDetail(index){
        productindex=index;
        $("#modalDesc").css('display','flex')
        $("#mdd-img").attr('src',product[index].img);
        $("#mdd-name").text(product[index].name);
        $("#mdd-price").text("Price :" + product[index].price);
        $("#mdd-desc").html("description : <br>" + product[index].description);

    }

    function closeModal(){
        $(".modal").css('display','none')
    }

    let cart =[];
    function addtocart(){
        let pass = true;
        for (let i = 0; i < cart.length; i++) {
            if(productindex == cart[i].index){
                cart[i].count++;
                pass = false;
            
            }
            
        }if(pass){
            let obj ={
                index: productindex,
                id: product[productindex].id,
                name: product[productindex].name,
                price: product[productindex].price,
                img: product[productindex].img,
                count : 1

            };
            cart.push(obj)
        }
        console.log(cart);
        swal.fire({
            icon: "success",
            title: "Add "+product[productindex].name+' to cart'
        })
        $("#cartcout").css('display','flex')
    }

    function openCart(){
        $('#modalCart').css('display','flex')
        rendercart()
    }

    function openpayment(){
        $('#modalCart').css('display','none');
        $('#payment').css('display','flex');
        renderpayment();
        TotalPrice();
    }
    let sum=0
    function renderpayment() {
        if(cart.length>0){
            let html ='';
            for(let i=0; i<cart.length;i++){
                html += 
                `<div class="cartlist-item">
                    <div class="cartlist-left">
                        <img class="product-img"src="${cart[i].img}"alt="">
                        <div class="list-detail">
                            <p style="font-size: 1.5vw">${cart[i].name}</p>
                            <p id="price all" style="font-size: 1.2vw">จำนวน ${cart[i].count} pcs.</p>
                        </div>
                    </div>
                    <div class="cartlist-right">
                        <p id="countitems${i}" style="margin: 0 20px ; font-size:1.5vw;">${cart[i].price * cart[i].count} THB</p>
                    </div>
                </div>`
                sum += cart[i].price*cart[i].count;
                console.log(sum); 
            };

            html += `<p style="font-size: 1.5vw; text-align: right;">ยอดรวม: ${sum} THB</p>`;
           
            $("#mypayment").html(html);
    }}
    


    function rendercart(){
        if(cart.length>0){
            let html ='';
            for(let i=0; i<cart.length;i++){
                html += 
                `<div class="cartlist-item">
                    <div class="cartlist-left">
                        <img class="product-img"src="${cart[i].img}"alt="">
                        <div class="list-detail">
                            <p style="font-size: 1.5vw">${cart[i].name}</p>
                            <p id="price all" style="font-size: 1.2vw">${cart[i].price * cart[i].count} THB</p>
                        </div>
                    </div>
                    <div class="cartlist-right">
                        <button onclick="deinitem('-',${i})" class="btnc" style="font-size:1.5vw;">-</button>
                        <p id="countitems${i}" style="margin: 0 20px ; font-size:1.5vw;">${cart[i].count}</p>
                        <button onclick="deinitem('+',${i})" class="btnc" style="font-size:1.5vw;">+</button>                    
                    </div>
                </div>`

            };
            $("#mycart").html(html)
        }
        else{
            $("#mycart").html("<p>Not Fount Product List</p>")
        }
    }

    function deinitem(action, index) {
        if (action == '-') {
            if (cart[index].count > 0) {
                cart[index].count--;
                $(`#countitems${index}`).text(cart[index].count);
                rendercart()

    
                if (cart[index].count <= 0) {
                    swal
                        .fire({
                            icon: "warning",
                            title: 'ต้องการลบ',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: "ลบ",
                            cancelButtonText: "Cancel"
                        })
                        .then((result) => {
                            if (result.isConfirmed) {
                                cart.splice(index, 1);
                                rendercart();
    
                                if (cart.length <= 0) {
                                    $("#cartcout").css('display', 'none');
                                }
                            } else {
                                cart[index].count++;
                                $(`#countitems${index}`).text(cart[index].count);
                                rendercart()
                            }
                        });
                }
            }
        } else if (action == '+') {
            cart[index].count++;
            $(`#countitems${index}`).text(cart[index].count);
            rendercart()
        }

    }
    function TotalPrice() {
        let Allsum = sum;
        let discount = 0; 
        let coupon = 0;
        let ontop = 0;
        let seasonal = 0; 
//coupon        
        $('#couponAmount').on('change', function() {
            if ($(this).is(':checked')) {
                ontop=0;
                discount = 50;
                coupon = Allsum - discount;
                $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${coupon}</p>`);
                // Allsum = coupon; // อัปเดตค่า Allsum
                prop()
            }else(console.log("ERROR6"));
            
            
        });
        $('#couponPercent').on('change', function() {
            if ($(this).is(':checked')) {
                ontop=0
                discount = 2;
                coupon = Allsum * ((100 - discount) / 100);
                $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${coupon}</p>`);
                // Allsum = coupon; // อัปเดตค่า Allsum
                prop()
            }else(console.log("ERROR5"));
        });
        $('#NoneCoupon').on('change', function() {
            if ($(this).is(':checked')) {
                coupon = 0;
                ontop = 0;
                seasonal = 0;
                setTimeout(function () {
                    $('#Allsum').html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${Allsum}</p>`);
                    prop();
                }, 0);
            }else(console.log("ERROR4"));
        });

 //Ontop       
        // $('#onTopPercent').on('change', function() {
        //     if ($(this).is(':checked')) {
        //         if(coupon==0){
        //             discount = 15;
        //             ontop = Allsum * ((100 - discount) / 100);
        //             $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${ontop}</p>`);
                
        //             $('#NoneSeasonal').prop('checked', true);
        //             // Allsum = ontop; // อัปเดตค่า Allsum
        //         }else{
        //             discount = 15;
        //             ontop = coupon * ((100 - discount) / 100);
        //             $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${ontop}</p>`);
        //             console.log(("Ontop Error3="),ontop);
        //             $('#NoneSeasonal').prop('checked', true);
        //             // Allsum = ontop; // อัปเดตค่า Allsum
        //         }
        //         // else(console.log("ERROR3"));
        //     }
        // });

        $('#onTopPercent').on('change', function() {
            if ($(this).is(':checked')) {
                    // ตรวจสอบหมวดหมู่ของสินค้าที่ถูกเลือก
                    const selectedCategories = cart.map(item => product[item.index].type);
                    
                    // เช็คว่าถ้าประเภทของสินค้าอยู่ในรายการ "Clothing," "Accessories," หรือ "Electronics"
                    if (selectedCategories.includes("Clothing") || selectedCategories.includes("Accessories") || selectedCategories.includes("Electronics")) {
                        // คำนวณส่วนลด
                        if (coupon == 0) {
                        ontop = Allsum * ((100 - onTopDiscountPercent) / 100);
                        console.log("คำนวณส่วนลด1");
                        $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${ontop}</p>`);
                        $('#NoneSeasonal').prop('checked', true);
                        }else{
                        ontop = coupon * ((100 - onTopDiscountPercent) / 100);
                        console.log("คำนวณส่วนลด2");
                        $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${ontop}</p>`);
                        $('#NoneSeasonal').prop('checked', true);
                        } 
                    } else {
                        if (coupon == 0) {
                            $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${Allsum}</p>`);
                            ontop=0;
                            console.log("ไม่มีสินค้าในหมวด1");
                            $('#NoneSeasonal').prop('checked', true);
                        } else {
                            $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${coupon}</p>`);
                            ontop=0;
                            console.log("ไม่มีสินค้าในหมวด2");
                            $('#NoneSeasonal').prop('checked', true);
                        }
                    }
                                    
        }})

    
        $('#onTopPoint').on('change', function() {
            if ($(this).is(':checked')) {
                if(coupon==0){
                    discount = 20;
                    Usepoint = Allsum * ((discount) / 100);
                    ontop = Allsum * ((100 - discount) / 100);
                    $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${ontop}</p>`);
                    console.log(Usepoint,"=UsePoint1");
                    $('#NoneSeasonal').prop('checked', true);
                    point(Usepoint)
                }else{
                    discount = 20;
                    Usepoint = coupon * ((discount) / 100);
                    ontop = coupon * ((100 - discount) / 100);
                    $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${ontop}</p>`);
                    console.log((Usepoint,"= UsePoint2"));
                    $('#NoneSeasonal').prop('checked', true);
                    point(Usepoint)
                    }
  

            }
        });
    
        $('#NoneOntop').on('change', function() {
            if ($(this).is(':checked')) {
                ontop=0;
                seasonal=0;
                console.log("ontop none =",ontop);
                $('#NoneSeasonal').prop('checked', true);
                if(seasonal==0 && coupon != 0){
                

                $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${coupon}</p>`);}
                
                else if(coupon==0 && seasonal != 0){
                

                $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${seasonal}</p>`);}
                
                else{
                
                    $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${Allsum}</p>`);}
        }});

//seasonal        
        x = 300; //input
        y = 40; //input
        $('#seasonal').on('change', function() {
            console.log("coupon=",coupon);
            console.log("ontop=",ontop);
            if ($(this).is(':checked',true)) {
                if (ontop == 0 && coupon != 0) {
                        discount = Math.floor(coupon / x);
                        seasonal = coupon - (discount * y);
                        $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${seasonal}</p>`);
                        console.log("rug1");
                } else if (coupon == 0 && ontop == 0) {
                        discount = Math.floor(Allsum / x);
                        seasonal = Allsum - (discount * y);
                        $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${seasonal}</p>`);
                        console.log("rug2");
                } else if (ontop != 0 && coupon == 0) {
                            if ($(`#NoneOntop`).is(':checked')) {
                            discount = Math.floor(coupon / x);
                            seasonal = ontop - (discount * y);
                            $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${seasonal}</p>`);
                            console.log("rug3");
                    } else {
                            discount = Math.floor(ontop / x);
                            seasonal = ontop - (discount * y);
                            $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${seasonal}</p>`);
                            console.log("rug4");
                        }
                }else{ 
                        discount = Math.floor(ontop / x);
                        seasonal = ontop - (discount * y);
                        $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${seasonal}</p>`);
                        console.log("rug5");}
                }
            });
        
        $('#NoneSeasonal').on('change', function() {
            if ($(this).is(':checked')) {

                seasonal=0;
                if(ontop==0 && coupon != 0){
                    $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${coupon}</p>`);
                    console.log("coupon");
                }     
                    else if(ontop != 0){
                        if ($(`#NoneOntop`).is(':checked')) {
                           $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${coupon}</p>`);
                        }else{
                            $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${ontop}</p>`);
                        }

                    // $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${ontop}</p>`);
                    // console.log("ontopp");
                }    
                    else{      
                        $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${Allsum}</p>`);
                        console.log("ontop=",ontop);
                        console.log("allsum");
                }
            }});
            }

    function prop() {
        ontop=0;
        $('#NoneOntop').prop('checked', true);
        $('#NoneSeasonal').prop('checked', true);
        setTimeout(function () {
            console.log("Prop ทำงาน");
        }, 0);
    }
    function point(x){
     
        let point = 10000
        $('#point').html(`<h3>คุณมี ${point-x} คะแนน</h3>`)
    }
    point()
    
    