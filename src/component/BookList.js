import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import "./BookList.css";
import { CiSearch } from "react-icons/ci";

export const BookList = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [namePlaceHoler, setNamePlaceHolder] = useState("  Search");
  const [isFocused, setIsFocused] = useState(false); // Track focus state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://skunkworks.ignitesol.com:8000/books?topic=${category}&mime_type=image/jpeg`
        );
        const bookData = await response.json();

        // Ensure only books with cover images are set
        const filteredBooks = bookData.results.filter(
          (book) => book.formats["image/jpeg"]
        );

        setBooks(filteredBooks);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    if (category) fetchBooks();
  }, [category]);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors.some((author) =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleBookClick = (book) => {
    // Check for the best available format in priority order
    const formats = book.formats;

    const bookUrl =
      formats["text/html"] ||
      formats["application/pdf"] ||
      formats["text/plain"];

    if (bookUrl) {
      // Open book in new tab
      window.open(bookUrl, "_blank");
    } else {
      // Show error message if no viewable format is available
      alert("No viewable version available.");
    }
  };

  return (
    <>
      <div className="mt-3">
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center mx-4 ">
            <FaArrowLeftLong
              style={{
                marginRight: "15px",
                color: "#5e56e7",
                height: "35px",
                width: "35px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            />
            <h2 style={{ color: "#5e56e7" }}>{category.toUpperCase()}</h2>
          </div>

          {/* Search Box with Floating Label */}
          <div className="search-box mt-3">
            <div
              className={`search-container ${
                isFocused || searchTerm ? "focused" : ""
              }`}
            >
              <label className="floating-label">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <CiSearch className="search-icon" />
              {searchTerm && (
                <IoClose
                  className="close-icon"
                  onClick={() => setSearchTerm("")}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Book Cards */}
      <div className="container mt-4">
        {loading ? (
          <div className="d-flex align-items-center justify-content-center vh-100 ">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="row g-4 mt-5">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4"
                onClick={() => handleBookClick(book)}
                style={{ cursor: "pointer" }}
              >
                <div className="card shadow-sm" style={{ height: "100%" }}>
                  <img
                    src={book.formats["image/jpeg"]}
                    alt={book.title}
                    className="card-img-top"
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <div className="card-body">
                    <h6
                      className="card-title fw-bold text-truncate"
                      style={{ maxHeight: "40px", overflow: "hidden" }}
                      title={book.title}
                    >
                      {book.title}
                    </h6>
                    <p
                      className="card-text text-truncate, author-name"
                      style={{ maxHeight: "20px", overflow: "hidden" }}
                    >
                      {book.authors.length > 0
                        ? book.authors[0].name
                        : "Unknown Author"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No books found in this category.</p>
        )}
      </div>
    </>
  );
};
