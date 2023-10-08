    let  Usepoint = 0; //

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
            img: "https://cdn.pixabay.com/photo/2017/02/03/14/03/smartphone-2035187_1280.png",
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
                            <h2 style="font-size: 1.2vw">${product[i].price} THB</h2>
                        </div>`;
            }
            $("#productlist").html(html);
            
            point()        
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
            $('#descriptionCampaigns').css('display','none');
            renderpayment();
            TotalPrice();
        }
        let sum=0
        function renderpayment() {
            if(cart.length>0){
                let html ='';
                sum = 0;
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
                    console.log("sum = ",sum); 
                };

                html += `<p style="font-size: 1.5vw; text-align: right;">ยอดรวม: ${sum} THB</p>`;
            
                $("#mypayment").html(html);
        }}
        


        function rendercart(){
            $('#btn-buy').css('display','flex');

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
                $('#btn-buy').css('display','none');

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
    let Points = 1000; // ตั้งค่าเริ่มต้นของคะแนน
    let Coupon_description = "";
    let Ontop_description =" ";
    let Seasonal_description =" ";
    let MoneyPayment = 0
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
                    Coupon_description = `CouponAmount : มูลค่า ${discount} THB`;
                    $("#Coupon-description").text(Coupon_description);            
                }else(console.log("ERROR6"));
                
                
            });
            $('#couponPercent').on('change', function() {
                if ($(this).is(':checked')) {
                    ontop=0
                    discount = 2;
                    coupon = Allsum * ((100 - discount) / 100);
                    $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${coupon}</p>`);
                    // Allsum = coupon; // อัปเดตค่า Allsum
                    Coupon_description = `couponPercent : ส่วนลด 2 % มูลค่า ${Allsum-coupon} THB`;
                    $("#Coupon-description").text(Coupon_description);            
                    prop()
                }else(console.log("ERROR5"));
            });
            $('#NoneCoupon').on('change', function() {
                Coupon_description = `ไม่ได้ใช้ส่วนลด Coupon`;
                $("#Coupon-description").text(Coupon_description); 
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

            $('#onTopPercent').on('change', function() {
                let onTopDiscountPercent = 15; // %
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
                            Ontop_description = `OntopDiscountPercent : ส่วนลด 15 % เมื่อซื้อของ ในหมวดหมู่ "Clothing","Accessories" และ "Electronics" มูลค่า ${Allsum-ontop}`;
                        $("#Ontop-description").text(Ontop_description); 

                            $('#NoneSeasonal').prop('checked', true);
                            }else{
                            ontop = coupon * ((100 - onTopDiscountPercent) / 100);
                            console.log("คำนวณส่วนลด2");
                            $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${ontop}</p>`);
                            Ontop_description = `OntopDiscountPercent : ส่วนลด 15 % เมื่อซื้อของ ในหมวดหมู่ "Clothing","Accessories" และ "Electronics" มูลค่า ${coupon-ontop}`;
                            $("#Ontop-description").text(Ontop_description); 
                            $('#NoneSeasonal').prop('checked', true);
                            } 
                        } else { 
                            $('#onTopPercent').prop('disabled', true);
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
                let p=20 //% MAX OntopPoint 
                    if ($(this).is(':checked',true)) {
                        
                        if (coupon === 0) {
                            discount = p; // หน่วยเป็น %
                            Usepoint = Allsum * ((discount) / 100);
                            if(Points>=Usepoint){
                            ontop = Allsum * ((100 - discount) / 100);
                            // const redemptionMessage = redeemPoints(Usepoint);
                            Ontop_description = `OntopDiscountPoint :  1 Point มีค่าเท่ากับ 1 THB แลกได้สูงสุดไม่เกิน 20% ของมูลค่า คุณได้ใช้ Point ไป ${Usepoint}  มูลค่า ${Usepoint} THB  คุณเหลือ Points ${Points-Usepoint} Points`
                            $("#Ontop-description").text(Ontop_description);     
                            }else{
                            ontop = Allsum * ((100 - discount) / 100)-(Points-Usepoint);
                            Ontop_description = `OntopDiscountPoint :  1 Point มีค่าเท่ากับ 1 THB แลกได้สูงสุดไม่เกิน 20% ของมูลค่า คุณได้ใช้ Point ไป ${Points}  มูลค่า ${Points-Usepoint} THB คุณเหลือ Points 0 Points`
                            $("#Ontop-description").text(Ontop_description);   
                    }
                        $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${ontop}</p>`);
                        $('#NoneSeasonal').prop('checked', true);
                    
                    } else {
                        discount = p;
                        Usepoint = coupon * ((discount) / 100);      
                            if(Points>=Usepoint){
                            ontop = coupon * ((100 - discount) / 100);
                            // const redemptionMessage = redeemPoints(Usepoint);
                            Ontop_description = `OntopDiscountPoint :  1 Point มีค่าเท่ากับ 1 THB แลกได้สูงสุดไม่เกิน 20% ของมูลค่า คุณได้ใช้ Point ไป ${Usepoint}  มูลค่า ${Usepoint} THB  คุณเหลือ Points ${Points-Usepoint} Points`
                            $("#Ontop-description").text(Ontop_description);
                            console.log(`Points =${Points} `);
                            console.log(`Use 211 =${Usepoint} `);
                            }else{
                            ontop = coupon -Points; //กรณีที่pointใช้หมด 
                            Ontop_description = `OntopDiscountPoint :  1 Point มีค่าเท่ากับ 1 THB แลกได้สูงสุดไม่เกิน 20% ของมูลค่า คุณได้ใช้ Point ไป ${Points}  มูลค่า ${Points} THB คุณเหลือ Points 0 Points`
                            $("#Ontop-description").text(Ontop_description); 
                            console.log(`Points2 =${Points} `);
                            console.log(`Use 211 =${Usepoint} `);
                            console.log(`coupon 211 =${coupon} `);
                            console.log(`allsum 211 =${Allsum} `);

                        }    
                        $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${ontop}</p>`);
                        $('#NoneSeasonal').prop('checked', true);
                    
                    }
                        renderpayment(); // อัปเดตแสดงผลรายการการชำระเงินใหม่
                }
            });
        
          
            $('#NoneOntop').on('change', function() {
                if ($(this).is(':checked')) {
                    Ontop_description = `ไม่ได้ใช้ส่วนลด Ontop`;
                            $("#Ontop-description").text(Ontop_description); 
                    Seasonal_description = `ไม่ได้ใช้ส่วนลด Seasonal`
                            $("#Seasonal-description").text(Seasonal_description);
                    Usepoint=0;
                    ontop=0;
                    seasonal=0;
                    console.log("Usepoint =",Usepoint);
                    $('#NoneSeasonal').prop('checked', true);
                    if(coupon != 0){
                        $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด ${coupon}</p>`);}
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
                    Seasonal_description = `Seasonal : ส่วนลดทุก ๆ 300 บาท ลด 40 บาท มูลค่า ${discount*y} THB`
                            $("#Seasonal-description").text(Seasonal_description);
                });
            
            $('#NoneSeasonal').on('change', function() {
                if ($(this).is(':checked')) {
                    Seasonal_description = `ไม่ได้ใช้ส่วนลด Seasonal`
                    $("#Seasonal-description").text(Seasonal_description);
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
            Seasonal_description = `ไม่ได้ใช้ส่วนลด Seasonal`
                $("#Seasonal-description").text(Seasonal_description);
            Ontop_description = `ไม่ได้ใช้ส่วนลด Ontop`;
                $("#Ontop-description").text(Ontop_description); 
            ontop=0;
            $('#NoneOntop').prop('checked', true);
            $('#NoneSeasonal').prop('checked', true);
            setTimeout(function () {
                console.log("Prop ทำงาน");
            }, 0);
        }
        function point(){
            Points-=Usepoint;
            if(Points>0){
            $('#point').html(`<h3>คุณมี ${Points} คะแนน</h3>`);
            }else{
                $('#point').html(`<h3>คุณมี 0 คะแนน</h3>`)
                $('#onTopPoint').prop('disabled', true);

                MoneyPayment = -Points
            }
        }
        function CompletePayment(){
            point()
            html=''
            Allsum = 0;
            discount = 0;
            coupon = 0;
            ontop = 0;
            seasonal = 0;
            sum = 0;
            cart = [];
            $("#Allsum").html(`<p class="mt-4" id="Allsum" style="font-size: 1.5vw">ยอดรวม หลังหักส่วนลด "โปรดใส่ส่วนลด"</p>`);
            $("#mypayment").html(" ");
            Swal.fire({

                title: 'ชำระเงินสำเร็จ',
                width: 600,
                padding: '3em',
                color: '#716add',

            })
            //   $('#NoneOntop').prop('checked', true);
            //   $('#NoneSeasonal').prop('checked', true);
            //   $('#NoneCoupon').prop('checked', true);

            closeModal()

        }

        function DescriptionCampaigns(){
            $("#payment").css('display','none');
            $("#descriptionCampaigns").css('display','flex');
            Coupon_description
            Ontop_description
            Seasonal_description
        }

