# URL Shortener Web App (MERN Stack)

A simple, privacy-focused URL shortener built using the **MERN** stack.

## Tech Stack

- **Frontend**: React + Tailwind CSS  
- **Backend**: Node.js + Express  
- **Database**: MongoDB

---

## Features

- Shorten long URLs using a regex-validated form input
- Each shortened link is tied to a specific user (private by design)
- Unique `nanoid` generated for each URL
- View all generated links on the **History** page
- **Like** and save your favorite links
- **Delete** links from your history
- **Authentication system** (Login/Logout)
- Each user’s data is private — no cross-user visibility

---

## How It Works

1. User enters a URL they want to shorten.
2. The input is validated using a **regex pattern** that checks for:
   - Proper protocol (`https`)
   - Domain structure (slashes, `.com`, etc.)
3. Valid URLs are sent to the backend.
4. Backend generates a unique `nanoid`, stores the URL, nanoid, and associated user ID in MongoDB.
5. The shortened URL/nanoid is sent back to the frontend.
6. Users can view, like, or delete their shortened links in the **History** section.
7. Liked links appear in the **Favourites** section and can be unliked from there or the History section.
8. Authentication ensures that only logged-in users can access their own data.

---

## Privacy

- Each URL is stored with the ID of the user who created it.
- Only the creator can view, edit, or delete their links.
- URLs and user data are **not shared or visible to other users**.

---

## License

No formal license.  
If you want to use the code, go for it.
