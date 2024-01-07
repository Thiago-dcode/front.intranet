import mantenimiento from "../assets/img/mantenimiento.png";

export default function Home() {
  return (
    <div className="bg-arzumaBlack text-cyan-500 h-screen overflow-auto">
      <img
        className="object-cover"
        src={mantenimiento}
        alt="En mantenimiento"
      />
      <p></p>
    </div>
  );
}
