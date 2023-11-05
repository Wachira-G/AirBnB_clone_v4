#!/usr/bin/node
// task 2 js script

$(document).ready(function () {
  const checkedAmenities = {};

  $('input[type="checkbox"]').change(function () {
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

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    headers: { 'Content-Type': 'application/json' },
    data: '{}',
    success: function (response) {
      response.forEach(function (place) {
        const article = `<article>
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
        $('section.places').append(article);
      });
    },
    error: function (error) {
      console.error(error);
    }
  });
});
