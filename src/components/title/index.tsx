import "./title.scss";

interface props {
  title: string;
  icon: any;
  color?: string;
  fs?: string;
}

const Title = ({ fs, title, icon, color }: props) => {
  return (
    <h1
      className={`cl-bl cool-title flex title justify-center relative ${
        fs ? fs : "fs-med"
      }`}
      style={{ color: color }}
    >
      {title}
      <div className="icon cl-m">{icon}</div>
    </h1>
  );
};

export default Title;
