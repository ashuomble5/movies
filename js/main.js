$(document).ready(() => {
	$("#searchForm").on('submit', e => {
		//get the data of form input
		let searchTerm = $("#searchTerm").val();

		//call function gtMovies to get the data
		getMovies(searchTerm);
		e.preventDefault();
	})
});


function getMovies(searchTerm) {
	//now call the axios to get the data 
	axios.get('https://www.omdbapi.com?s='+searchTerm+'&apikey=3f265c45')
		.then(response => {
			console.log(response)
			//get the response into variable
			const movies = response.data.Search;
			// iterate through movies array/object
			let output = '<div class="row">';

			$.each(movies, (index, movie) => {
				output+= `
						<div class="column">
							<div class="card">
								<img alt=${movie.Title} src=${movie.Poster}>
								<div class="container">
									<h2>${movie.Title}</h2>
									<p class="title">${movie.Year}</p>
									<p><button class="button">Details</button></p>
								</div>
							</div>
						</div>
				`;
			});

			output += '</div>';

			//add the output to the output div of html file
			$("#searchResults").html(output);
		})
		.catch(err => {
			console.log(err)
		})
}