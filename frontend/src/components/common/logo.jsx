import logo from "../../assets/logo/logo.png";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logo}
        alt="WorkSphere Logo"
        className="h-10 w-10"
      />

      <div>
        <h1 className="text-xl font-bold">
          <span className="text-gray-900">Work</span>
          <span className="text-orange-500">Sphere</span>
        </h1>
      </div>
    </div>
  );
}

export default Logo;