function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i = 0; i < uiBathrooms.length; i++) {
    if (uiBathrooms[i].checked) {
      return parseInt(uiBathrooms[i].value);
    }
  }
  return -1;
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i = 0; i < uiBHK.length; i++) {
    if (uiBHK[i].checked) {
      return parseInt(uiBHK[i].value);
    }
  }
  return -1;
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  if (!sqft || !sqft.value) {
    alert("Vui lòng nhập diện tích (Square Feet)!");
    return;
  }

  if (!location.value || location.value === "Choose a Location") {
    alert("Vui lòng chọn một địa điểm!");
    return;
  }

  var url = "https://predict-price-psro.onrender.com/predict_home_price";

  // Hiển thị trạng thái đang tính toán
  if (estPrice) {
    estPrice.innerHTML = "<h2>Calculating...</h2>";
  }

  $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  }, function(data, status) {
      console.log("Estimated price:", data.estimated_price);
      if (estPrice) {
          estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      }
      console.log("Status:", status);
  }).fail(function(jqXHR, textStatus, errorThrown) {
      console.error("Lỗi gửi request POST:", textStatus, errorThrown);
      if (estPrice) {
          estPrice.innerHTML = "<h2>Error estimating price</h2>";
      }
  });
}

function onPageLoad() {
  console.log("document loaded");
  var url = "https://predict-price-psro.onrender.com/get_location_names";
  
  $.get(url, function(data, status) {
      console.log("got response for get_location_names request", data);
      if(data && data.locations) {
          var locations = data.locations;
          $('#uiLocations').empty();
          
          // Thêm tùy chọn mặc định
          $('#uiLocations').append(new Option("Choose a Location", "", true, true));

          // Đưa toàn bộ địa điểm từ API vào dropdown
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  }).fail(function(jqXHR, textStatus, errorThrown) {
      console.error("Lỗi tải danh sách location:", textStatus, errorThrown);
      $('#uiLocations').empty();
      $('#uiLocations').append(new Option("Failed to load locations", ""));
  });
}

window.onload = onPageLoad;