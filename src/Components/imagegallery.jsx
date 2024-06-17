import React, { useState, useEffect } from "react"; 
import Card from "./card";  

export default function ImageGallery() {
  const PIXABAY_KEY = "44416021-6e7465448336c919baf9bd54e";
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(term)}&image_type=photo&pretty=true`,
          { signal }
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setImages(data.hits);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Fetch error:", error);
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();

    return () => {
      controller.abort();
    };
  }, [term]);

  const handleSearch = () => {
    setTerm(searchTerm);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="text-6xl font-serif capitalize mr-6 p-10"><h1>Image Gallary</h1></div>
      <div className="w-full h-10 flex justify-center my-4">
        <input 
          type="text" 
          className="border p-4  mr-2 w-80" 
          placeholder="Enter the type" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className="bg-green-500 text-white px-6 w-22 mr-6" 
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {images.map((image) => (
            <Card key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}
