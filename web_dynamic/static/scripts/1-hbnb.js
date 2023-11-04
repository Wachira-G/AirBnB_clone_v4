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
});
