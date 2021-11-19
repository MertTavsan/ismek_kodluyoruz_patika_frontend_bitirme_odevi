var tumBilgiler=[];

var carddeck;
var apiurl="https://www.googleapis.com/books/v1/volumes?q=intitle:";
 

$(document).ready(function () {
	// body...
$("#basaDonButton").hide();
});
function incele(element){
  console.log(element.id);//tıklanan elemanın indisine id aracılığı ile ulaştık.
  console.log(tumBilgiler[element.id]);
var ad=tumBilgiler[element.id].volumeInfo.title;
 // var foto=tumBilgiler[element.id].volumeInfo.imageLinks.thumbnail;
 var foto=(tumBilgiler[element.id].volumeInfo.imageLinks!=null) ? tumBilgiler[element.id].volumeInfo.imageLinks.thumbnail : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";

 
  var yazar=(tumBilgiler[element.id].volumeInfo.authors!=null) ? tumBilgiler[element.id].volumeInfo.authors[0]: "";
  var aciklama=(tumBilgiler[element.id].volumeInfo.description!=null) ?tumBilgiler[element.id].volumeInfo.description.substring(0, 180):"";
var yayinci=(tumBilgiler[element.id].volumeInfo.publisher!=null) ? tumBilgiler[element.id].volumeInfo.publisher: "";;
 var sayfaSayisi=tumBilgiler[element.id].volumeInfo.pageCount;
var yayinTarihi=tumBilgiler[element.id].volumeInfo.publishedDate;

document.getElementById("bModelAdsoyad").innerText=ad;
  document.getElementById("bModelDescription").innerText=aciklama;
  
  document.getElementById("bModelDate").innerText=yayinTarihi;
  document.getElementById("bModelPublisher").innerText=yayinci;
  document.getElementById("bModelPages").innerText=sayfaSayisi+" pages";
  document.getElementById("bModelFoto").src=foto;
}

       function urlOlustur(){
       	apiurl="https://www.googleapis.com/books/v1/volumes?q=intitle:";
       	console.log($("#arama").val());
       
       	if($("#arama").val()!=""){
  
             apiurl+=$("#arama").val()+"&maxResults=40";
         } 
       else{
           apiurl+="&maxResults=40";
        }
        console.log(apiurl);
       }



       function verileriAl(){
       	
       	$.ajax({

			url: apiurl,
			method:"get",
			dataType:"json",
			success:function(data){
				tumBilgiler=data.items;
				
                               console.log(data.items);
			},
			failure:function(data){
				console.log(data);
			},
			error:function(error){
				console.log(error);
			}
		}).done(function()

                {
			console.log(tumBilgiler.length);

                        //items[i].volumeInfo.imageLinks.thumbnail
                        //description.substring(0, 180) --açıklama
                        //state.previewLink 
                        //state.title ---adı
               //state.authors[i]--yazar,  publishedDate, publisher---yayınlayan, pageCount
  	
                        for(var i=0; i<tumBilgiler.length; i++){

			var foto=(tumBilgiler[i].volumeInfo.imageLinks!=null) ? tumBilgiler[i].volumeInfo.imageLinks.thumbnail : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg";
			
                        var ad=tumBilgiler[i].volumeInfo.title;
			var yazar=(tumBilgiler[i].volumeInfo.authors!=null) ? tumBilgiler[i].volumeInfo.authors[0]: "";

                        var aciklama=(tumBilgiler[i].volumeInfo.description!=null) ?tumBilgiler[i].volumeInfo.description.substring(0, 180):"";
			var sayfaSayisi=tumBilgiler[i].volumeInfo.pageCount;
			var yayinTarihi=tumBilgiler[i].volumeInfo.publishedDate;
			var link=(tumBilgiler[i].volumeInfo.previewLink!=null) ? tumBilgiler[i].volumeInfo.previewLink:""; 
			
			  if(i%5==0){
			  	$("#tbl").append("<br>");
			  	carddeck=document.createElement("div");
			    carddeck.className="card-deck";
			  }

			  carddeck.innerHTML+='<div class="card" style="width: 18rem;"><img class="card-img-top" src="'+foto+'" alt="foto"><div class="card-body"><h5 class="card-title">'+ad+'</h5><p class="card-text">'+yazar+'</p><a href="#" class="btn btn-primary" id="'+i+'" onclick="incele(this)" data-toggle="modal" data-target="#myModal"> İncele</a></div></div>';
           
			  if(i%5==4)
			  $("#tbl").append(carddeck);
		    }
      
         })
       

      }

       $("#btn").on("click",function(){
        $("#tbl").empty();
       	console.log("clicklendi");
       	urlOlustur();
        verileriAl();
		
	 });
