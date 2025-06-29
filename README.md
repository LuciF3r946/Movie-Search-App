# 🎬 Movie Explorer

A responsive React-based movie search and favorites application powered by The Movie Database (TMDb) API. Users can search for movies, view popular films, and manage a personalized list of favorites.

## 🚀 Features

- 🔍 **Movie Search**: Search for movies with live debounce-enabled input.
- 🎥 **Popular Movies**: Display trending movies when there's no search query.
- ❤️ **Favorites**: Add or remove movies from a favorites list using context.
- 🖼️ **Poster Fallback**: Displays an SVG fallback when a movie has no poster.
- ⚡ **Modern React**: Built with hooks (`useState`, `useEffect`, `useCallback`) and context.

## 📁 Project Structure

```
src/
├── components/
│   └── MovieCard.js       # Renders individual movie cards with poster and favorite button
├── contexts/
│   └── MovieContext.js    # Provides favorite movies context globally
├── pages/
│   ├── Home.js            # Search and movie list page
│   └── Favorites.js       # List of user-favorite movies
├── services/
│   └── api.js             # TMDb API fetch utilities
├── css/
│   ├── Home.css
│   ├── Favorites.css
│   └── MovieCard.css      # Component-specific styles
├── App.js
└── main.jsx
```

## 🛠️ Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Create a `.env` file in the root with your TMDb API key

```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

### 3. Run the app locally

```bash
npm run dev
```

## 🧠 Tech Stack

- React
- Vite
- Context API
- Lodash.debounce
- TMDb API
