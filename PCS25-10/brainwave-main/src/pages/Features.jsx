// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Section from "../components/Section";
// import Heading from "../components/Heading";
// import Benefits from "../components/Benefits";
// import { benefits } from "../constants";
// import Arrow from "../assets/svg/Arrow";
// import { GradientLight } from "../components/design/Benefits";
// import ClipPath from "../assets/svg/ClipPath";
// const Features = () => {
//   const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await axios.get(
//           `https://newsapi.org/v2/everything?q=flood OR floods OR "flood disaster"&language=en&pageSize=30&apiKey=f1ae49f71752471c9a915a6e0c66522e`
//         );

//         // Shuffle and slice 9 articles
//         const shuffled = res.data.articles.sort(() => 0.5 - Math.random());
//         const selected = shuffled.slice(0, 9);
//         setArticles(selected);
//       } catch (err) {
//         console.error("Error fetching news:", err);
//       }
//     };

//     fetchNews();
//   }, []);

  // return (
    // <section className="bg-black text-white py-10 px-4">
    //   <div className="max-w-7xl mx-auto">
    //     <h2 className="text-3xl font-bold mb-8">Flood-Related News</h2>

        // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        //   {articles.map((article, index) => (
        //     <a
        //       href={article.url}
        //       target="_blank"
        //       rel="noopener noreferrer"
        //       key={index}
        //       className="bg-white text-black rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        //     >
    //           {article.urlToImage && (
    //             <img
    //               src={article.urlToImage}
    //               alt={article.title}
    //               className="w-full h-48 object-cover"
    //             />
    //           )}
              // <div className="p-4">
              //   <h3 className="text-lg font-semibold mb-2">
              //     {article.title}
              //   </h3>
              //   <p className="text-sm mb-4 line-clamp-3">
              //     {article.description}
              //   </p>
              //   <span className="text-xs text-gray-600">
              //     {article.source.name}
              //   </span>
              // </div>
    //         </a>
    //       ))}
    //     </div>
    //   </div>
    // </section>




//BEST WORKING ABOVE BELOW ARE TESTTTSS






//TYPE 3----> works best----

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Section from "../components/Section";
// import Heading from "../components/Heading";
// import Benefits from "../components/Benefits";
// import { benefits } from "../constants";
// import Arrow from "../assets/svg/Arrow";
// import { GradientLight } from "../components/design/Benefits";
// import ClipPath from "../assets/svg/ClipPath";

// const Features = () => {
//   const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await axios.get(
//           `https://newsapi.org/v2/everything?q=flood OR floods OR "flood disaster"&language=en&pageSize=30&apiKey=f1ae49f71752471c9a915a6e0c66522e`
//         );

//         // Shuffle and slice 9 articles
//         const shuffled = res.data.articles.sort(() => 0.5 - Math.random());
//         const selected = shuffled.slice(0, 9);
//         setArticles(selected);
//       } catch (err) {
//         console.error("Error fetching news:", err);
//       }
//     };

//     fetchNews();
//   }, []);

//   return (
//     <Section id="features">
//       <div className="container relative z-2">
//         <Heading
//           className="md:max-w-md lg:max-w-2xl"
//           title="Chat Smarter, Not Harder with Brainwave"
//         />

//         <div className="flex flex-wrap gap-10 mb-10">
//           {benefits.map((item, index) => {
//             // Get the corresponding article if available
//             const article = articles[index];

//             return (
//               <div
//                 className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
//                 style={{
//                   backgroundImage: `url(${item.backgroundUrl})`,
//                 }}
//                 key={item.id}
//               >
//                 <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
//                   {article ? (
//                     <>
//                       <h3 className="text-lg font-semibold mb-2">
//                         {article.title}
//                       </h3>
//                       <p className="text-sm mb-4 line-clamp-3">
//                         {article.description}
//                       </p>
//                       <span className="text-xs text-gray-600">
//                         {article.source.name}
//                       </span>
//                     </>
//                   ) : (
//                     <div>Loading article...</div> // Or handle it in another way
//                   )}

//                   <p className="body-2 mb-6 text-n-3">{item.text}</p>
//                   <div className="flex items-center mt-auto">
//                     <img
//                       src={item.iconUrl}
//                       width={48}
//                       height={48}
//                       alt={item.title}
//                     />
//                     <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
//                       Explore more
//                     </p>
//                     <Arrow />
//                   </div>
//                 </div>

//                 {item.light && <GradientLight />}

//                 <div
//                   className="absolute inset-0.5 bg-n-8"
//                   style={{ clipPath: "url(#benefits)" }}
//                 >
//                   <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
//                     {item.imageUrl && (
//                       <img
//                         src={item.imageUrl}
//                         width={380}
//                         height={362}
//                         alt={item.title}
//                         className="w-full h-full object-cover"
//                       />
//                     )}
//                   </div>
//                 </div>

//                 <ClipPath />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </Section>


//   );
// };

// export default Features;

  

import React, { useEffect, useState } from "react";
import axios from "axios";
import Section from "../components/Section";
import Heading from "../components/Heading";
import { benefits } from "../constants";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "../components/design/Benefits";
import ClipPath from "../assets/svg/ClipPath";

const Features = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `https://newsapi.org/v2/everything?q=flood OR floods OR "flood disaster"&language=en&pageSize=30&apiKey=f1ae49f71752471c9a915a6e0c66522e`
        );

        // Shuffle and slice 9 articles
        const shuffled = res.data.articles.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 9);
        setArticles(selected);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };

    fetchNews();
  }, []);

  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Latest News"
        />

        <div className="flex flex-wrap gap-10 mb-10">
          {benefits.map((item, index) => {
            const article = articles[index];

            return (
              <a
                href={article ? article.url : "#"}
                target="_blank"
                rel="noopener noreferrer"
                key={item.id}
                className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
                style={{
                  backgroundImage: `url(${item.backgroundUrl})`,
                }}
              >
                <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                  {article ? (
                    <>
                      <h3 className="text-lg font-semibold mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm mb-4 line-clamp-3">
                        {article.description}
                      </p>
                      <span className="text-xs text-gray-600">
                        {article.source.name}
                      </span>
                    </>
                  ) : (
                    <div>Loading article...</div>
                  )}

                  <p className="body-2 mb-6 text-n-3">{item.text}</p>
                  <div className="flex items-center mt-auto">
                    <img
                      src={item.iconUrl}
                      width={48}
                      height={48}
                      alt={item.title}
                    />
                    <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                      Explore more
                    </p>
                    <Arrow />
                  </div>
                </div>

                {item.light && <GradientLight />}

                <div
                  className="absolute inset-0.5 bg-n-8"
                  style={{ clipPath: "url(#benefits)" }}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                    {article && article.urlToImage && (
                      <img
                        src={article.urlToImage}
                        width={380}
                        height={362}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                <ClipPath />
              </a>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Features;
