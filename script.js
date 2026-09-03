const movies = [
  {
    title: "Interstellar",
    year: "2014",
    genre: "Sci-Fi",
    rating: "8.7",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBV.jpg",
    trailer: "https://www.youtube.com/results?search_query=Interstellar+official+trailer"
  },

  {
    title: "Inception",
    year: "2010",
    genre: "Sci-Fi",
    rating: "8.8",
    poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    trailer: "https://www.youtube.com/results?search_query=Inception+official+trailer"
  },

  {
    title: "The Dark Knight",
    year: "2008",
    genre: "Action",
    rating: "9.0",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    trailer: "https://www.youtube.com/results?search_query=The+Dark+Knight+official+trailer"
  },

  {
    title: "Dune",
    year: "2021",
    genre: "Sci-Fi",
    rating: "8.0",
    poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    trailer: "https://www.youtube.com/results?search_query=Dune+2021+official+trailer"
  },

  {
    title: "Parasite",
    year: "2019",
    genre: "Drama",
    rating: "8.5",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    trailer: "https://www.youtube.com/results?search_query=Parasite+2019+official+trailer"
  },

  {
    title: "Mad Max: Fury Road",
    year: "2015",
    genre: "Action",
    rating: "8.1",
    poster: "https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    trailer: "https://www.youtube.com/results?search_query=Mad+Max+Fury+Road+official+trailer"
  },

  {
    title: "Spider-Man: Into the Spider-Verse",
    year: "2018",
    genre: "Animation",
    rating: "8.4",
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    trailer: "https://www.youtube.com/results?search_query=Spider-Man+Into+the+Spider-Verse+official+trailer"
  },

  {
    title: "The Grand Budapest Hotel",
    year: "2014",
    genre: "Comedy",
    rating: "8.1",
    poster: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    trailer: "https://www.youtube.com/results?search_query=Grand+Budapest+Hotel+official+trailer"
  }
];


// ================= ELEMENTS =================

const grid = document.getElementById("movieGrid");
const search = document.getElementById("search");
const count = document.getElementById("count");
const empty = document.getElementById("empty");

const filters =
  document.querySelectorAll(".filter");

let selectedGenre = "All";


// ================= SHOW MOVIES =================

function renderMovies() {

  const searchText =
    search.value
      .toLowerCase()
      .trim();

  const results =
    movies.filter(movie => {

      const matchesSearch =
        movie.title
          .toLowerCase()
          .includes(searchText);

      const matchesGenre =
        selectedGenre === "All" ||
        movie.genre === selectedGenre;

      return matchesSearch && matchesGenre;

    });


  grid.innerHTML = "";


  count.textContent =
    `${results.length} movie${results.length === 1 ? "" : "s"}`;


  if (results.length === 0) {

    empty.classList.remove("hidden");

    return;

  }


  empty.classList.add("hidden");


  results.forEach(movie => {

    const card =
      document.createElement("article");

    card.className = "card";


    card.innerHTML = `

      <img
        class="poster"
        src="${movie.poster}"
        alt="${movie.title}"
        loading="lazy"
        onerror="this.src='https://via.placeholder.com/500x750/191919/ffffff?text=No+Poster'"
      >

      <div class="info">

        <h3>
          ${movie.title}
        </h3>

        <div class="meta">
          ${movie.year} • ${movie.genre}
        </div>

        <div class="rating">
          ★ ${movie.rating}
        </div>

        <a
          class="trailer"
          href="${movie.trailer}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ▶ Official Trailer
        </a>

      </div>

    `;


    grid.appendChild(card);

  });

}


// ================= SEARCH =================

search.addEventListener(
  "input",
  renderMovies
);


// ================= GENRE FILTER =================

filters.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      filters.forEach(
        item =>
          item.classList.remove("active")
      );


      button.classList.add("active");


      selectedGenre =
        button.dataset.genre;


      renderMovies();

    }
  );

});


// ================= GENRE CARDS =================

const genreCards =
  document.querySelectorAll(
    "[data-genre-card]"
  );


genreCards.forEach(card => {

  card.addEventListener(
    "click",
    () => {

      selectedGenre =
        card.dataset.genreCard;


      filters.forEach(button => {

        button.classList.toggle(
          "active",
          button.dataset.genre === selectedGenre
        );

      });


      document
        .getElementById("movies")
        .scrollIntoView({
          behavior: "smooth"
        });


      renderMovies();

    }
  );

});


// ================= MOBILE MENU =================

const menuBtn =
  document.getElementById("menuBtn");

const nav =
  document.getElementById("nav");


menuBtn.addEventListener(
  "click",
  () => {

    nav.classList.toggle("open");

  }
);


// Close menu after clicking a link

document
  .querySelectorAll("nav a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        nav.classList.remove("open");

      }
    );

  });


// ================= START WEBSITE =================

renderMovies();