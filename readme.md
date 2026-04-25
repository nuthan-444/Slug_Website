<h1 align="center">🚀 Slug</h1>

<h2>📌 Overview</h2>
<p>
<b>Slug</b> is an event hosting platform designed for students and organizers to manage and participate in events like hackathons, workshops, and sessions.
It enables seamless event creation, registration, and communication between admins and users.
</p>

<hr/>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li><b>Frontend:</b> React.js</li>
  <li><b>Backend:</b> Node.js + Express</li>
  <li><b>Database:</b> MongoDB</li>
</ul>

<hr/>

<h2>✨ Features</h2>

<h3>👤 Authentication</h3>
<ul>
  <li>Secure Login & Signup</li>
  <li>OTP-based verification</li>
</ul>

<h3>🎯 Admin Features</h3>
<ul>
  <li>Create, update, and delete events</li>
  <li>View registered participants</li>
  <li>Manage event gallery (add/delete images)</li>
</ul>

<h3>🧑‍🎓 User Features</h3>
<ul>
  <li>Browse and register for events</li>
  <li>Cancel event registration</li>
  <li>Receive email confirmation after registering</li>
</ul>

<hr/>

<h2>📦 Dependencies</h2>

<h3>🎨 Frontend (React)</h3>
<ul>
  <li><b>@gsap/react</b> – GSAP integration for React</li>
  <li><b>gsap</b> – High-performance animation library</li>
  <li><b>motion</b> – Smooth UI animations and transitions</li>
  <li><b>axios</b> – HTTP client for API requests</li>
  <li><b>react</b> – UI library</li>
  <li><b>react-dom</b> – DOM rendering for React</li>
  <li><b>react-icons</b> – Icon library</li>
  <li><b>react-router-dom</b> – Routing/navigation</li>
  <li><b>dotenv</b> – Environment variable management</li>
</ul>

<h3>⚙️ Backend (Node.js + Express)</h3>
<ul>
  <li><b>express</b> – Backend web framework</li>
  <li><b>mongoose</b> – MongoDB object modeling</li>
  <li><b>bcryptjs</b> – Password hashing</li>
  <li><b>jsonwebtoken</b> – Authentication using JWT</li>
  <li><b>cors</b> – Cross-origin request handling</li>
  <li><b>dotenv</b> – Environment configuration</li>
  <li><b>multer</b> – File upload handling</li>
  <li><b>cloudinary</b> – Cloud media storage</li>
  <li><b>nodemailer</b> – Sending emails</li>
</ul>

<hr/>

<h2>📂 Project Structure</h2>

<pre>
project-root/

Backend
├── config/        # Configuration files
├── controllers/   # Business logic
├── middleware/    # Custom middleware
├── models/        # Database schemas
├── routes/        # API routes
├── uploads/       # Uploaded files
├── util/          # Utility functions

Frontend
├── public/        # Static assets
└── src/           # React frontend
    ├── components/
    │   └── style/
    ├── context/
    └── pages/
        └── style/
</pre>

<hr/>

<h2>🔐 User Roles</h2>

<h3>Admin</h3>
<ul>
  <li>Full control over events</li>
  <li>Access to participant data</li>
  <li>Gallery management</li>
</ul>

<h3>User (Student)</h3>
<ul>
  <li>Register/cancel events</li>
  <li>Receive email confirmations</li>
</ul>

<hr/>

<h2>📬 Email Notifications</h2>
<p>Users receive confirmation emails after successful registration.</p>


<hr/>

<h2>🚧 Future Enhancements</h2>
<ul>
  <li>Payment integration for paid events</li>
  <li>Event reminders & notifications</li>
  <li>Admin analytics dashboard</li>
</ul>

<hr/>

<h2>🤝 Contributing</h2>
<p>Contributions are welcome! Fork the repository and submit a pull request.</p>


<hr/>

<h2>👤 Author</h2>
<p>
GitHub: <a href="https://github.com/nuthan-444">nuthan-444</a>
</p>