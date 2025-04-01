import React from "react";
import { Star } from "lucide-react";
import type { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="bg-slate-900 rounded-xl p-3 overflow-hidden shadow-lg transition-transform hover:scale-105">
      <div className="relative pb-[150%]  ">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&fit=crop"
          }
          alt={movie.Title}
          className="absolute rounded-lg inset-0  h-full w-full  object-cover"
        />
      </div>
      <div className="py-4  rounded-lg ">
        <h3 className="text-xl font-semibold line-clamp-2">{movie.Title}</h3>
        <div className="flex items-center justify-between text-base text-gray-400">
          <span>Release year: {movie.Year}</span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span>{movie.imdbRating || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
