import Logo from '../../assets/site-logo.svg';
import './Logo.scss';

export default function LogoComp() {
  return (
    <img
      className="logo"
      src={Logo}
      alt="webpack logo"
      width={122}
      height={35}
    />
  );
}
