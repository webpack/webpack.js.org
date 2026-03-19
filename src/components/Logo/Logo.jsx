import Logo from "../../assets/site-logo.svg";

export default function LogoComp() {
  return (
    <img
      className="float-left h-[35px] w-auto opacity-90 transition-opacity duration-200 hover:opacity-100"
      src={Logo}
      alt="webpack logo"
      width={122}
      height={35}
    />
  );
}
