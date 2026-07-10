// SALES CHART

const salesChart = document.getElementById("salesChart");

if(salesChart){

new Chart(salesChart,{

type:"bar",

data:{

labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

datasets:[{

label:"Sales",

data:[1200,1800,1500,2300,2700,3200,2900],

backgroundColor:"#8B0000",

borderRadius:8

}]

},

options:{

responsive:true,

plugins:{

legend:{
display:false
}

}

}

});

}
// REVENUE CHART

const revenueChart=document.getElementById("revenueChart");

if(revenueChart){

new Chart(revenueChart,{

type:"doughnut",

data:{

labels:[

"Dine In",

"Take Away",

"Delivery"

],

datasets:[{

data:[55,25,20],

backgroundColor:[

"#8B0000",

"#FF8C00",

"#198754"

]

}]

},

options:{

responsive:true,

plugins:{

legend:{

position:"bottom"

}

}

}

});

}