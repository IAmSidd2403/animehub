import React from 'react'

const AnimeCard = ({ anime }) => {
  return (
    <div className="movie-card">
      <img
        src={anime?.images?.jpg?.image_url || no-movie.png}
        alt={anime.title}
        className="anime-image"
      />

      <div className='mt-4'>
        <h3>{anime.title}</h3>
        <div className='content'>
            <div className='rating'>
                <img src="star.svg" alt="Star Icon" />
                <p>{anime.score ? anime.score.toFixed(1) : 'N/A'  }</p>
            </div>
            <span>.</span>
            <p className='lang'>Jp</p>
            <span>.</span>
            <p className="year">
                {anime.aired?.from
                    ? anime.aired.from.slice(0, 4)
                    : "Unknown"}
            </p>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
