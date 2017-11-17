var position = 0;
var itemLimit = 80;

$(document).ready(function() {
	sortItems();
	loadItems();
});

$('#sorting').change(function() {
	sortItems();
	loadItems();
});

$("#btnLoad").click(function() {
	loadItems();
});

function loadItems() {
	$.each(items, function(i, item) {
		if (i >= position && i < position + itemLimit) {
			if (i%4 === 0) 
				$('#content').append('<div class="row"></div>');
			$("#content").children().last().append('<div class="col-md-3 item"><a href="'+item.Link+'"><img class="img-responsive" src="'+item.Image+'" style="max-height:200px;"><p>'+item.Title+'</p><p>$'+item.Price.toFixed(2)+'</p></a></div>');
		}
	});
	
	position += itemLimit;
	if (position >= items.length)
		$("#btnLoad").hide();
	else 
		$("#btnLoad").show();
}

function sortItems() {
	$("#content").empty();
	position = 0;
	
	var sortMethod = $('#sorting option:selected').text();

	if (sortMethod == 'Popular')
		items.sort(sortByPopularity);
	else if (sortMethod == 'Price Ascending')
		items.sort(sortByPriceAsc);
	else if (sortMethod == 'Price Descending')
		items.sort(sortByPriceDesc);
	else if (sortMethod == 'Newest First')
		items.sort(sortByNewest);
}

function sortByPriceDesc(a, b){
	return ((a.Price > b.Price) ? -1 : ((a.Price < b.Price) ? 1 : 0));
}

function sortByPriceAsc(a, b){
	return ((a.Price < b.Price) ? -1 : ((a.Price > b.Price) ? 1 : 0));
}

function sortByPopularity(a, b){
	return ((a.Popularity > b.Popularity) ? -1 : ((a.Popularity < b.Popularity) ? 1 : 0));
}

function sortByNewest(a, b){
	return ((a.Num > b.Num) ? -1 : ((a.Num < b.Num) ? 1 : 0));
}