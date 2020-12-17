const api={
    key :"69fb07120fa83ccaeb44396cbd2a91a7",
    base : "https://api.openweathermap.org/data/2.5/"
}

$("#search").keypress(function(e){
    if(e.keyCode == 13)
    {

        loadApi($("#search").val());
    }
})


function loadApi(city){
    var xhr= new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 & xhr.status==200){
            display(JSON.parse(xhr.responseText));
            
        }
    }
    console.log(city);
    xhr.open("GET",api.base+"weather?q="+city+",&units=metric&APPID="+api.key);
    xhr.send();
}

function display(data){
    console.log(data.name);
    $("#city_name").text(data.name+", "+data.sys.country);
    var date=new Date();
    $("#Date").text(dateBuilder(date));
    $("#Temp").text(temperature(data.main.temp));
   // $("#Climate").text(icon_change(data.weather));
   $("#icon").html(icon_change(data.weather));
}
function dateBuilder(d)
{
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Friday","Saturday"];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    var x=day+" "+date+" "+month+" "+year;
    return x;
    
}
function temperature(data){
    var y=Math.round(data)+"°C";
    return y;
}
function icon_change(data){
    var a=data[0].icon;
    a=a.substring(0,2)+"d";
    a='<img src="https://openweathermap.org/img/wn/'+a+'@2x.png">'
    return a;

}