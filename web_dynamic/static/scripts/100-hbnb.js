$(document).ready(function () {
  const checkedAmenities = {};
  const checkedStates = {};
  const checkedCities = {};

  $('.amenities input[type="checkbox"]').change(function () {
    const amenityID = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).prop('checked')) {
      checkedAmenities[amenityID] = amenityName;
    } else {
      delete checkedAmenities[amenityID];
    }

    const h4 = $('.amenities h4');
    h4.text(Object.values(checkedAmenities).join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });

  function generateArticleHTML (place) {
    return `<article>
             <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${'$' + place.price_by_night}</div>
             </div>
             <div class="information">
                <div class="max_guest">${place.max_guest + (place.max_guest > 1 ? ' Guests' : ' Guest')} </div>
                <div class="number_rooms">${place.number_rooms + (place.number_rooms > 1 ? ' Bedrooms' : ' Bedroom')} </div>
                <div class="number_bathrooms">${place.number_bathrooms + (place.number_bathrooms > 1 ? ' Bathrooms' : ' Bathroom')}</div>
             </div>
             <div class="description">${place.description}</div>
           </article>`;
  }

  function fetchPlaces (data) {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
      success: function (response) {
        $('section.places').empty();
        response.forEach(function (place) {
          $('section.places').append(generateArticleHTML(place));
        });
      },
      error: function (error) {
        console.error(error);
      }
    });
  }

  $('div.locations > div.popover > ul > li > input[type="checkbox"]').change(function () {
    const stateID = $(this).data('id');
    const stateName = $(this).data('name');

    if ($(this).prop('checked')) {
      checkedStates[stateID] = stateName;
    } else {
      delete checkedStates[stateID];
    }

    const h4 = $('.locations h4');
    h4.text(Object.values(checkedStates).join(', '));
  });

  $('.locations ul ul li input[type="checkbox"]').change(function () {
    const cityID = $(this).data('id');
    const cityName = $(this).data('name');

    if ($(this).prop('checked')) {
      checkedCities[cityID] = cityName;
    } else {
      delete checkedCities[cityID];
    }
  });

  fetchPlaces({}); // Fetch all places on page load

  $('button').on('click', function () {
    const data = {
      amenities: Object.keys(checkedAmenities),
      states: Object.keys(checkedStates),
      cities: Object.keys(checkedCities)
    };
    console.log(JSON.stringify(data));
    fetchPlaces(data);
  });
});
