import { ReactNode } from "react";

interface HomeBoxI {
  children: ReactNode;
  title: string;
  extra?: string;
}
function HomeBox({ children, title, extra }: HomeBoxI) {
  return (
    <div
      className={`box radius box-shadow flex flex-column txt-e g-2 p-1 white-bg ${
        extra && extra
      }`}
      style={{
        maxHeight: extra ? "350px" : "",
      }}
    >
      <h2 className="main-title">{title}</h2>
      {children}
    </div>
  );
}
export default HomeBox;
