import React from "react";

import { TailwindNavbar } from "tailwind-navbar-react";
// import "./tailwind-pre-build.css";

const HeaderMain = () => {
  const links = [
    {
      name: "About Us",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      name: "Products",
      link: "https://www.youtube.com/watch?v=oHg5SJYRHA0"
    },
    {
      name: "Other Links",
      link: "https://www.youtube.com/watch?v=cvh0nX08nRw"
    },
    {
      name: "Contact Us",
      link: "https://bitly.com/98K8eH"
    }
  ];

  return (
    <>
      <TailwindNavbar
        brand={
          <img
            src="https://media.discordapp.net/attachments/694834406493257762/729067815499202651/matthew_border.png"
            width="40"
            height="40"
            alt="Brand logo"
          />
        }
        className="py-1"
      >
        <nav>
          <ul className="items-center justify-between pt-4 text-base lg:flex lg:pt-0">
            {links.map(link => {
              // It should be noted that here we would normally use <Link> or
              // whatever other link JSX element your router uses; since all our
              // links are external here we just use <a>
              return (
                <li>
                  <a
                    className="block px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400 transition-all duration-200"
                    href={link.link}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </TailwindNavbar>
      
    </>
  );
};

export default HeaderMain;
