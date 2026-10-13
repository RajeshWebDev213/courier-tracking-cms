import { useEffect, useState } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { getGallery } from "../services/GalleryService";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await getGallery();

        setGalleryItems(response.gallery || []);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Gallery
          </p>

          <h1 className="mt-2 text-3xl font-bold text-black sm:text-4xl">
            Our Gallery
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500">
            Explore our courier and delivery services through our gallery.
          </p>
        </div>

        {/* Gallery Grid */}
        {galleryItems.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedImage(item)}
                className="group relative overflow-hidden rounded-[5px] border border-gray-200 bg-gray-50 text-left"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-end bg-black/0 p-5 transition duration-300 group-hover:bg-black/30">
                  <div className="translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm font-medium text-white">
                      {item.title}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="mt-12 flex min-h-[300px] flex-col items-center justify-center rounded-[5px] border border-gray-200">
            <ImageIcon size={40} className="text-gray-400" />

            <h2 className="mt-4 text-lg font-semibold text-black">
              No Images Available
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Gallery images will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-5 py-10"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:bg-gray-100"
            >
              <X size={18} />
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-h-[80vh] w-auto max-w-full rounded-[5px] object-contain"
            />

            <p className="mt-3 text-center text-sm font-medium text-white">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;