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
	// axios.get('http://www.omdbapi.com?s='+searchTerm+'&apikey=3f265c45')
	let url = 'http://www.omdbapi.com?s='+searchTerm+'&apikey=3f265c45';
	//axios call
	axios(url,{
		method: 'GET',
		 mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
	})
		.then(response => {
			console.log(response)
			//get the response into variable
			const movies = response.data.Search;
			// iterate through movies array/object
			let output = '';

			$.each(movies, (index, movie) => {
				output+= `
					<div>
						<img alt=${movie.Title} src=${movie.Poster}>
						${movie.Title}
					</div>
				`;
			});

			//add the output to the output div of html file
			$("#searchResults").html(output);
		})
		.catch(err => {
			console.log(err)
		})
}