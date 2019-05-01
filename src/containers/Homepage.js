import React from 'react'

const Homepage = () => (
  <div>
    <header className="home-header sticky top-0 z-1">
      <div className="header-wrapper container mx-auto flex items-center justify-between">
        <h1 className="home-title py-">Rolo</h1>
        <nav className="home-nav flex items-center">
          <a
            className="home-nav-link mx-4 pt-10 pb-5 mb-5 font-semibold no-underline"
            href="/login"
          >
            Login
          </a>
          <a
            className="home-nav-link mx-4 pt-10 pb-5 mb-5 font-semibold no-underline"
            href="/privacy-policy"
          >
            Privacy Policy
          </a>
        </nav>
      </div>
    </header>
    <main className="home-body">
      <section className="hero">
        <div className="container text-center pt-32">
          <h1 className="home-title">Keep Family In Contact</h1>
          <h2 className="home-subtitle">Even Less Than A One-Person Job</h2>
        </div>
      </section>
    </main>
    <footer className="home-footer">
      <p>Copyright 2019 CV Harris Design, LLC</p>
    </footer>
  </div>
)

export default Homepage
