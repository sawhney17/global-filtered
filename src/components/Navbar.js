
function Navbar() {
  return (
    <nav className="flex bg-white items-center justify-between w-full max-w-7xl mx-auto px-6 py-4 border-b">
      <div className="flex justify-between gap-x-6">
          <a href="/home">Home</a>
        {/* <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li> */}
      </div>
    </nav>
  )
}

export default Navbar