
const API_BASE_URL = 'http://localhost:5000/api/books'; // Update this to your backend API URL

// Fetch all books
export const getBooks = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Fetch a single book by ID
export const getBookById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Create a new book
export const createBook = async (book) => {
    try {
        const token = localStorage.getItem('token'); // Get token from local storage

        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Send token in authorization header
            },
            body: JSON.stringify(book),
        });
        if (!response.ok) {
            throw new Error('Failed to create book');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Update an existing book
export const updateBook = async (id, book) => {
    try {
        const token = localStorage.getItem('token'); // Get token from local storage

        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PATCH', // Change to PATCH
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Send token in authorization header
            },
            body: JSON.stringify(book),
        });
        if (!response.ok) {
            throw new Error('Failed to update book');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};


// Delete a book
export const deleteBook = async (id) => {
    try {
        const token = localStorage.getItem('token'); // Get token from local storage

        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Send token in authorization header
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Add a review to a book
export const addReview = async (bookId, review) => {
    try {
        const token = localStorage.getItem('token'); // Get token from local storage

        // Log token and review object for debugging
        console.debug('Token:', token);
        console.log('Review Object:', JSON.stringify(review));

        const response = await fetch(`${API_BASE_URL}/${bookId}/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Send token in authorization header
            },
            body: JSON.stringify(review),
        });

        // Log request details for debugging
        console.debug('Request URL:', `${API_BASE_URL}/${bookId}/review`);
        console.debug('Request Headers:', {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        console.debug('Request Body:', JSON.stringify(review));

        // Log response status and response details
        console.debug('Response Status:', response.status);
        console.debug('Response Object:', response);

        if (!response.ok) {
            // Log response text if there's an error
            const errorText = await response.text();
            console.error('Response Error Text:', errorText);
            throw new Error(`Failed to add review. Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        // Log full error details
        console.error('Error occurred:', error.message);
        throw error; // Rethrow error for further handling if needed
    }
};


// Fetch reviews for a book
export const getReviewsForBook = async (bookId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${bookId}/reviews`);
        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getBooksByFilters = async ({ author, min, max }) => {
    try {
        const response = await fetch(`/api/books?author=${encodeURIComponent(author)}&minYear=${encodeURIComponent(min)}&maxYear=${encodeURIComponent(max)}`);

        if (!response.ok) {
            const errorText = await response.text(); // Read the response text
            throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error; // Re-throw error to be handled by the caller
    }
};


